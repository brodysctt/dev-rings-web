import { toast } from "react-toastify";

export const trackRepoToast = {
  success: () =>
    toast.success("Webhook successfully created 🎉", {
      position: "top-center",
    }),
  warn: () =>
    toast.warn("Webhook did not get created – are you already tracking it? 👀"),
  error: () =>
    toast.error("Yoinks, something went wrong 😟", {
      position: "top-center",
    }),
};
