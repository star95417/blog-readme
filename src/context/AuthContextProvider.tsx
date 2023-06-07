import React, { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./authContext";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) setData(username);
  }, []);

  function setUsername(username: string) {
    setData(username);
    sessionStorage.setItem("username", username);
  }

  function clearUsername() {
    setData("");
    sessionStorage.clear();
  }

  const contextValue = {
    username: data,
    setUsername,
    clearUsername,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
