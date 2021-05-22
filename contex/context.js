import React, { useState, useContext, createContext, useEffect } from "react";

export const FormContext = createContext();

const userInitial = { name: "user", role: "user" };

const performsInitial = [
  {
    id: 1,
    name: "красавица и чудовище",
    src: "https://upload.wikimedia.org/wikipedia/ru/d/d6/Beauty_and_the_Beast_2017_poster.jpg",
    genre: "сказка",
    director: "мой отец",
    troupe: "бог, Алена Викторовна, Красавица, Чудовище",
    description: "чудовищее ухаживает за красавицей",
    scenes: [
      { id: 1, name: "сцена 1", active: false },
      { id: 2, name: "сцена 2", active: true },
      { id: 3, name: "сцена 3", active: false },
      { id: 4, name: "сцена 4", active: false },
      { id: 5, name: "закочилось", active: false },
    ],
  },
  {
    id: 3,
    name: "холодная сердцем",
    src: "https://upload.wikimedia.org/wikipedia/ru/d/d6/Beauty_and_the_Beast_2017_poster.jpg",
    genre: "сказка",
    director: "мой отец",
    troupe: "бог, Алена Викторовна, Красавица, Чудовище",
    description: "чудовищее ухаживает за красавицей",
    scenes: [
      { id: 1, name: "сцена 1", active: false },
      { id: 2, name: "сцена 2", active: true },
      { id: 3, name: "сцена 3", active: false },
      { id: 4, name: "сцена 4", active: false },
      { id: 5, name: "закочилось", active: false },
    ],
  },
];

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
