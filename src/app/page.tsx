
import Image from "next/image";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import LearnCard from "./components/LearnCard";



export default function Home() {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <LearnCard
          imageSrc="/LearnImage/Traffic.png"
          title="Personal Safety and Crime Prevention"
          lessons="5 Lessons"
          buttonText="Learn"
        />
        <LearnCard
          imageSrc="/LearnImage/Terrorist.png"
          title="Anti Terrorist"
          lessons="8 Lessons"
          buttonText="Learn"
        />
        <LearnCard
          imageSrc="/LearnImage/Cyber.png"
          title="Cyber Security Campaign"
          lessons="6 Lessons"
          buttonText="Learn"
        />
        <LearnCard
          imageSrc="/LearnImage/Drugs.png"
          title="Anti Drug"
          lessons="6 Lessons"
          buttonText="Learn"
        />
         <LearnCard
          imageSrc="/LearnImage/Vote.png"
          title="Vote"
          lessons="6 Lessons"
          buttonText="Learn"
        />
        <LearnCard
          imageSrc="/LearnImage/CaseFiling.png"
          title="Case Filing"
          lessons="6 Lessons"
          buttonText="Learn"
        />
        
      </div>





    </>
  );
}
