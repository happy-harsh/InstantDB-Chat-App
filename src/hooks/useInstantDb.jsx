// for interacting with InstantDB (initialize, query, and subscribe).
import { init, tx, id } from "@instantdb/react";

// Namespaces are equivelant to "tables" in relational databases or "collections" in NoSQL.
// Attributes are properties associated with namespaces. These are equivelant to a "column" in relational databases or a "field" in NoSQL.

const db = init({ appId: import.meta.env.VITE_INSTANT_APP_ID});

export function useInstantDB() {
  return db;
}
