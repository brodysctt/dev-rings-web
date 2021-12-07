import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";
import { User } from "firebase/auth";
import { auth } from "lib/firebase";

export const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

// TODO: Understand all wtf is going on with Cookies

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
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

  // force refresh the token every 10 minutes
  // Why do I want this?
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
