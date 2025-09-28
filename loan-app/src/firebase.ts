import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import type { LoanApplicationData } from "./types/loan";
import type { LoanApplication } from "./features/loanSlice";
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

// Function to fetch loan applications for a user
export const fetchUserLoans = async (
  userId: string
): Promise<LoanApplication[]> => {
  try {
    const loansRef = collection(db, "loans");
    const q = query(loansRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const loans: LoanApplication[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      loans.push({
        id: doc.id,
        userId: data.userId,
        status: data.status,
        personalInfo: data.personalInfo,
        financialInfo: data.financialInfo,
        documents: data.documents || [],
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt:
          data.updatedAt?.toDate().toISOString() ||
          data.createdAt.toDate().toISOString(),
      } as LoanApplication);
    });

    return loans;
  } catch (error) {
    console.error("Error fetching loan applications:", error);
    throw error;
  }
};

export default app;
