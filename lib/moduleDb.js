import { openDB } from 'idb';

const DB_NAME = 'ModuleDB';
const STORE_NAME = 'completedModules';
const DB_VERSION = 1;

// Define badges that will be awarded for each module
const BADGES = {

  // Crime Prevention
  'anti-carnapping': 'Vehicle Protection Expert Badge',
  'anti-theft': 'Theft Prevention Specialist Badge',
  'illegal-firearms-awareness': 'Firearm Safety Advocate Badge',
  'anti-gambling': 'Responsible Gaming Advocate Badge',
  'anti-rape-and-sexual-assault-prevention' :' Sexual Assault Prevention Advocate Badge',
  
  // Media literacy modules
  'media-literacy': 'Informed Citizen Badge',
  
  // Road safety modules
  'road-safety': 'Safe Traveler Badge',
  'basic-traffic': 'Traffic Master Badge',
  
  // Anti-terrorist modules
  'anti-terrorist': 'Peace Advocate Badge'
  
  
};

// Initialize the IndexedDB database
export async function initModuleDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'moduleId',
        });
      }
    },
  });
}

// Mark a module as completed and award the appropriate badge
export async function completeModule({ moduleId, moduleName }) {
  const db = await initModuleDB();
  const badge = BADGES[moduleId] || null;
  
  console.log("moduleDB: Completing module with ID:", moduleId);
  console.log("moduleDB: Badge to be assigned:", badge);

  await db.put(STORE_NAME, {
    moduleId,
    moduleName,
    completedAt: new Date(),
    badgeEarned: badge,
  });
  
  return badge; // Return the badge name so you can use it for notifications
}

// Get all completed modules
export async function getCompletedModules() {
  const db = await initModuleDB();
  return await db.getAll(STORE_NAME);
}

// Check if a specific module is completed
export async function isModuleCompleted(moduleId) {
  const db = await initModuleDB();
  return !!(await db.get(STORE_NAME, moduleId));
}

// Get a specific module by ID
export async function getModuleById(moduleId) {
  const db = await initModuleDB();
  return await db.get(STORE_NAME, moduleId);
}