import { openDB } from "idb";
 
const DB_NAME = "QuizDB";
const DB_VERSION = 1;
const STORE_NAME = "quizResults";

// Define quiz badges for each topic with their corresponding image paths
export const QUIZ_BADGES = {
  // Crime Prevention
  'crime-prevention': {
    title: 'Crime Prevention Expert',
    imagePath: '/BadgeImage/CrimePrevention/anti-carnapping.png'
  },
  // Cyber Security
  'cyber-security': {
    title: 'Cyber Security Guardian',
    imagePath: '/BadgeImage/CyberSecurity/cybersecurity-data-protection.png'
  },
  // Emergency Hotline
  'emergency-hotline': {
    title: 'Emergency Response Expert',
    imagePath: '/BadgeImage/EmergencyHotlines/emergency-hotlines.png'
  },
  // Drug Awareness
  'drug-awareness': {
    title: 'Drug Awareness Advocate',
    imagePath: '/BadgeImage/DrugAwareness/drug-awareness.png'
  },
  // Crime Report
  'crime-report': {
    title: 'Crime Reporting Specialist',
    imagePath: '/BadgeImage/ReportCrime/report-crime.png'
  },
  // Terrorist Awareness
  'terrorist-awareness': {
    title: 'Terrorist Awareness Sentinel',
    imagePath: '/BadgeImage/AntiTerrorist/anti-terrorist.png'
  },
  // Traffic Rules
  'traffic-rules': {
    title: 'Traffic Safety Expert',
    imagePath: '/BadgeImage/TrafficRules/traffic-basic-rules.png'
  },
  // Emergency Preparedness
  'emergency-preparedness': {
    title: 'Emergency Preparedness Master',
    imagePath: '/BadgeImage/EmergencyPreparedness/emergency-response.png'
  },
  // Voter Education
  'voter-education': {
    title: 'Informed Voter Expert',
    imagePath: '/BadgeImage/VoterEducation/voter-education.png'
  },
  // Transport Safety
  'transport-safety': {
    title: 'Transport Safety Specialist',
    imagePath: '/BadgeImage/PublicTransport/public-transport-safety.png'
  },
  // Anti Smoking
  'anti-smoking': {
    title: 'Anti-Smoking Champion',
    imagePath: '/BadgeImage/AntiSmoking/anti-smoking.png'
  }
};

// QuizResult structure (for documentation only)
/*
QuizResult = {
  id: number (optional),
  username: string,
  topic: string,
  score: number,
  total: number,
  percentage: number,
  date: string,
  badgeLevel: string,
  badgeCompletion: number,
  badgeTitle: string,
  badgeImage: string
}
*/

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
  
  // Get badge info based on the topic
  const topicKey = result.topic.toLowerCase();
  const badgeInfo = QUIZ_BADGES[topicKey] || {
    title: 'Quiz Completion Badge',
    imagePath: '/badges/default.png'  // Default badge if topic doesn't match
  };
  
  // Add badge info to result if not already present
  const resultWithBadge = {
    ...result,
    badgeTitle: result.badgeTitle || badgeInfo.title,
    badgeImage: result.badgeImage || badgeInfo.imagePath
  };
  
  const id = await db.add(STORE_NAME, resultWithBadge);
  return { ...resultWithBadge, id };
}

export async function getAllResults() {
  const db = await initQuizDB();
  return await db.getAll(STORE_NAME);
}

// Get results for a specific user
export async function getResultsByUsername(username) {
  const db = await initQuizDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const index = tx.store.index('username');
  return await index.getAll(username);
}