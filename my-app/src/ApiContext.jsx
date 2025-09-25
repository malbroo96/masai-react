import React, { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiKey] = useState("889edc8912bb516be3e03a3ce9ac996b");

  return (
    <ApiContext.Provider value={{ apiKey }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
