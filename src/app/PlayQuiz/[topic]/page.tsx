import PlayQuiz from "../../components/PlayQuiz";

const QuizStartPage = ({ params }: { params: { topic: string } }) => {
  return (
    <div>
      <PlayQuiz topic={params.topic} />
    </div>
  );
};

export default QuizStartPage;
