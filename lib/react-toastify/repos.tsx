import { toast } from "react-toastify";

// TODO: Gotta centralize all toasts bruh
export const trackRepoToast = {
  success: () => toast.success("Webhook successfully created"),
  info: () => toast.info(`just copy & paste the github link bruh 😅`),
  warn: () =>
    toast.warn("Webhook did not get created – are you already tracking it? 👀"),
  error: () => toast.error("Yoinks, something went wrong 😟"),
};
