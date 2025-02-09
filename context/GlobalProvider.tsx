import React, { createContext, useContext, useEffect, useState } from "react";
import { Redirect, router } from 'expo-router'

import { getCurrentUser } from "../lib/appwrite";

interface User {
  id: string;
  name: string;
  email: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setIsLogged: (value: boolean) => void;
  setUser: (user: User | any | null) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!!context) return context;
  
  throw new Error("useGlobalContext must be used within a GlobalProvider");
};

const GlobalProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLogged(false);
        setUser(null);
        router.push('/sign-in');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
