// React Imports...
import { useState, useEffect } from "react";

// App Imports...
import Heading from "./components/Heading";
import wrong from "./sounds/wrong.mp3";
import BoxContainer from "./components/BoxContainer";

// App
function App() {

  // States, Reference and constants
  const [gamePattern, setGamePattern] = useState([]);
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const [level, setLevel] = useState(0);
  const [heading, setHeading] = useState(`Press a key to start`);
  const [randomChosenColour, setRandomChosenColour] = useState(null)
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [isStarted, setIsStarted] = useState(false)
  const buttonColour = ["red", "blue", "green", "yellow"];
  const wrongSound = new Audio(wrong);


  const userClick = (color) => {
    // To check for user Click
    setUserClickedPattern([...userClickedPattern, color]);
  };


  const nextSequence = () => {
    // To Generate next sequence 
    setHeading(null);
    setLevel(level + 1);
    setUserClickedPattern([]);
    setRandomChosenColour(buttonColour[Math.floor(Math.random() * 4)]);
  };

  const checkAnswer = (i) => {
    // To check the user answer 
    if (userClickedPattern[i] !== gamePattern[i]) {
      setWrongAnswer(true);
      setIsStarted(false)
      setHeading("GameOver, Press Any Key to Restart");
      wrongSound.play();
      setTimeout(() => {
        setWrongAnswer(false);
      }, 200);
      setGamePattern([]);
      setLevel(0);
    } else if (i + 1 === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 700);
    }
  };


  useEffect(() => {
    // To re-render component after user clicks
    if (userClickedPattern.length !== 0) {
      checkAnswer(userClickedPattern.length - 1);
    }
    // eslint-disable-next-line
  }, [userClickedPattern]);

  useEffect(() => {
    const handleKeyPress = () => {
      setIsStarted(true)
      setTimeout(() => {
          nextSequence()
      }, 1000)
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setIsStarted]);

  useEffect(() => {
    // To re-render component after a new color is choosen
    if (randomChosenColour) {
      setGamePattern((gamepattern) => [...gamepattern, randomChosenColour]);
      setRandomChosenColour(null)
    }
  }, [randomChosenColour]);

  useEffect(() => {
    // To re-render component after the level changes or the new color choosed or the user selects a wrong answer

  }, [wrongAnswer, level, gamePattern])
  useEffect(() => {
    // To Update heading when the game starts
    if (isStarted) {
      setHeading("Starting...")
    }
  }, [isStarted])

  return (
    <>
      {/* Main container for the game */}
      <div className={`w-full h-[100vh] ${wrongAnswer ? "bg-[#ff0000] opacity-80" : "bg-[#011F3F]"} text-center`}>
        {/* Heading Component */}
        <Heading level={level} heading={heading} />
        {/* Box Container Component */}
        <BoxContainer randomChosenColour={randomChosenColour} userClick={userClick}  />
      </div>
    </>
  );
}

//Exporting the App
export default App;

