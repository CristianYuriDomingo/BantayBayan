// Import from idb
import { openDB } from 'idb';

const DB_NAME = 'ModuleDB';
const STORE_NAME = 'completedModules';
const DB_VERSION = 1;

// Define badges that will be awarded for each module
export const BADGES = {
  // Crime Prevention
  'anti-carnapping': 'Vehicle Protection Expert Badge',
  'anti-theft': 'Theft Prevention Specialist Badge',
  'illegal-firearms-awareness': 'Firearm Safety Advocate Badge',
  'anti-gambling': 'Responsible Gaming Advocate Badge',
  'anti-rape-and-sexual-assault-prevention': 'Sexual Assault Prevention Advocate Badge',

  // Cyber Security modules
  'cybersecurity-data-protection': 'Data Guardian Badge',
  'identity-privacy-protection': 'Privacy Protector Badge',
  'media-literacy-misinformation': 'Informed Citizen Badge',
  'safe-responsible-internet-use': 'Digital Safety Advocate Badge',

  // Emergency Hotlines
  'emergency-hotlines': 'Emergency Response Advocate Badge',

  // Drug Awareness
  'drug-awareness': 'Substance Abuse Awareness Badge',

  // How To Report A Crime
  'report-crime': 'Crime Reporting Advocate Badge',

  // Anti-terrorist modules
  'anti-terrorist': 'Peace Advocate Badge',

  // Road safety modules
  'road-safety': 'Safe Traveler Badge',
  'basic-traffic': 'Traffic Master Badge',

  // Inside 'traffic-rules-road-safety' module
  'traffic-basic-rules': 'Traffic Basics Star Badge',
  'road-safety-tips': 'Safety Tips Champion Badge',
  'pedestrian-safety': 'Smart Pedestrian Badge',
  'driving-under-influence': 'Sober Driver Badge',

  // Emergency Preparedness
  'emergency-response': 'Disaster Response Advocate Badge',
  'evacuation-procedures': 'Evacuation Safety Expert Badge',
  'fire-earthquake-drills': 'Drill Preparedness Advocate Badge',
  'first-aid-basics': 'First Aid Responder Badge',
  'disaster-awareness': 'Disaster Preparedness Advocate Badge',
  'rescue-hotline-awareness': 'Rescue Hotline Advocate Badge',
  //Voter Education
  'voter-education': 'Informed Voter Badge',

  //Public Transport Safety
  'public-transport-safety': 'Public Transport Safety Star Badge',

  // Anti-Smoking Module
  'anti-smoking': 'Smoke-Free Advocate Badge',
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