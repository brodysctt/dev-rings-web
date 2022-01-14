import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const NoReposAlert = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/repos");
    toast.info("Track a repo to get started");
  }, []);
  return null;
};
