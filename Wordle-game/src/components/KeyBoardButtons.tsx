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
              ? "sm:w-14 w-14" // Wide buttons on desktop, narrower on mobile
              : "sm:w-10 w-6"; // Default width for other buttons

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
