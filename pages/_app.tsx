import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme, createEmotionCache } from "styles";
import { Navbar } from "components";
import { UserContext } from "lib/context";

import { auth, db } from "@lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import type { Log } from "components";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState<string | null>(null);
  const [logs, setLogs] = useState<Log[] | null>(null); // TODO: What's the best practice here?

  useEffect(() => {
    // TODO: Not unsubscribing from realtime updates – what are the performance/cost implications?
    (async () => {
      if (!user) {
        setUserId(null);
        setLogs(null);
        return;
      }
      const {
        // @ts-ignore
        reloadUserInfo: { screenName: userId },
      } = user;
      console.log(`this mans is logged in: ${userId}`);
      setUserId(userId);

      const logsSnapshot = await getDocs(
        collection(db, "users", userId, "logs")
      );
      const logs = logsSnapshot.docs.map((doc) => [
        doc.id,
        doc.data(),
      ]) as Log[];
      setLogs(logs);
      return;
    })();
  }, [user]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserContext.Provider value={{ userId, logs }}>
          <Navbar />
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
