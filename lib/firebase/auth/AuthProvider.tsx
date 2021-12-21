import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import type { User } from "firebase/auth";
import { auth } from "@lib/firebase";
import Cookies from "js-cookie";

export const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        Cookies.set("token", "");
        router.push("/enter");
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      Cookies.set("token", token);
    });
  });

  // Why do I want to force refresh the token every 10 minutes?
  useEffect(() => {
    const handleRefresh = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handleRefresh);
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
