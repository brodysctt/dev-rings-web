import { createContext } from "react";
import { Log } from "components";

interface UserContext {
  userId: string | null;
  logs: Log[] | null;
}

export const UserContext = createContext<UserContext>({
  userId: null,
  logs: null,
});
