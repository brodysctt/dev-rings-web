import { useEffect } from "react";
import { useRouter } from "next/router";
import useWindowSize from "react-use/lib/useWindowSize";
import { useAuth } from "@lib/firebase/auth";
import { setIsOnboarding } from "@lib/firebase/firestore";
import Confetti from "react-confetti";

export const OnboardingConfetti = () => {
  const router = useRouter();
  const userId = useAuth();
  const { width, height } = useWindowSize();

  useEffect(
    () => () => {
      if (!userId) return;
      setIsOnboarding(userId);
    },
    [userId]
  );

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }}
    />
  );
};
