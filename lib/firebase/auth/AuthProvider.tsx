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

  useEffect(
    () =>
      auth.onIdTokenChanged(async (user) => {
        if (!user) {
          setUser(null);
          Cookies.set("token", "");
          router.push("/enter");
          return;
        }
        const token = await user.getIdToken();
        setUser(user);
        Cookies.set("token", token);
      }),
    []
  );

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
