export interface LoanApplicationData {
  userId: string;
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
  documents: Array<{
    id: string;
    name: string;
    status: string;
    url: string;
  }>;
}

export interface Loan extends LoanApplicationData {
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
}
