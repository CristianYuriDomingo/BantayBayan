export default function RecommendedNext() {
    // Custom SVG icons as components
    const BookIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    );
  
    const CheckCircleIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    );
  
    return (
      <div className="p-4 border-b border-blue-100">
        <h2 className="text-lg font-bold text-blue-800 mb-3">Recommended Next</h2>
        
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
            <div className="p-2 bg-blue-200 rounded-full mr-3 text-blue-700">
              <BookIcon />
            </div>
            <div>
              <p className="font-bold text-blue-700">Media Literacy & Misinformation</p>
              <p className="text-sm text-blue-600">Cybersecurity Module</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
            <div className="p-2 bg-green-200 rounded-full mr-3 text-green-700">
              <CheckCircleIcon />
            </div>
            <div>
              <p className="font-bold text-green-700">Road Safety Tips</p>
              <p className="text-sm text-green-600">Traffic Rules Module</p>
            </div>
          </div>
        </div>
      </div>
    );
  }