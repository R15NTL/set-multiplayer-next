import { useEffect } from "react";

interface UseReloadConfirmationLockProps {
  gameInProgress: boolean;
}

export const useReloadConfirmationLock = ({
  gameInProgress,
}: UseReloadConfirmationLockProps) => {
  const confirmationMessage =
    "Are you sure you want to leave? Your game progress will be lost.";

  function handleBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = confirmationMessage;
  }

  useEffect(() => {
    console.log("useReloadConfirmationLock effect", { gameInProgress });
    if (gameInProgress) {
      return window.addEventListener("beforeunload", handleBeforeUnload);
    }
    window.removeEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameInProgress]);
};
