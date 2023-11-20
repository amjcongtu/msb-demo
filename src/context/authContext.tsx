import React, { createContext, useEffect, useMemo, useState } from "react";
import { getCookieStorage, removeStorageJwtToken } from "../helper/storage";
import { message } from "antd";

interface AuthContextProps {
  isAuth: boolean;
  setAuth: (value: boolean) => void;
  clearAuth: () => void;
  isLoading:boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const hasStorageJwtToken = () => {
  return !!getCookieStorage("accessToken");
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!checkedAuth) {
      
      const authStatus = hasStorageJwtToken();
      setIsAuth(authStatus);
      setIsLoading(false);
      setCheckedAuth(true);
    }
  }, [checkedAuth]);

  const setAuth = (value: boolean) => {
    setIsAuth(value);
    setIsLoading(false);
  };
  const clearAuth = () => {
    removeStorageJwtToken();
    setIsAuth(false);
    setIsLoading(false);
    message.success('Đăng xuất thành công!');

  };

  const contextValue = useMemo(
    () => ({ isAuth,isLoading, setAuth, clearAuth }),
    [isAuth, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
