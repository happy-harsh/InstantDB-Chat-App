import { openDB } from "idb";

export const useIndexedDB = () => {
  const dbPromise = openDB("ChatApp", 1);

  const addData = async (storeName, data) => {
    const db = await dbPromise;
    const tx = db.transaction(storeName, "readwrite");
    await tx.objectStore(storeName).put(data);
    await tx.done;
  };

  const getData = async (storeName, key) => {
    const db = await dbPromise;
    return db.transaction(storeName).objectStore(storeName).get(key);
  };

  return { addData, getData };
};
