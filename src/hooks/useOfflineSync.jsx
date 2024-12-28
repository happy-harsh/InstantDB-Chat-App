import { useEffect } from "react";
import { useCrud } from "./useCrud";

export function useOfflineSync() {
  const { syncOfflineData } = useCrud();

  useEffect(() => {
    const syncHandler = async () => {
      if (navigator.onLine) {
        await syncOfflineData();
      }
    };

    window.addEventListener("online", syncHandler);

    syncHandler();

    return () => {
      window.removeEventListener("online", syncHandler);
    };
  }, [syncOfflineData]);
}
