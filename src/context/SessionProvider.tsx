import React, { createContext, ReactNode } from "react";

export interface SessionContextProps {
  name: string | undefined
  id: string | undefined
  email: string | undefined
  role: string | undefined
  access: string | undefined
  [key: string]: any;
}
const initialState: SessionContextProps = {
  name: "",
  id: "",
  role: "",
  access: "",
  email: "",
};

const SessionContext = createContext(initialState);

interface SessionProviderProps {
  children: ReactNode;
  value: SessionContextProps;
}
/**
 * @return {JSX.Element}
 */
function SessionProvider({ children, value }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}
export { SessionProvider, SessionContext };
