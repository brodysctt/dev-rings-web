import { useContext } from "react";
import { AuthContext } from "lib/context";

export const useAuth = () => {
  return useContext(AuthContext);
};
