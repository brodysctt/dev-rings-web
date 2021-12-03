import { createContext } from "react";
import { Log } from "components";

interface UserContext {
  userId: string | null;
  logs: Log[];
}

export const LOGS_INIT = [["", { actual: 0, goal: 0 }]] as Log[];

export const UserContext = createContext<UserContext>({
  userId: null,
  logs: LOGS_INIT,
});
