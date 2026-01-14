// src\lib\loader-context.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface LoaderContextType {
  done: boolean;
  finish: () => void;
}

const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [done, setDone] = useState<boolean>(() => {
    return sessionStorage.getItem("invite-loader-done") === "true";
  });

  const finish = () => {
    sessionStorage.setItem("invite-loader-done", "true");
    setDone(true);
  };

  return (
    <LoaderContext.Provider value={{ done, finish }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("useLoader must be used inside LoaderProvider");
  return ctx;
};
