import React, { createContext, useEffect } from "react";
import { openDB } from "idb";

const IndexedDBContext = createContext();

export const IndexedDBProvider = ({ children }) => {
  useEffect(() => {
    const setupDB = async () => {
      const db = await openDB("ChatApp", 1, {
        upgrade(db) {
          db.createObjectStore("contacts", { keyPath: "id" });
          db.createObjectStore("messages", { keyPath: "id" });
        },
      });
    };
    setupDB();
  }, []);

  return <IndexedDBContext.Provider value={{}}>{children}</IndexedDBContext.Provider>;
};
