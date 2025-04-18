"use client";
import { useState, useEffect } from "react";
import { getCompletedModules } from "../../../lib/moduleDB";

// Define types for our module data
interface CompletedModule {
  moduleId: string;
  moduleName: string;
  completedAt: string | Date;
  badgeEarned: string | null;
}

interface Activity {
  id: string;
  title: string;
  type: 'completion' | 'new-content' | 'badge-earned';
  time: Date;
  badge?: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Format relative time (e.g., "2 hours ago")
  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs: number = now.getTime() - date.getTime();
    const diffMins: number = Math.floor(diffMs / 60000);
    const diffHours: number = Math.floor(diffMins / 60);
    const diffDays: number = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 30) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    
    return date.toLocaleDateString();
  };
  
  useEffect(() => {
    // Fetch completed modules when component mounts
    async function fetchActivities() {
      try {
        setLoading(true);
        
        // Simulated data if getCompletedModules fails or isn't available
        let completedModules: CompletedModule[] = [];
        
        try {
          completedModules = await getCompletedModules();
        } catch (e) {
          console.error("Could not fetch modules from DB, using mock data", e);
          // Mock data as fallback
          completedModules = [
            { 
              moduleId: 'anti-rape-and-sexual-assault-prevention', 
              moduleName: 'Anti Rape & Sexual Assault Prevention', 
              completedAt: new Date(Date.now() - 360000), // 6 minutes ago
              badgeEarned: 'Sexual Assault Prevention Advocate Badge'
            },
            { 
              moduleId: 'anti-theft', 
              moduleName: 'Anti-Thef and Robbery Awareness', 
              completedAt: new Date(Date.now() - 960000), // 16 minutes ago
              badgeEarned: 'Theft Prevention Specialist Badge'
            },
            { 
              moduleId: 'anti-carnapping', 
              moduleName: 'Anti-Carnapping Module', 
              completedAt: new Date(Date.now() - 72000000), // 20 hours ago
              badgeEarned: 'Vehicle Protection Expert Badge'
            }
          ];
        }
        
        // Sort by completion date, most recent first
        const sortedActivities = completedModules
          .sort((a: CompletedModule, b: CompletedModule) => {
            const dateA = new Date(a.completedAt).getTime();
            const dateB = new Date(b.completedAt).getTime();
            return dateB - dateA; // Descending order (newest first)
          })
          .map((module: CompletedModule): Activity => ({
            id: module.moduleId,
            title: module.moduleName,
            type: 'completion',
            time: new Date(module.completedAt),
            badge: module.badgeEarned || undefined
          }));
          
        setActivities(sortedActivities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      } finally {
        setLoading(false);
      }
    }
    
    // Only run on client-side
    if (typeof window !== 'undefined') {
      fetchActivities();
    }
  }, []);
  
  // Custom SVG icon for Alert
  const AlertCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );
  
  // Custom SVG icon for Checkmark/Completion
  const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow w-full">
      {/* Recent Activity Section with fixed height and scrolling */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Recent Activity
        </h3>
        
        {loading ? (
          <div className="flex justify-center items-center py-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : activities.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-3">
            No recent activity found.
          </p>
        ) : (
          // Scrollable container with fixed height
          <div className="max-h-48 overflow-y-auto pr-1 mb-3" style={{ scrollbarWidth: 'thin' }}>
            <div className="space-y-1">
              {activities.slice(0, 3).map((activity) => (
                <div 
                  key={`${activity.id}-${activity.time.getTime()}`} 
                  className="flex items-start space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <div className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5">
                    <CheckCircleIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                      Completed "{activity.title}"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getRelativeTime(activity.time)}
                    </p>
                    {activity.badge && (
                      <p className="text-xs text-green-600 dark:text-green-400 truncate">
                        Earned: {activity.badge}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}