import { openDB } from "idb";

const DB_NAME = "UserDB";
const STORE_NAME = "users";
// Initialize IndexedDB
const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
};

// Add user to IndexedDB
export const addUserToIndexedDB = async (username, age) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.add({ username, age });
  await tx.done;
  console.log("User added:", { username, age });
};

// Retrieve all users from IndexedDB
export const getUsersFromIndexedDB = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

// Clear all data from IndexedDB
export const clearIndexedDB = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
