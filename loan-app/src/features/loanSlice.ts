import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface LoanApplication {
  id: string;
  userId: string;
  status: "draft" | "submitted" | "under-review" | "approved" | "rejected";
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
  };
  financialInfo: {
    employmentStatus: string;
    monthlyIncome: number;
    loanAmount: number;
    loanPurpose: string;
    loanTerm: number;
  };
  documents: {
    id: string;
    name: string;
    status: "pending" | "verified" | "rejected";
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface LoanState {
  applications: LoanApplication[];
  currentApplication: Partial<LoanApplication> | null;
  currentStep: number;
}

const initialState: LoanState = {
  applications: [],
  currentApplication: null,
  currentStep: 1,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    initializeApplication: (
      state,
      action: PayloadAction<{ userId: string }>
    ) => {
      state.currentApplication = {
        id: crypto.randomUUID(),
        userId: action.payload.userId,
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.currentStep = 1;
    },
    updatePersonalInfo: (
      state,
      action: PayloadAction<LoanApplication["personalInfo"]>
    ) => {
      if (state.currentApplication) {
        state.currentApplication.personalInfo = action.payload;
        state.currentApplication.updatedAt = new Date().toISOString();
      }
    },
    updateFinancialInfo: (
      state,
      action: PayloadAction<LoanApplication["financialInfo"]>
    ) => {
      if (state.currentApplication) {
        state.currentApplication.financialInfo = action.payload;
        state.currentApplication.updatedAt = new Date().toISOString();
      }
    },
    addDocument: (
      state,
      action: PayloadAction<LoanApplication["documents"][0]>
    ) => {
      if (state.currentApplication) {
        if (!state.currentApplication.documents) {
          state.currentApplication.documents = [];
        }
        state.currentApplication.documents.push(action.payload);
        state.currentApplication.updatedAt = new Date().toISOString();
      }
    },
    submitApplication: (state) => {
      if (state.currentApplication) {
        state.currentApplication.status = "submitted";
        state.applications.push(state.currentApplication as LoanApplication);
        state.currentApplication = null;
        state.currentStep = 1;
      }
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateApplicationStatus: (
      state,
      action: PayloadAction<{ id: string; status: LoanApplication["status"] }>
    ) => {
      const application = state.applications.find(
        (app) => app.id === action.payload.id
      );
      if (application) {
        application.status = action.payload.status;
        application.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const {
  initializeApplication,
  updatePersonalInfo,
  updateFinancialInfo,
  addDocument,
  submitApplication,
  setCurrentStep,
  updateApplicationStatus,
} = loanSlice.actions;

export default loanSlice.reducer;
