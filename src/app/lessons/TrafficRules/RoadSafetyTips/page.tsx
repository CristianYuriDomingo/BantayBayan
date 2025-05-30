"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarouselComponent, { SlideProps } from "../../../components/CarouselComponent";
import Footer from "../../../components/Footer";
import SpeechBubble from "../../../components/SpeechBubble";
import Image from "next/image";
import { completeModule, getCompletedModules } from "../../../../../lib/moduleDB";
import CustomToast from "../../../components/CustomToast";

const RoadSafetyTips: React.FC = () => {
const [isClient, setIsClient] = useState(false);
const [completedModules, setCompletedModules] = useState<string[]>([]);
const [toast, setToast] = useState({
    message: "",
    type: "success" as "success" | "error" | "info",
    isVisible: false
}); 
const router = useRouter();

// Define the module ID
const MODULE_ID = "road-safety-tips";

// Define the slides for Anti-Carnapping content
const RoadSafetyTipsSlides: SlideProps[] = [
    {
        id: "strong-passwords",
        image: "/LearnImage/CyberSecurity/21.png",
        title: "Use Strong, Unique Passwords",
        content: "Create complex passwords using a mix of letters, numbers, and symbols. Avoid using the same password across multiple accounts."
      },
      {
        id: "software-updates",
        image: "/LearnImage/CyberSecurity/22.png",
        title: "Keep Software Up to Date",
        content: "Update your operating system and apps regularly to patch vulnerabilities that hackers might exploit."
      },
      {
        id: "2fa-protection",
        image: "/LearnImage/CyberSecurity/23.png",
        title: "Enable Two-Factor Authentication",
        content: "Add an extra layer of security by using 2FA on your online accounts."
      },
      {
        id: "secure-wifi",
        image: "/LearnImage/CyberSecurity/24.png",
        title: "Secure Your Wi-Fi Network",
        content: "Set a strong password and encryption on your home Wi-Fi to prevent unauthorized access."
      }
      
];

// Load completed modules from IndexedDB on component mount
useEffect(() => {
    const loadCompletedModules = async () => {
    try {
        const modules = await getCompletedModules();
        const moduleIds = modules.map(module => module.moduleId);
        setCompletedModules(moduleIds);
    } catch (error) {
        console.error("Error loading completed modules:", error);
    }
    };

    setIsClient(true);
    loadCompletedModules();
}, []);

// Show toast message
const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({
    message,
    type,
    isVisible: true
    });
};

// Hide toast message
const hideToast = () => {
    setToast(prev => ({
    ...prev,
    isVisible: false
    }));
};

// Handle the completion of the entire anti-carnapping module
const handleFinishModule = async (moduleId: string) => {
    try {
    // Complete the module in IndexedDB with a single moduleId for the whole anti-carnapping topic
    const badge = await completeModule({ 
        moduleId: MODULE_ID, 
        moduleName: "Road Safety Tips Module" 
    });
    
    console.log("Module completed, badge earned:", badge);

    // Update local state to reflect completion
    setCompletedModules(prev => 
        prev.includes(MODULE_ID) ? prev : [...prev, MODULE_ID]
    );

    // Show badge notification if a badge was earned
    if (badge) {
        console.log("Displaying toast for badge:", badge);
        showToast(`🎉 Badge Earned: ${badge.title}!`, "success");
    } else {
        console.log("No badge earned for this module");
    }
    } catch (error) {
    console.error("Error completing module:", error);
    showToast("Failed to save your progress", "error");
    }
};

return (
    <>
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
        {/* Custom Toast Component */}
        <CustomToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
        />
        
        {/* Background decorative elements */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#7bc8ff] rounded-full opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
        </div>  

        {/* Fixed X Button with improved styling */}
        <button
        className="fixed top-2 left-4 bg-white rounded-full p-2.5 shadow-md text-gray-500 hover:text-gray-700 hover:shadow-lg transition-all z-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => router.push("/Learn")}
        aria-label="Close and return to Learn page"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        </button>

        {/* Main content container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-6 flex flex-col items-center">
        {/* Enhanced top section with visual elements */}
        <div className="w-full p-4 mb-2">
            {/* Speech bubble with decoration */}
            <div className="relative">
            <SpeechBubble
                imageSrc="/MainImage/PibiTeach.png"
                messages={["Drive Smart, Stay Safe", "Enjoy Reading!"]}
            />
            </div>
        </div>

        {/* Enhanced separator with icon */}
        <div className="relative w-full mb-2 flex items-center justify-center">
            <div className="absolute h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-full"></div>
            <div className="relative bg-white p-2 rounded-full shadow-sm z-10">
            <Image
                src="/MainImage/Pibi.png"
                alt="Icon"
                width={20}
                height={20}
                className="h-8 w-auto"
            />
            </div>
        </div>

        {/* Learning module title */}
        <div className="w-full text-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">Road Safety Tips</h2>
            <p className="text-gray-600">Discover essential tips to ensure safety and responsibility while on the road.</p>
        </div>
        </div>

        {/* Carousel section with enhanced styling */}
        <div className="flex-grow flex justify-center items-center w-full relative z-10 px-4 mb-6">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-4 md:p-0 overflow-hidden">
            {isClient && (
            <CarouselComponent 
                slides={RoadSafetyTipsSlides}
                themeColor="blue"
                completedModules={completedModules} 
                onModuleComplete={handleFinishModule} 
                finishButtonText="Road Safety Tips Module"
                completedButtonText="✓ Module Completed"
                continueButtonText="Next Tip"
                backButtonText="Previous Tip"
                moduleId={MODULE_ID} // Pass the module ID explicitly
            />
            )}
        </div>
        </div>

        {/* Enhanced footer */}
        <div className="relative z-10">
        <Footer />
        </div>
    </div>
    </>
);
};

export default RoadSafetyTips;