// import { useEffect, useState } from "react";
// import GuessInput from "./components/GuessInput";
// import KeyBoardButtons from "./components/KeyBoardButtons";
// import useGameStore from "./store/store";

// function App() {
//   const {
//     word,
//     isValidatedWord,
//     guesses,
//     currentGuesses,
//     wonLoseFlag,
//     remainAttempts,
//     setGuess,
//     updateGuesses,
//     addGuess,
//     resetGame,
//   } = useGameStore();

//   const [showPlayAgain, setShowPlayAgain] = useState(false);
//   const [timer, setTimer] = useState(20);

//   useEffect(() => {
//     const handleKey = (event: KeyboardEvent) => {
//       if (wonLoseFlag === "Won" || wonLoseFlag === "Lost") {
//         // Ignore any input if the game is won or lost
//         return;
//       }
//       console.log("im in handleKey: ", event);
  
//       if (event.key.match(/^[a-z]$/i) && guesses[currentGuesses].length < 5) {
//         // Handle letter keys (A-Z or a-z)
//         setGuess(event.key.toLowerCase(), currentGuesses);
//       } else if (event.key === "Enter" && guesses[currentGuesses].length === 5) {
//         // Handle the Enter key
//         event.preventDefault();
//         addGuess(guesses[currentGuesses]);
//       } else if (event.key === "Backspace") {
//         // Handle the Backspace key
//         event.preventDefault();
//         updateGuesses();
//       }
//     };

//     window.addEventListener("keydown", handleKey);

//     return () => {
//       window.removeEventListener("keydown", handleKey);
//     };
//   }, [word, isValidatedWord, guesses, currentGuesses, setGuess, addGuess, updateGuesses]);

//   useEffect(() => {
//     if (wonLoseFlag === "Lost" && remainAttempts <= 0) {
//       // Start timer if attempts are zero or less
//       setShowPlayAgain(false);
//       setTimer(20);

//       const timerInterval = setInterval(() => {
//         setTimer(prev => {
//           if (prev <= 1) {
//             clearInterval(timerInterval);
//             setShowPlayAgain(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } else if (wonLoseFlag === "Lost" && remainAttempts > 0) {
//       setShowPlayAgain(true); // Show "Play Again" button if there are attempts left
//     } else {
//       setShowPlayAgain(false); // Hide "Play Again" button if not in a losing state
//     }
//   }, [wonLoseFlag, remainAttempts]);

//   return (
//     <div className="main-card relative">
//       <h1 className="header">Wordle</h1>
//       {guesses.map((_, i) => (
//         <GuessInput
//           key={i.toString()}
//           inputKey={i.toString()}
//           word={word}
//           guess={guesses[i]}
//           isGuessed={i < currentGuesses}
//         />
//       ))}
//       <KeyBoardButtons />
//       <p>word: {word}</p>

//       {/* Conditional Rendering for Game Status */}
//       {wonLoseFlag === "Won" && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-md shadow-lg text-center">
//             <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
//             <p className="text-xl mb-4">You won the game!</p>
//             <button 
//               onClick={resetGame} 
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//             >
//               Play Again
//             </button>
//           </div>
//         </div>
//       )}

//       {wonLoseFlag === "Lost" && remainAttempts > 0 && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-md shadow-lg text-center">
//             <h1 className="text-3xl font-bold mb-4">Game Over</h1>
//             <p className="text-lg mb-4">Remaining Attempts: {remainAttempts}</p>
//             {showPlayAgain && (
//               <button 
//                 onClick={resetGame} 
//                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//               >
//                 Play Again
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {wonLoseFlag === "Lost" && remainAttempts <= 0 && !showPlayAgain && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-md shadow-lg text-center">
//             <h1 className="text-xl font-bold mb-4">Please wait {timer}s before retrying.</h1>
//           </div>
//         </div>
//       )}

//       {wonLoseFlag === "Lost" && remainAttempts <= 0 && showPlayAgain && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-md shadow-lg text-center">
//             <h1 className="text-3xl font-bold mb-4">Time's up!</h1>
//             <button 
//               onClick={resetGame} 
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//             >
//               Play Again
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import GuessInput from "./components/GuessInput";
import KeyBoardButtons from "./components/KeyBoardButtons";
import useGameStore from "./store/store";
import GameStatus from "./components/GameStatus";
import Timer from "./components/Timer";
import PlayAgainButton from "./components/PlayAgainButton";

function App() {
  const {
    word,
    guesses,
    currentGuesses,
    wonLoseFlag,
    remainAttempts,
    setGuess,
    updateGuesses,
    addGuess,
    resetGame,
  } = useGameStore();

  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (wonLoseFlag === "Won" || wonLoseFlag === "Lost") {
        // Ignore any input if the game is won or lost
        return;
      }
      console.log("im in handleKey: ", event);
  
      if (event.key.match(/^[a-z]$/i) && guesses[currentGuesses].length < 5) {
        // Handle letter keys (A-Z or a-z)
        setGuess(event.key.toLowerCase(), currentGuesses);
      } else if (event.key === "Enter" && guesses[currentGuesses].length === 5) {
        // Handle the Enter key
        event.preventDefault();
        addGuess(guesses[currentGuesses]);
      } else if (event.key === "Backspace") {
        // Handle the Backspace key
        event.preventDefault();
        updateGuesses();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [word, guesses, currentGuesses, setGuess, addGuess, updateGuesses, wonLoseFlag]);

  useEffect(() => {
    if (wonLoseFlag === "Lost") {
      if (remainAttempts <= 0) {
        setShowPlayAgain(false);
        setTimer(20);

        const timerInterval = setInterval(() => {
          setTimer(prev => {
            if (prev <= 1) {
              clearInterval(timerInterval);
              setShowPlayAgain(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setShowPlayAgain(true); // Show "Play Again" button if there are attempts left
      }
    } else {
      setShowPlayAgain(false); // Hide "Play Again" button if not in a losing state
    }
  }, [wonLoseFlag, remainAttempts]);

  return (
    <div className="main-card relative">
      <h1 className="header">Wordle</h1>
      {guesses.map((_, i) => (
        <GuessInput
          key={i.toString()}
          inputKey={i.toString()}
          word={word}
          guess={guesses[i]}
          isGuessed={i < currentGuesses}
        />
      ))}
      <KeyBoardButtons />
      <p>word: {word}</p>

      {/* Conditional Rendering for Game Status */}
      <GameStatus
        wonLoseFlag={wonLoseFlag}
        remainAttempts={remainAttempts}
        showPlayAgain={showPlayAgain}
        resetGame={resetGame}
      />
      {wonLoseFlag === "Lost" && remainAttempts <= 0 && !showPlayAgain && (
        <Timer timer={timer} />
      )}
      {wonLoseFlag === "Lost" && remainAttempts <= 0 && showPlayAgain && (
        <PlayAgainButton resetGame={resetGame} />
      )}
    </div>
  );
}

export default App;
