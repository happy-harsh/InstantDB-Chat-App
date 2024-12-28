import { openDB } from "idb";

export async function initIndexedDB() {
  const db = await openDB("OfflineDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("messages")) {
        db.createObjectStore("messages", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("contacts")) {
        db.createObjectStore("contacts", { keyPath: "id" });
      }
    },
  });
  return db;
}
