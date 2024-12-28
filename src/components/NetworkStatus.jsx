import React, { useState, useEffect } from "react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);

    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      className={`status-indicator ${isOnline ? "online" : "offline"}`}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "150px",
        padding: "5px",
        backgroundColor: isOnline ? "green" : "red",
        color: "white",
        textAlign: "center",
        fontWeight: "400",
        opacity: "80%",
        borderRadius:"0px 10px"
      }}
    >
      {isOnline ? "Online" : " Offline"}
    </div>
  );
}
