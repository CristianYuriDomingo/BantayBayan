// lib/quizDb.js
 
import { openDB } from "idb";
 
const DB_NAME = "QuizDB";
const DB_VERSION = 1;
const STORE_NAME = "quizResults";

export async function initQuizDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("username", "username");
        store.createIndex("date", "date");
      }
    },
  });
  return db;
}

export async function saveResultToIndexedDB(result) {
  const db = await initQuizDB();
  await db.add(STORE_NAME, result);
}

export async function getAllResults() {
  const db = await initQuizDB();
  return await db.getAll(STORE_NAME);
}