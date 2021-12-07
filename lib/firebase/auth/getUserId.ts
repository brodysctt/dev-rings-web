import type { User } from "firebase/auth";

export const getUserId = (user: User) => {
  const {
    // @ts-ignore
    reloadUserInfo: { screenName: userId },
  } = user;

  return userId;
};
