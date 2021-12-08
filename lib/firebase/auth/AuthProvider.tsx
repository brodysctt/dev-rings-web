import { useState, useEffect, createContext, useContext } from "react";
import type { User } from "firebase/auth";
import { auth } from "@lib/firebase";
import Cookies from "js-cookie";

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  // Listen for token changes -> on change, calls setUser and writes new token as a cookie
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        Cookies.set("token", "");
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      Cookies.set("token", token);
    });
  }, []);

  // Why do I want to force refresh the token every 10 minutes?
  useEffect(() => {
    const handleRefresh = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handleRefresh);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
