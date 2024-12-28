import { useInstantDB } from "../hooks/useInstantDb";
import { useState } from "react";
import { v4 } from "uuid";
import { initIndexedDB } from "./initIndexedDB";


export const useCrud = (resource) => {
  const db = useInstantDB();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //send message 
  const sendMessage = async (message, senderId, receiverId) => {
    const dateCreated = new Date().toISOString();
    const uniqueId = v4();
    const newData = {
      id: uniqueId,
      sid: senderId,
      rid: receiverId,
      message: message,
      date_created: dateCreated,
    };

    setLoading(true);
    try {
      const indexedDB = await initIndexedDB();
      await indexedDB.put("messages", newData);

      if (navigator.onLine) {
        // Sync with InstantDB
        await db.transact([db.tx.messages[uniqueId].update(newData)]);
      }
      return uniqueId;
    } catch (err) {
      setError("Error creating data.");
    } finally {
      setLoading(false);
    }
  };

  //create contact
  const createUser = async (name, email, password, dateCreated) => {
    const uniqueId = v4();
    const newUser = {
      id: uniqueId,
      email,
      name,
      password,
      date_created: dateCreated,
    };

    try {
      const indexedDB = await initIndexedDB();
      await indexedDB.put("contacts", newUser);

      if (navigator.onLine) {
        // Sync with InstantDB
        await db.transact([db.tx.contacts[uniqueId].update(newUser)]);
      }
      return uniqueId;
    } catch (err) {
      throw new Error("Error creating user");
    }
  };

  //sync message and contact created offline with online
  const syncOfflineData = async () => {
    const indexedDB = await initIndexedDB();
    const messages = await indexedDB.getAll("messages");
    const contacts = await indexedDB.getAll("contacts");

    if (navigator.onLine) {
      try {
        // Sync Messages
        for (const message of messages) {
          await db.transact([db.tx.messages[message.id].update(message)]);
        }
        // Sync Contacts
        for (const contact of contacts) {
          await db.transact([db.tx.contacts[contact.id].update(contact)]);
        }

        // Clear synced data from IndexedDB
        await indexedDB.clear("messages");
        await indexedDB.clear("contacts");
      } catch (err) {
        setError("Error syncing data.");
      }
    }
  };

  return { sendMessage, createUser, syncOfflineData, error, loading };
};
