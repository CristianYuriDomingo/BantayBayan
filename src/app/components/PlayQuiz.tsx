"use client";
import { useState } from "react";
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
    topic: "DrugPrevention",
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
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    let updatedScore = score;
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      updatedScore += 1;
      setScore(updatedScore);
    }

    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Redirect to the result page
      router.push(`/Quiz/${topic}/result?score=${updatedScore}&total=${questions.length}`);

    }
  };

  if (questions.length === 0) {
    return <div className="text-center text-xl text-gray-600">No questions available for {topic}.</div>;
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 w-full h-screen p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl text-center relative z-10">
        {/* Progress Bar */}
        <div className="flex items-center justify-between w-full mb-8">
          <div className="w-full bg-gray-300 h-4 rounded-full relative overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <button className="ml-4 text-blue-500 text-3xl font-bold hover:text-blue-700 transition-all" onClick={() => router.push("/Learn")}>
            ✕
          </button>
        </div>

        {/* Question Image */}
        <div className="w-full h-80 relative mb-8 flex justify-center">
          <Image src={questions[currentQuestion].image} alt="question" width={500} height={350} className="rounded-lg shadow-md" />
        </div>

        {/* Question Text */}
        <p className="text-2xl mb-8 font-semibold text-gray-800">{questions[currentQuestion].question}</p>

        {/* Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`relative w-full py-4 rounded-2xl text-lg font-bold border-2 transition-all duration-200 ease-in-out
              ${selectedAnswer === option ? "bg-[#ffff] text-black border-[#006aff]" : "bg-[#5caeff] text-[#ffff] border-[#006aff] hover:bg-[#94c4ff] hover:border-[#006aff] shadow-md"}`}
              onClick={() => setSelectedAnswer(option)}
            >
              <span className="relative z-10">{option}</span>
            </button>
          ))}
        </div>

        {/* Next Button (Original Design Kept) */}
        <div className="mt-10">
          <button
            className={`relative inline-block px-8 py-4 text-lg font-bold uppercase border-2 rounded-2xl transition-all duration-200 ease-in-out
            text-[#2d87ff] border-[#2d87ff] bg-[#dbe9ff]
            ${isActive ? 'translate-y-[0.3em]' : 'hover:translate-y-[0.15em]'} shadow-lg`}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => {
              setIsActive(false);
              handleNext();
            }}
            onMouseLeave={() => setIsActive(false)}
          >
            <span
              className={`absolute inset-0 bg-[#5caeff] rounded-2xl transition-all duration-200 ease-in-out
              ${isActive ? 'translate-y-0 shadow-[0_0_0_2px_#4a98e5,0_0.1em_0_0_#4a98e5]' : 'translate-y-[0.3em] shadow-[0_0_0_2px_#4a98e5,0_0.4em_0_0_#2d87ff]'}`}
            />
            <span className="relative z-10 text-white">
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
