import QuizInstructions from "../../components/QuizInstructions";

const QuizTopicPage = ({ params }: { params: { topic: string } }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <QuizInstructions topic={params.topic} />
    </div>
  );
};

export default QuizTopicPage;
