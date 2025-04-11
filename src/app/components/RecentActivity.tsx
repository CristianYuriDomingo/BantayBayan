export default function RecentActivity() {
    // Custom SVG icon for Alert
    const AlertCircleIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    );
  
    return (
      <div>
        {/* Recent Activity Section */}
        <div className="p-4 border-b border-blue-100">
          <h2 className="text-lg font-bold text-blue-800 mb-3">Recent Activity</h2>
          
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-bold text-blue-700">Completed "Basic Traffic Rules"</p>
            <p className="text-sm text-blue-600">2 hours ago</p>
          </div>
        </div>
  
        {/* New Content Available Section */}
        <div className="p-4">
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-300 flex items-start">
            <div className="text-yellow-600 mr-3 flex-shrink-0 p-2 bg-yellow-200 rounded-full">
              <AlertCircleIcon />
            </div>
            <div>
              <p className="font-bold text-yellow-800">New Content Available!</p>
              <p className="text-sm text-yellow-700">Anti-Terrorist Campaign module has been updated with new lessons!</p>
              <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">
                Check it out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }