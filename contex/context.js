import React, { useState, useContext, createContext, useEffect } from "react";

export const FormContext = createContext();

const userInitial = { name: "user", role: "user" };

const FormProvider = ({ children }) => {
  const [user, setUser] = useState();

  const getState = () => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      setUser(userInitial);
    }
  };

  useEffect(() => {
    getState();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <FormContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

export default FormProvider;
