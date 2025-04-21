"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Cybersecurity Quiz Questions
const cybersecurityQuestions = [
  {
    id: 1,
    topic: "Cyber-Security",
    question: "What should you use to create complex passwords?",
    options: ["Only lowercase letters", "A mix of letters, numbers, and symbols", "Your name and birthdate", "The same password for all accounts"],
    correctAnswer: "A mix of letters, numbers, and symbols",
    difficulty: "Easy",
    image: "/LearnImage/CyberSecurity/21.png",
  },
  {
    id: 2,
    topic: "Cyber-Security",
    question: "Why is it important to keep your software up to date?",
    options: ["To get new features only", "To patch vulnerabilities that hackers might exploit", "To use more storage space", "It's not important"],
    correctAnswer: "To patch vulnerabilities that hackers might exploit",
    difficulty: "Easy",
    image: "/LearnImage/CyberSecurity/22.png",
  },
  {
    id: 3,
    topic: "Cyber-Security",
    question: "What does 2FA stand for?",
    options: ["Two-Factor Authentication", "Two-Form Application", "Two-Face Authorization", "Two-Free Accounts"],
    correctAnswer: "Two-Factor Authentication",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/23.png",
  },
  {
    id: 4,
    topic: "Cyber-Security",
    question: "How can you secure your Wi-Fi network?",
    options: ["Leave it open for everyone", "Use a simple password like '123456'", "Set a strong password and encryption", "Disconnect when not in use"],
    correctAnswer: "Set a strong password and encryption",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/24.png",
  },
  {
    id: 5,
    topic: "Cyber-Security",
    question: "What personal information should you avoid posting online?",
    options: ["Your favorite color", "Your pet's name", "Your full address and ID numbers", "Your hobbies"],
    correctAnswer: "Your full address and ID numbers",
    difficulty: "Easy",
    image: "/LearnImage/CyberSecurity/33.png",
  },
  {
    id: 6,
    topic: "Cyber-Security",
    question: "Why should you review app permissions?",
    options: ["To make apps run faster", "To only give apps the permissions they truly need", "To see who created the app", "It's not necessary"],
    correctAnswer: "To only give apps the permissions they truly need",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/34.png",
  },
  {
    id: 7,
    topic: "Cyber-Security",
    question: "What should you do with old bills and IDs?",
    options: ["Keep them forever", "Throw them in the trash", "Shred them", "Post pictures of them online"],
    correctAnswer: "Shred them",
    difficulty: "Easy",
    image: "/LearnImage/CyberSecurity/35.png",
  },
  {
    id: 8,
    topic: "Cyber-Security",
    question: "What is social engineering in cybersecurity?",
    options: [
      "Building social media platforms", 
      "Impersonating people to steal information", 
      "Making friends online", 
      "Creating social networks"
    ],
    correctAnswer: "Impersonating people to steal information",
    difficulty: "Hard",
    image: "/LearnImage/CyberSecurity/36.png",
  },
  {
    id: 9,
    topic: "Cyber-Security",
    question: "What should you do before sharing information online?",
    options: ["Share it immediately", "Verify it with reputable sources", "Ask your friends", "Add your own details to it"],
    correctAnswer: "Verify it with reputable sources",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/37.png",
  },
  {
    id: 10,
    topic: "Cyber-Security",
    question: "What are deepfakes?",
    options: ["Deep sea creatures", "Fake profiles", "Manipulated videos or images designed to mislead", "Deep web browsers"],
    correctAnswer: "Manipulated videos or images designed to mislead",
    difficulty: "Hard",
    image: "/LearnImage/CyberSecurity/38.png",
  },
  {
    id: 11,
    topic: "Cyber-Security",
    question: "Why is it important to check the date of online posts?",
    options: ["To see if it's your birthday", "To make sure content is current and relevant", "Dates don't matter", "To check if it's a holiday"],
    correctAnswer: "To make sure content is current and relevant",
    difficulty: "Easy",
    image: "/LearnImage/CyberSecurity/39.png",
  },
  {
    id: 12,
    topic: "Cyber-Security",
    question: "What should you do when checking information online?",
    options: ["Use one source only", "Use multiple reliable sources", "Believe everything you read", "Ignore the sources"],
    correctAnswer: "Use multiple reliable sources",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/40.png",
  },
  {
    id: 13,
    topic: "Cyber-Security",
    question: "What should you do before clicking on links or downloads?",
    options: ["Click immediately", "Verify the source first", "Share with friends", "Ignore them completely"],
    correctAnswer: "Verify the source first",
    difficulty: "Easy",
    image: "/LearnImage/CyberSecurity/25.png",
  },
  {
    id: 14,
    topic: "Cyber-Security",
    question: "What should you do if you encounter cyberbullying?",
    options: ["Join in", "Ignore it always", "Report it", "Share it with others"],
    correctAnswer: "Report it",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/26.png",
  },
  {
    id: 15,
    topic: "Cyber-Security",
    question: "Why should you limit screen time?",
    options: ["To save electricity", "To avoid digital fatigue and improve focus", "Screens are always harmful", "It's not necessary"],
    correctAnswer: "To avoid digital fatigue and improve focus",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/28.png",
  },
  {
    id: 16,
    topic: "Cyber-Security",
    question: "What should you avoid doing on public Wi-Fi?",
    options: ["Browsing news", "Checking the weather", "Entering personal or financial information", "Using social media"],
    correctAnswer: "Entering personal or financial information",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/27.png",
  },
  {
    id: 17,
    topic: "Cyber-Security",
    question: "What should you do when asked for payments through email or SMS?",
    options: ["Pay immediately", "Double-check details", "Ignore all payment requests", "Share the request with friends"],
    correctAnswer: "Double-check details",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/29.png",
  },
  {
    id: 18,
    topic: "Cyber-Security",
    question: "What's often a sign of a scam?",
    options: ["Clear contact information", "Offers that sound too good to be true", "Professional website design", "Slow website loading"],
    correctAnswer: "Offers that sound too good to be true",
    difficulty: "Easy",
    image: "/LearnImage/CyberSecurity/30.png",
  },
  {
    id: 19,
    topic: "Cyber-Security",
    question: "How can you identify a secure website?",
    options: ["By its colorful design", "By looking for https:// in the URL", "By its popularity", "By its loading speed"],
    correctAnswer: "By looking for https:// in the URL",
    difficulty: "Medium",
    image: "/LearnImage/CyberSecurity/31.png",
  },
  {
    id: 20,
    topic: "Cyber-Security",
    question: "What should you do if you encounter a scam?",
    options: ["Keep it to yourself", "Only tell family members", "Report it to authorities or cybercrime units", "Share it on social media"],
    correctAnswer: "Report it to authorities or cybercrime units",
    difficulty: "Easy",
    image: "/LearnImage/CyberSecurity/32.png",
  },
];

// Crime Prevention Quiz Questions - Sample placeholder, replace with your actual content
const crimePreventionQuestions = [
  {
    id: 1,
    topic: "Crime-Prevention",
    question: "What is the best way to secure your home?",
    options: ["Leave doors unlocked", "Install proper locks and security systems", "Hide the key under a mat", "Never lock your doors"],
    correctAnswer: "Install proper locks and security systems",
    difficulty: "Easy",
    image: "/LearnImage/CrimePrevention/1.png",
  },
  {
    id: 2,
    topic: "Crime-Prevention",
    question: "When walking alone at night, you should:",
    options: ["Use well-lit paths", "Take shortcuts through dark alleys", "Look distracted on your phone", "Wear headphones with loud music"],
    correctAnswer: "Use well-lit paths",
    difficulty: "Medium",
    image: "/LearnImage/CrimePrevention/2.png",
  },
  // Add more crime prevention questions as needed
];

// Combine all question types into one array
const allQuestions = [...cybersecurityQuestions, ...crimePreventionQuestions];

export default function PlayQuiz({ topic }: { topic: string }) {
  const router = useRouter();

  // Filter questions based on the topic
  const questions = allQuestions.filter(q => q.topic === topic);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | null>(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [timerRunning, setTimerRunning] = useState(true);

  const isLastQuestion = currentQuestion === questions.length - 1;

  // Update progress bar on question change
  useEffect(() => {
    setProgressWidth(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion, questions.length]);

  // Timer effect
  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(30);
    setTimerRunning(true);

    // Only run timer when feedback is not shown
    let timer: NodeJS.Timeout;
    if (timerRunning && !showFeedback) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setTimerRunning(false);
            // Auto-select wrong answer if time runs out
            if (!selectedAnswer) {
              setAnswerStatus("incorrect");
              setShowFeedback(true);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentQuestion, showFeedback, timerRunning, selectedAnswer]);

  // Pause timer when feedback is shown
  useEffect(() => {
    if (showFeedback) {
      setTimerRunning(false);
    }
  }, [showFeedback]);

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    setAnswerStatus(isCorrect ? "correct" : "incorrect");
    setShowFeedback(true);
    setTimerRunning(false); // Stop timer when answer is selected
  };

  const handleNext = () => {
    if (!selectedAnswer && !showFeedback) return;
    
    // Update score if correct
    if (answerStatus === "correct") {
      setScore(score + 1);
    }

    // Reset states
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswerStatus(null);

    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
      setTimerRunning(true); // Restart timer for next question
    } else {
      // Redirect to the result page
      const finalScore = score + (answerStatus === "correct" ? 1 : 0);
      router.push(`/Quiz/${topic}/result?score=${finalScore}&total=${questions.length}&topic=${encodeURIComponent(topic)}`);
    }
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  };

  // Calculate timer color based on time left
  const getTimerColor = () => {
    if (timeLeft > 20) return "text-green-600";
    if (timeLeft > 10) return "text-yellow-500";
    return "text-red-600";
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center text-xl text-gray-600 p-8 bg-white rounded-xl shadow-md">
          No questions available for {topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}.
        </div>
      </div>
    );
  }

  const formattedTopic = topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full p-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-3xl overflow-hidden">
        {/* Header with Score and Question Counter */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
              Score: {score}/{questions.length}
            </div>
            <span className="font-medium">{formattedTopic}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-medium">Question {currentQuestion + 1}/{questions.length}</span>
            <button 
              className="text-white hover:text-blue-200 transition-colors" 
              onClick={() => router.push("/Learn")}
              aria-label="Close quiz"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-blue-100">
          <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${progressWidth}%` }}></div>
        </div>

        {/* Timer Display */}
        <div className="flex justify-center mt-4">
          <div className={`font-bold text-2xl ${getTimerColor()}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Container */}
        <div className="px-6 py-4">
          {/* Question Image - Minimized with no shadow/border */}
          <div className="w-full flex justify-center mb-4">
            <div className="w-48 h-48 flex items-center justify-center">
              <Image 
                src={questions[currentQuestion].image} 
                alt="Question illustration" 
                width={180}
                height={180}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">{questions[currentQuestion].question}</h2>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {questions[currentQuestion].options.map((option, index) => {
              let buttonStyle = "bg-blue-100 text-blue-600 hover:bg-blue-200";
              
              if (selectedAnswer === option) {
                if (showFeedback) {
                  // Show green if correct, red if incorrect
                  buttonStyle = option === questions[currentQuestion].correctAnswer 
                    ? "bg-green-500 text-white" 
                    : "bg-red-500 text-white";
                } else {
                  // Selected but feedback not yet shown
                  buttonStyle = "bg-blue-500 text-white";
                }
              } else if (showFeedback && option === questions[currentQuestion].correctAnswer) {
                // Always highlight the correct answer when showing feedback
                buttonStyle = "bg-green-500 text-white";
              }
              
              return (
                <button
                  key={index}
                  className={`w-full py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${buttonStyle} ${
                    showFeedback || timeLeft === 0 ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={() => !showFeedback && timeLeft > 0 && handleAnswerSelect(option)}
                  disabled={showFeedback || timeLeft === 0}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback Message */}
          {showFeedback && (
            <div className={`text-center mb-4 py-2 px-3 rounded-lg font-medium ${
              answerStatus === "correct" ? "bg-green-100 text-green-800 border-l-4 border-green-500" : "bg-red-100 text-red-800 border-l-4 border-red-500"
            }`}>
              {answerStatus === "correct" 
                ? "✅ Correct! Great job!" 
                : `❌ ${selectedAnswer ? "Incorrect" : "Time's up!"}. The correct answer is: ${questions[currentQuestion].correctAnswer}`}
            </div>
          )}

          {/* Next/Finish Button with more compact style */}
          <div className="flex justify-center mt-4 mb-4">
            <button
              className={`px-6 py-2 text-base font-medium text-white bg-blue-500 rounded-lg transition-all duration-150 ${
                (!selectedAnswer && !showFeedback) ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              onClick={() => {
                if (selectedAnswer || showFeedback) {
                  handleNext();
                }
              }}
              disabled={!selectedAnswer && !showFeedback}
            >
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}