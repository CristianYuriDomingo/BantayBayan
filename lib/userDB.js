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

{/*import { openDB } from "idb";

const DB_NAME = "UserDB";
const STORE_NAME = "users";
const MODULE_STORE = "completedModules"; // New store for tracking completed modules

// Initialize IndexedDB with version update to add the new store
const initDB = async () => {
  const db = await openDB(DB_NAME, 2, { // Increased version number to trigger upgrade
    upgrade(db, oldVersion, newVersion) {
      // Create users store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
      
      // Create completed modules store if it doesn't exist
      if (!db.objectStoreNames.contains(MODULE_STORE)) {
        const moduleStore = db.createObjectStore(MODULE_STORE, { keyPath: "id", autoIncrement: true });
        moduleStore.createIndex("username", "username"); // Index for filtering by username
        moduleStore.createIndex("moduleId", "moduleId"); // Index for filtering by module ID
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

// MODULE COMPLETION TRACKING FUNCTIONS

// Check if a module is completed by a specific user
export const isModuleCompleted = async (username, moduleId) => {
  const db = await initDB();
  const tx = db.transaction(MODULE_STORE, "readonly");
  const store = tx.objectStore(MODULE_STORE);
  
  // Get all modules completed by this user
  const userModules = await store.index("username").getAll(username);
  
  // Check if any of them match the moduleId
  return userModules.some(module => module.moduleId === moduleId);
};

// Mark a module as completed for a user
export const markModuleCompleted = async (username, moduleId, moduleTitle) => {
  const db = await initDB();
  
  // First check if it's already completed to avoid duplicates
  const alreadyCompleted = await isModuleCompleted(username, moduleId);
  if (alreadyCompleted) {
    console.log(`Module "${moduleTitle}" already completed by ${username}`);
    return false;
  }
  
  // If not completed, add it to the database
  const tx = db.transaction(MODULE_STORE, "readwrite");
  const store = tx.objectStore(MODULE_STORE);
  
  await store.add({
    username,
    moduleId,
    moduleTitle,
    completedAt: new Date().toISOString()
  });
  
  await tx.done;
  console.log(`Module "${moduleTitle}" marked as completed for ${username}`);
  return true;
};

// Get count of completed modules for a user
export const getCompletedModulesCount = async (username) => {
  const db = await initDB();
  const tx = db.transaction(MODULE_STORE, "readonly");
  const store = tx.objectStore(MODULE_STORE);
  
  const userModules = await store.index("username").getAll(username);
  return userModules.length;
};

// Get all completed modules for a user
export const getCompletedModules = async (username) => {
  const db = await initDB();
  const tx = db.transaction(MODULE_STORE, "readonly");
  const store = tx.objectStore(MODULE_STORE);
  
  return await store.index("username").getAll(username);
};

// Calculate and award badges based on completion status
export const checkAndAwardModuleBadge = async (username, totalModulesCount) => {
  const completedCount = await getCompletedModulesCount(username);
  
  if (completedCount >= totalModulesCount) {
    return "🏅 Master Learner"; // All modules completed
  } else if (completedCount >= totalModulesCount / 2) {
    return "📖 Advanced Learner"; // Half or more modules completed
  } else if (completedCount > 0) {
    return "📚 Beginner Learner"; // At least one module completed
  } else {
    return "🔍 New Explorer"; // No modules completed yet
  }
}; */}