import { AuthContext, IUseAuth } from "@/context";
import { useContext } from "react";

export const useAuth = (): IUseAuth => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
