// Import from idb
import { openDB } from 'idb';

const DB_NAME = 'ModuleDB';
const STORE_NAME = 'completedModules';
const DB_VERSION = 1;

// Define badges that will be awarded for each module with their corresponding image paths
export const BADGES = {
  // Crime Prevention
 'anti-carnapping': {
  title: 'Vehicle Protection Expert Badge',
  imagePath: '/BadgeImage/CrimePrevention/anti-carnapping.png'
},
'anti-theft': {
  title: 'Theft Prevention Specialist Badge',
  imagePath: '/BadgeImage/CrimePrevention/anti-theft.png'
},
  'illegal-firearms-awareness': {
    title: 'Firearm Safety Advocate Badge',
    imagePath: './BadgeImage/CrimePrevention/illegal-firearms-awareness.png'
  },
  'anti-gambling': {
    title: 'Responsible Gaming Advocate Badge',
    imagePath: '/BadgeImage/CrimePrevention/anti-gambling.png'
  },
  'anti-rape-and-sexual-assault-prevention': {
    title: 'Sexual Assault Prevention Advocate Badge',
    imagePath: '/BadgeImage/CrimePrevention/anti-rape-and-sexual-assault-prevention.png'
  },
  
  // Cyber Security modules
  'cybersecurity-data-protection': {
    title: 'Data Guardian Badge',
    imagePath: '/BadgeImage/CyberSecurity/cybersecurity-data-protection.png'
  },
  'identity-privacy-protection': {
    title: 'Privacy Protector Badge',
    imagePath: '/BadgeImage/CyberSecurity/identity-privacy-protection.png'
  },
  'media-literacy-misinformation': {
    title: 'Informed Citizen Badge',
    imagePath: '/BadgeImage/CyberSecurity/media-literacy-misinformation.png'
  },
  'safe-responsible-internet-use': {
    title: 'Digital Safety Advocate Badge',
    imagePath: '/BadgeImage/CyberSecurity/safe-responsible-internet-use.png'
  },
  
  // Emergency Hotlines
  'emergency-hotlines': {
    title: 'Emergency Response Advocate Badge',
    imagePath: '/BadgeImage/EmergencyHotlines/emergency-hotlines.png'
  },
  
  // Drug Awareness
  'drug-awareness': {
    title: 'Substance Abuse Awareness Badge',
    imagePath: '/BadgeImage/DrugAwareness/drug-awareness.png'
  },
  
  // How To Report A Crime
  'report-crime': {
    title: 'Crime Reporting Advocate Badge',
    imagePath: '/BadgeImage/ReportCrime/report-crime.png'
  },
  
  // Anti-terrorist modules
  'anti-terrorist': {
    title: 'Peace Advocate Badge',
    imagePath: '/BadgeImage/AntiTerrorist/anti-terrorist.png'
  },
  
  // Inside 'traffic-rules-road-safety' module
  'traffic-basic-rules': {
    title: 'Traffic Basics Star Badge',
    imagePath: '/BadgeImage/TrafficRules/traffic-basic-rules.png'
  },
  'road-safety-tips': {
    title: 'Safety Tips Champion Badge',
    imagePath: '/BadgeImage/TrafficRules/road-safety-tips.png'
  },
  'pedestrian-safety': {
    title: 'Smart Pedestrian Badge',
    imagePath: '/BadgeImage/TrafficRules/pedestrian-safety.png'
  },
  'driving-under-influence': {
    title: 'Sober Driver Badge',
    imagePath: '/BadgeImage/TrafficRules/driving-under-influence.png'
  },
  
  // Emergency Preparedness
  'emergency-response': {
    title: 'Disaster Response Advocate Badge',
    imagePath: '/BadgeImage/EmergencyPreparedness/emergency-response.png'
  },
  'evacuation-procedures': {
    title: 'Evacuation Safety Expert Badge',
    imagePath: '/BadgeImage/EmergencyPreparedness/evacuation-procedures.png'
  },
  'fire-earthquake-drills': {
    title: 'Drill Preparedness Advocate Badge',
    imagePath: '/BadgeImage/EmergencyPreparedness/fire-earthquake-drills.png'
  },
  'first-aid-basics': {
    title: 'First Aid Responder Badge',
    imagePath: '/BadgeImage/EmergencyPreparedness/first-aid-basics.png'
  },
  'disaster-awareness': {
    title: 'Disaster Preparedness Advocate Badge',
    imagePath: '/BadgeImage/EmergencyPreparedness/disaster-awareness.png'
  },
  
  // Voter Education
  'voter-education': {
    title: 'Informed Voter Badge',
    imagePath: '/BadgeImage/VoterEducation/voter-education.png'
  },
  
  // Public Transport Safety
  'public-transport-safety': {
    title: 'Public Transport Safety Star Badge',
    imagePath: '/BadgeImage/PublicTransport/public-transport-safety.png'
  },
  
  // Anti-Smoking Module
  'anti-smoking': {
    title: 'Smoke-Free Advocate Badge',
    imagePath: '/BadgeImage/AntiSmoking/anti-smoking.png'
  },
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
  const badgeInfo = BADGES[moduleId] || null;
  
  console.log("moduleDB: Completing module with ID:", moduleId);
  console.log("moduleDB: Badge to be assigned:", badgeInfo ? badgeInfo.title : "None");
  
  await db.put(STORE_NAME, {
    moduleId,
    moduleName,
    completedAt: new Date(),
    badgeEarned: badgeInfo ? badgeInfo.title : null,
    badgeImage: badgeInfo ? badgeInfo.imagePath : null,
  });
  
  return badgeInfo; // Return the full badge info so you can use it for notifications
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

// Get all earned badges
export async function getEarnedBadges() {
  const completedModules = await getCompletedModules();
  return completedModules.filter(module => module.badgeEarned).map(module => ({
    moduleId: module.moduleId,
    moduleName: module.moduleName,
    badgeTitle: module.badgeEarned,
    badgeImage: module.badgeImage,
    completedAt: module.completedAt
  }));
}

// Component to display a badge
export function BadgeDisplay({ badgeInfo }) {
  if (!badgeInfo) return null;
  
  return `
    <div class="badge-container">
      <img src="${badgeInfo.imagePath}" alt="${badgeInfo.title}" class="badge-image" />
      <div class="badge-title">${badgeInfo.title}</div>
    </div>
  `;
}

// Usage example for displaying badges on a profile or achievements page
export async function renderBadgesSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const earnedBadges = await getEarnedBadges();
  
  if (earnedBadges.length === 0) {
    container.innerHTML = '<p>Complete modules to earn badges!</p>';
    return;
  }
  
  const badgesHTML = earnedBadges.map(badge => `
    <div class="badge-item">
      <img src="${badge.badgeImage}" alt="${badge.badgeTitle}" class="badge-image" />
      <div class="badge-info">
        <h3>${badge.badgeTitle}</h3>
        <p>Earned by completing: ${badge.moduleName}</p>
        <p>Completed on: ${new Date(badge.completedAt).toLocaleDateString()}</p>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = `
    <h2>Your Earned Badges</h2>
    <div class="badges-grid">
      ${badgesHTML}
    </div>
  `;
}