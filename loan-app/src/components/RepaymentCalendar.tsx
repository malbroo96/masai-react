import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { initialState } from "../store";
import type { Payment } from "../features/paymentSlice";
import { recordPayment, updatePaymentStatus } from "../features/paymentSlice";
import "../styles/repayment-calendar.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function RepaymentCalendar() {
  const dispatch = useDispatch();
  const payments = useSelector((state: initialState) => state.payment.payments);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Update payment statuses based on current date
  useEffect(() => {
    const now = new Date();
    payments.forEach((payment) => {
      if (payment.status === "upcoming" && new Date(payment.dueDate) < now) {
        dispatch(
          updatePaymentStatus({ paymentId: payment.id, status: "overdue" })
        );
      }
    });
  }, [dispatch, payments]);

  // Get days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Get payments for a specific date
  const getPaymentsForDate = (date: Date) => {
    return payments.filter((payment) => {
      const paymentDate = new Date(payment.dueDate);
      return (
        paymentDate.getDate() === date.getDate() &&
        paymentDate.getMonth() === date.getMonth() &&
        paymentDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const grid = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (day > daysInMonth) {
          week.push(null);
        } else {
          const date = new Date(year, month, day);
          const paymentsForDay = getPaymentsForDate(date);
          week.push({
            day,
            payments: paymentsForDay,
          });
          day++;
        }
      }
      if (week.some((day) => day !== null)) {
        grid.push(week);
      }
    }

    return grid;
  };

  const handlePrevMonth = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handlePayment = (payment: Payment) => {
    if (payment.status === "upcoming" || payment.status === "overdue") {
      dispatch(recordPayment({ paymentId: payment.id }));
    }
  };

  const getStatusStyles = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 ring-green-600/20";
      case "overdue":
        return "bg-red-100 text-red-800 ring-red-600/20";
      default:
        return "bg-yellow-100 text-yellow-800 ring-yellow-600/20";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Repayment Calendar</h2>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h3>
        <div className="mt-6 grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden shadow">
          {/* Calendar header */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-xs font-semibold text-gray-700"
            >
              {day}
            </div>
          ))}

          {/* Calendar grid */}
          {generateCalendarGrid().map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`bg-white relative min-h-[120px] p-2 ${
                    !day ? "bg-gray-50" : ""
                  }`}
                >
                  {day && (
                    <>
                      <time
                        dateTime={`${selectedDate.getFullYear()}-${
                          selectedDate.getMonth() + 1
                        }-${day.day}`}
                        className="text-sm text-gray-600"
                      >
                        {day.day}
                      </time>
                      <div className="mt-2 space-y-1">
                        {day.payments.map((payment) => (
                          <div
                            key={payment.id}
                            onClick={() => setSelectedPayment(payment)}
                            className={`cursor-pointer px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(
                              payment.status
                            )}`}
                          >
                            ${payment.amount.toLocaleString()}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Payment details modal */}
      {selectedPayment && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setSelectedPayment(null)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Payment Details
                    </h3>
                    <div className="mt-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Amount
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            ${selectedPayment.amount.toLocaleString()}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Due Date
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {new Date(
                              selectedPayment.dueDate
                            ).toLocaleDateString()}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Status
                          </dt>
                          <dd className="mt-1">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                                selectedPayment.status
                              )}`}
                            >
                              {selectedPayment.status}
                            </span>
                          </dd>
                        </div>
                        {selectedPayment.paidAt && (
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Paid On
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {new Date(
                                selectedPayment.paidAt
                              ).toLocaleDateString()}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {(selectedPayment.status === "upcoming" ||
                  selectedPayment.status === "overdue") && (
                  <button
                    type="button"
                    onClick={() => {
                      handlePayment(selectedPayment);
                      setSelectedPayment(null);
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Record Payment
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPayment(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
