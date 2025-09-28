import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import type { initialState } from "../store";
import type { LoanApplication } from "../features/loanSlice";
import { setApplications, setLoading, setError } from "../features/loanSlice";
import { fetchUserLoans } from "../firebase";
import "../styles/loan-dashboard.css";

export default function LoanDashboard() {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector(
    (state: initialState) => state.loan
  );
  const { user } = useSelector((state: initialState) => state.auth);
  const [selectedApplication, setSelectedApplication] =
    useState<LoanApplication | null>(null);

  useEffect(() => {
    const loadLoans = async () => {
      if (!user) return;

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const loans = await fetchUserLoans(user.uid);
        dispatch(setApplications(loans));
      } catch (err) {
        dispatch(setError((err as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadLoans();
  }, [dispatch, user]);

  // Filter applications by status
  const getApplicationsByStatus = (status: LoanApplication["status"]) => {
    return applications.filter((app) => app.status === status);
  };

  // Calculate progress percentage for an application
  const calculateProgress = (status: LoanApplication["status"]) => {
    const stages = ["draft", "submitted", "under-review", "approved"];
    const currentIndex = stages.indexOf(status);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  const renderStatusBadge = (status: LoanApplication["status"]) => {
    return <span className={`status-badge status-${status}`}>{status}</span>;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Loan Management</h1>
      </div>

      {loading ? (
        <div className="dashboard-card">
          <p>Loading your applications...</p>
        </div>
      ) : error ? (
        <div className="dashboard-card error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {applications.length === 0 ? (
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">No Applications Yet</h3>
                <p>You haven't submitted any loan applications yet.</p>
              </div>
            </div>
          ) : (
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Loan Applications</h3>
                <p className="mt-1">
                  Track the status of your loan applications
                </p>
              </div>
              <div className="applications-list">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="application-item"
                    onClick={() => setSelectedApplication(app)}
                  >
                    <div className="application-info">
                      <h4>{app.personalInfo?.fullName}</h4>
                      <p>Amount: ${app.financialInfo?.loanAmount}</p>
                      <p>Purpose: {app.financialInfo?.loanPurpose}</p>
                    </div>
                    <div className="application-status">
                      {renderStatusBadge(app.status)}
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${calculateProgress(app.status)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Loan Applications</h1>
        <div className="flex space-x-3">
          {["draft", "submitted", "under-review", "approved", "rejected"].map(
            (status) => (
              <div key={status} className="text-sm">
                <span className="text-gray-500">{status}:</span>{" "}
                <span className="font-medium">
                  {
                    getApplicationsByStatus(status as LoanApplication["status"])
                      .length
                  }
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Applications grid */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {application.personalInfo?.fullName ||
                      "Unnamed Application"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Applied on{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {renderStatusBadge(application.status)}
              </div>

              {/* Progress bar */}
              <div className="relative pt-1 mb-4">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {calculateProgress(application.status)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                  <div
                    style={{
                      width: `${calculateProgress(application.status)}%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                  ></div>
                </div>
              </div>

              {/* Application details */}
              <div className="border-t border-gray-200 pt-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Loan Amount
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${application.financialInfo?.loanAmount.toLocaleString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Term</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {application.financialInfo?.loanTerm} months
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Documents status */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Documents
                </h4>
                <div className="space-y-2">
                  {application.documents?.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600 truncate flex-1">
                        {doc.name}
                      </span>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          doc.status === "verified"
                            ? "bg-green-100 text-green-800"
                            : doc.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View details button */}
              <div className="mt-4">
                <button
                  onClick={() => setSelectedApplication(application)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application details modal */}
      {selectedApplication && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setSelectedApplication(null)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Application Details
                    </h3>
                    <div className="mt-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Status
                          </dt>
                          <dd className="mt-1">
                            {renderStatusBadge(selectedApplication.status)}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Full Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {selectedApplication.personalInfo?.fullName}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {selectedApplication.personalInfo?.email}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Phone
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {selectedApplication.personalInfo?.phone}
                          </dd>
                        </div>
                        {/* Add more details as needed */}
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
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
