import useGameStore from "../store/store";

const KeyBoardButtons = () => {
  const {
    guesses,
    currentGuesses,
    wonLoseFlag,
    setGuess,
    updateGuesses,
    addGuess,
    getAllGuesses,
    getTrueGuesses,
    getWrongGuesses
  } = useGameStore();
  const letters = ["qwertyuiop", "asdfghjkl", "(Enter)zxcvbnm(delete)"];

  const clickOnLetter = (label: string) => {
      if (wonLoseFlag === "Won" || wonLoseFlag === "Lost") {
    // Ignore any input if the game is won or lost
    return;
  }
    console.log("keyPressed: ",label);
    if (guesses[currentGuesses].length < 5 && label !== 'enter' && label !== 'delete')
      setGuess(label.toLowerCase(), currentGuesses);
    if (label === "Enter") {
      addGuess(guesses[currentGuesses]);
    }
    if (label === "delete") {
      updateGuesses();
    }
  }

  return (
    <div className="py-3">
      {letters.map((rows, i) => (
        <div key={i} className="flex flex-row justify-center">
          {rows.split(/(\(Enter\)|\(delete\)|.)/).map((letter, index) => {
            if (letter === "") return null; // Skip empty strings from splitting
            const bgColor = getTrueGuesses().includes(letter) 
              ? 'bg-green-400'
              : getWrongGuesses().includes(letter)
              ? 'bg-yellow-400'
              : getAllGuesses().includes(letter)
              ? 'bg-gray-400'
              : 'bg-gray-200';

            const label = letter.replace(/[()]/g, ''); // Remove parentheses for display
            const additionalClasses = letter === "(Enter)" || letter === "(delete)" 
              ? "w-16" // Adjust width for special buttons
              : "w-10";

            return (
              <button 
                key={index} 
                className={`letter-class ${bgColor} ${additionalClasses}`}
                onClick={() => clickOnLetter(label)}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default KeyBoardButtons;



// import useGameStore from "../store/store";

// const KeyBoardButtons = () => {
//   const {
//     guesses,
//     currentGuesses,
//     wonLoseFlag,
//     setGuess,
//     updateGuesses,
//     addGuess,
//     getAllGuesses,
//     getTrueGuesses,
//     getWrongGuesses
//   } = useGameStore();

//   const lettersDesktop = ["qwertyuiop", "asdfghjkl", "(Enter)zxcvbnm(delete)"];
//   const lettersMobile = ["qwerty", "uiop", "asdf", "ghjkl", "(Enter)zxcv", "bnm(delete)"];

//   const clickOnLetter = (label: string) => {
//     if (wonLoseFlag === "Won" || wonLoseFlag === "Lost") {
//       // Ignore any input if the game is won or lost
//       return;
//     }
//     console.log("keyPressed: ",label);
//     if (guesses[currentGuesses].length < 5 && label !== 'enter' && label !== 'delete')
//       setGuess(label.toLowerCase(), currentGuesses);
//     if (label === "Enter") {
//       addGuess(guesses[currentGuesses]);
//     }
//     if (label === "delete") {
//       updateGuesses();
//     }
//   }

//   const letters = window.innerWidth < 640 ? lettersMobile : lettersDesktop;

//   return (
//     <div className="py-3">
//       {letters.map((rows, i) => (
//         <div key={i} className="flex flex-row justify-center">
//           {rows.split(/(\(Enter\)|\(delete\)|.)/).map((letter, index) => {
//             if (letter === "") return null; // Skip empty strings from splitting
//             const bgColor = getTrueGuesses().includes(letter) 
//               ? 'bg-green-400'
//               : getWrongGuesses().includes(letter)
//               ? 'bg-yellow-400'
//               : getAllGuesses().includes(letter)
//               ? 'bg-red-400'
//               : 'bg-gray-200';

//             const label = letter.replace(/[()]/g, ''); // Remove parentheses for display
//             const additionalClasses = letter === "(Enter)" || letter === "(delete)" 
//               ? "w-16" // Adjust width for special buttons
//               : "w-10";

//             return (
//               <button 
//                 key={index} 
//                 className={`letter-class ${bgColor} ${additionalClasses}`}
//                 onClick={() => clickOnLetter(label)}
//               >
//                 {label}
//               </button>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default KeyBoardButtons;
