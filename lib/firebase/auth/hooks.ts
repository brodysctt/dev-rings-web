import { useContext } from "react";
import { AuthContext, getUserId } from "@lib/firebase/auth";

export const useAuth = (): string | null => {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return getUserId(user);
};
