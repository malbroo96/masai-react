import { getFirestore, collection, addDoc } from "firebase/firestore";
import type { LoanApplicationData } from "./types/loan";
import { app } from "./firebaseAuth";

// Function to save loan application to Firestore
export const db = getFirestore(app);
export const saveLoanApplication = async (loanData: LoanApplicationData) => {
  try {
    const loansRef = collection(db, "loans");
    const docRef = await addDoc(loansRef, {
      ...loanData,
      createdAt: new Date(),
      status: "pending" as const,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving loan application:", error);
    throw error;
  }
};

export default app;
