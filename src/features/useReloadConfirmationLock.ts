import { useEffect } from "react";

interface UseReloadConfirmationLockProps {
  gameInProgress: boolean;
}

export const useReloadConfirmationLock = ({
  gameInProgress,
}: UseReloadConfirmationLockProps) => {
  const confirmationMessage =
    "Are you sure you want to leave? Your game progress will be lost.";

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!gameInProgress) return;
      event.preventDefault();
      event.returnValue = confirmationMessage;
    }

    if (gameInProgress) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameInProgress]);
};
