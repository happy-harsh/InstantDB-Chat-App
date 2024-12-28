import { useInstantDB } from "../hooks/useInstantDb";
import { useState } from "react";
import { init, tx, id } from "@instantdb/react";
import { v4 } from "uuid";

export const useCrud = (resource) => {
  const db = useInstantDB();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message, senderId, receiverId) => {
    const dateCreated = new Date().toISOString(); 
    const uniqueId = v4();
    const newData = {
      sid: senderId,
      rid: receiverId,
      message: message,
      date_created:dateCreated,
    };
    setLoading(true);
    try {
      await db.transact([db.tx.messages[uniqueId].update(newData)]);
      return uniqueId;
    } catch (err) {
      setLoading(false);
      setError("Error creating data.");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (name,email, password, dateCreated) => {
    const uniqueId = v4();
    const newUser = {
      email,
      name,
      password,
      date_created: dateCreated,
    };
    console.log(newUser);

    try {
      await db.transact([db.tx.contacts[uniqueId].update(newUser)]);
      return uniqueId;
    } catch (err) {
      throw new Error("Error creating user");
    }
  };

  return { sendMessage, createUser, error, loading };
};
