import { useRouter } from "next/router";
import useWindowSize from "react-use/lib/useWindowSize";
import { useAuth } from "@lib/firebase/auth";
import { setIsOnboarding } from "@lib/firebase/firestore";
import Confetti from "react-confetti";

export const OnboardingConfetti = () => {
  const router = useRouter();
  const userId = useAuth();
  const { width, height } = useWindowSize();
  if (!userId) return null;
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => {
        console.log("figure out how to fix this 🔧");
        setTimeout(() => {
          setIsOnboarding(userId);
          router.push("/");
        }, 1000);
      }}
    />
  );
};
