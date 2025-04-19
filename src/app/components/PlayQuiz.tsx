"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const sampleQuestions = [
  {
    id: 1,
    topic: "cyber-security",
    question: "What is cybersecurity?",
    options: ["Protection of data", "Online shopping", "Gaming", "Cooking"],
    correctAnswer: "Protection of data",
    difficulty: "Easy",
    image: "/LessonImage/2.png",
  },
  {
    id: 2,
    topic: "cyber-security",
    question: "What is phishing?",
    options: ["A type of fish", "A cyber attack", "A game", "A cooking technique"],
    correctAnswer: "A cyber attack",
    difficulty: "Medium",
    image: "/images/phishing.png",
  },
  {
    id: 3,
    topic: "drug-prevention",
    question: "What is drug abuse?",
    options: ["Using medicine correctly", "Excessive use of drugs", "Eating healthy", "Sleeping early"],
    correctAnswer: "Excessive use of drugs",
    difficulty: "Easy",
    image: "/LessonImage/drug.png",
  },
];

export default function PlayQuiz({ topic }: { topic: string }) {
  const router = useRouter();

  // Filter questions based on the topic
  const questions = sampleQuestions.filter(q => q.topic === topic);

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
        <div className="px-6 py-8">
          {/* Question Image */}
          <div className="w-full flex justify-center mb-8">
            <div className="w-full max-w-xl rounded-xl overflow-hidden shadow-md">
              <Image 
                src={questions[currentQuestion].image} 
                alt="Question illustration" 
                width={800}
                height={400}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{questions[currentQuestion].question}</h2>

          {/* Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => {
              let buttonStyle = "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105";
              
              if (selectedAnswer === option) {
                if (showFeedback) {
                  // Show green if correct, red if incorrect
                  buttonStyle = option === questions[currentQuestion].correctAnswer 
                    ? "bg-green-500 text-white shadow-md transform scale-105" 
                    : "bg-red-500 text-white shadow-md";
                } else {
                  // Selected but feedback not yet shown
                  buttonStyle = "bg-blue-500 text-white shadow-md transform scale-105";
                }
              } else if (showFeedback && option === questions[currentQuestion].correctAnswer) {
                // Always highlight the correct answer when showing feedback
                buttonStyle = "bg-green-500 text-white shadow-md";
              }
              
              return (
                <button
                  key={index}
                  className={`w-full py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-300 ${buttonStyle} ${
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
            <div className={`text-center mb-6 py-3 px-4 rounded-lg font-medium shadow-sm ${
              answerStatus === "correct" ? "bg-green-100 text-green-800 border-l-4 border-green-500" : "bg-red-100 text-red-800 border-l-4 border-red-500"
            }`}>
              {answerStatus === "correct" 
                ? "✅ Correct! Great job!" 
                : `❌ ${selectedAnswer ? "Incorrect" : "Time's up!"}. The correct answer is: ${questions[currentQuestion].correctAnswer}`}
            </div>
          )}

          {/* Next/Finish Button with custom style */}
          <div className="flex justify-center mt-8">
            <button
              className={`relative px-8 py-3 text-base font-medium text-white bg-[#2d87ff] rounded-xl transition-all duration-150 ease-out ${
                (!selectedAnswer && !showFeedback) ? 'opacity-60 cursor-not-allowed' : ''
              } ${
                isButtonActive ? 'translate-y-1 shadow-none' : 'shadow-[0_4px_0_0_#2563eb]'
              }`}
              onMouseDown={() => (selectedAnswer || showFeedback) && setIsButtonActive(true)}
              onMouseUp={() => {
                if (selectedAnswer || showFeedback) {
                  setIsButtonActive(false);
                  handleNext();
                }
              }}
              onMouseLeave={() => setIsButtonActive(false)}
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