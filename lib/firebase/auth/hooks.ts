import { useContext } from "react";
import { AuthContext } from "@lib/firebase/auth";

export const useAuth = (): string | null => {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  const {
    // @ts-ignore
    reloadUserInfo: { screenName: userId },
  } = user;
  return userId;
};
