// lib/quizDb.js

// Define the badge information for each quiz topic
export const QUIZ_BADGES = {
  "crime-prevention": {
    title: "Crime Prevention Badge",
    imagePath: "/BadgeImage/QuizBadge/crime-prevention.png"
  },
  "cyber-security": {
    title: "Cyber Security Badge",
    imagePath: "/BadgeImage/QuizBadge/cyber-security.png"
  },
  "emergency-hotline": {
    title: "Emergency Hotline Badge",
    imagePath: "/BadgeImage/QuizBadge/emergency-hotline.png"
  },
  "drug-awareness": {
    title: "Drug Awareness Badge",
    imagePath: "/BadgeImage/QuizBadge/drug-awareness.png"
  },
  "terrorist-awareness": {
    title: "Terrorist Awareness Badge",
    imagePath: "/BadgeImage/QuizBadge/terrorist-awareness.png"
  },
  "traffic-rules": {
    title: "Traffic Rules Badge",
    imagePath: "/BadgeImage/QuizBadge/traffic-rules.png"
  },
  "emergency-preparedness": {
    title: "Emergency Preparedness Badge",
    imagePath: "/BadgeImage/QuizBadge/emergency-preparedness.png"
  },
  "voter-education": {
    title: "Voter Education Badge",
    imagePath: "/BadgeImage/QuizBadge/voter-education.png"
  },
  "transport-safety": {
    title: "Transport Safety Badge",
    imagePath: "/BadgeImage/QuizBadge/transport-safety.png"
  },
  "anti-smoking": {
    title: "Anti-Smoking Badge",
    imagePath: "/BadgeImage/QuizBadge/anti-smoking.png"
  },
  "crime-report": {
    title: "Crime Report Badge",
    imagePath: "/BadgeImage/QuizBadge/crime-report.png"
  },
  // Add a default badge
  "default": {
    title: "Quiz Completion Badge",
    imagePath: "/BadgeImage/QuizBadge/cyber-security.png"
  }
};

// IndexedDB Quiz Results functionality
const DB_NAME = 'PibiQuizDB';
const STORE_NAME = 'quizResults';
const DB_VERSION = 1;

// Open IndexedDB connection
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('username', 'username', { unique: false });
        store.createIndex('topic', 'topic', { unique: false });
        store.createIndex('date', 'date', { unique: false });
      }
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Save quiz result to IndexedDB
export const saveResultToIndexedDB = async (resultData) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const request = store.add(resultData);
      
      request.onsuccess = () => resolve(resultData);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
};

// Get all quiz results from IndexedDB
export const getQuizResultsFromIndexedDB = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting quiz results:', error);
    return [];
  }
};

// Get quiz results for a specific user
export const getUserQuizResults = async (username) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('username');
      const request = index.getAll(username);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting user quiz results:', error);
    return [];
  }
};

// Clear all quiz results
export const clearQuizResults = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();
      
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error clearing quiz results:', error);
    throw error;
  }
};