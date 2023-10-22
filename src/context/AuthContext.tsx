import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  name: string;
  role: "ADMIN" | "BASIC";
}

interface Credentials {}

export interface IUseAuth {
  login: (data: Credentials) => void;
  logout: () => void;
  setUser: (user: UserInfo) => void;
  user?: UserInfo;
  isLoggedIn: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IUseAuth | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserInfo>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = (data: Credentials) => {
    console.log(data);
    setIsLoggedIn(true);
    setUser({ name: "Mayuyu", role: "BASIC" });
    navigate("/");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(undefined);
  };

  useEffect(() => {
    console.log("Hi");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
