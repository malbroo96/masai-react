import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface Payment {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  status: "upcoming" | "paid" | "overdue";
  paidAt?: string;
}

interface PaymentState {
  payments: Payment[];
}

const initialState: PaymentState = {
  payments: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    initializePayments: (
      state,
      action: PayloadAction<{
        loanId: string;
        loanAmount: number;
        loanTerm: number;
        startDate: string;
      }>
    ) => {
      const { loanId, loanAmount, loanTerm, startDate } = action.payload;
      const monthlyPayment = loanAmount / loanTerm;
      const payments: Payment[] = [];

      const startDateObj = new Date(startDate);

      for (let i = 0; i < loanTerm; i++) {
        const dueDate = new Date(startDateObj);
        dueDate.setMonth(startDateObj.getMonth() + i);

        payments.push({
          id: crypto.randomUUID(),
          loanId,
          amount: monthlyPayment,
          dueDate: dueDate.toISOString(),
          status: "upcoming",
        });
      }

      state.payments = [...state.payments, ...payments];
    },
    recordPayment: (state, action: PayloadAction<{ paymentId: string }>) => {
      const payment = state.payments.find(
        (p) => p.id === action.payload.paymentId
      );
      if (payment) {
        payment.status = "paid";
        payment.paidAt = new Date().toISOString();
      }
    },
    updatePaymentStatus: (
      state,
      action: PayloadAction<{ paymentId: string; status: Payment["status"] }>
    ) => {
      const payment = state.payments.find(
        (p) => p.id === action.payload.paymentId
      );
      if (payment) {
        payment.status = action.payload.status;
      }
    },
  },
});

export const { initializePayments, recordPayment, updatePaymentStatus } =
  paymentSlice.actions;
export default paymentSlice.reducer;
