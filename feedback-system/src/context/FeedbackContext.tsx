import React, { createContext, useState, ReactNode } from "react";

type FeedbackData = {
  name: string;
  email: string;
  feedback: string;
};

type FeedbackContextType = {
  data: FeedbackData;
  updateData: (newData: Partial<FeedbackData>) => void;
};

const defaultData: FeedbackData = { name: "", email: "", feedback: "" };

export const FeedbackContext = createContext<FeedbackContextType>({
  data: defaultData,
  updateData: () => {},
});

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FeedbackData>(defaultData);

  const updateData = (newData: Partial<FeedbackData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FeedbackContext.Provider value={{ data, updateData }}>
      {children}
    </FeedbackContext.Provider>
  );
};
