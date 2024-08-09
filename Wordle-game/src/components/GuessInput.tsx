
// interface Props {
//   inputKey: string;
//   word: string;
//   guess: string;
//   isGuessed: Boolean;
// }

// const GuessInput = ({inputKey, word, guess, isGuessed} : Props) => {
//   return (
//     <div className="grid grid-cols-5 gap-1 mb-2" data-key={inputKey}>
//       {new Array(5).fill(0).map((_, i) => {
//         const bgColor = !isGuessed 
//         ? 'bg-black' 
//         : guess[i] === word[i] 
//         ? 'bg-green-400' 
//         : word.includes(guess[i]) 
//         ? 'bg-yellow-400' 
//         : 'bg-black'
//         return (
//         <div key={i} className={`word-guess-input ${bgColor}`}>
//           {guess[i]}
//         </div>)
//       })}
//     </div>
//   )
// }

// export default GuessInput


// import { useState, useEffect } from 'react';

// interface Props {
//   inputKey: string;
//   word: string;
//   guess: string;
//   isGuessed: Boolean;
// }

// const GuessInput = ({ inputKey, word, guess, isGuessed }: Props) => {
//   const [flip, setFlip] = useState(false);

//   useEffect(() => {
//     if (isGuessed) {
//       // Trigger the flip animation when a guess is made
//       setFlip(true);

//       // Reset the flip state after the animation is done
//       const timer = setTimeout(() => setFlip(false), 600); // Adjust this to match the animation duration

//       return () => clearTimeout(timer);
//     }
//   }, [isGuessed]);

//   return (
//     <div className="grid grid-cols-5 gap-1 mb-2" data-key={inputKey}>
//       {new Array(5).fill(0).map((_, i) => {
//         const bgColor = !isGuessed
//           ? 'bg-black'
//           : guess[i] === word[i]
//           ? 'bg-green-400'
//           : word.includes(guess[i])
//           ? 'bg-yellow-400'
//           : 'bg-black';

//         return (
//           <div
//             key={i}
//             className={`word-guess-input ${bgColor} ${flip ? 'flip-animation' : ''}`}
//           >
//             {guess[i]}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default GuessInput;


// import { useState, useEffect } from 'react';

// interface Props {
//   inputKey: string;
//   word: string;
//   guess: string;
//   isGuessed: Boolean;
// }

// const GuessInput = ({ inputKey, word, guess, isGuessed }: Props) => {
//   const [animation, setAnimation] = useState<string[]>(new Array(5).fill(''));

//   useEffect(() => {
//     if (isGuessed) {
//       // Apply the flip animation to each character with a delay
//       const delays = new Array(5).fill(0).map((_, i) => `${i * 100}ms`);
//       setAnimation(delays);

//       // Reset the animation after it's done
//       const timer = setTimeout(() => setAnimation(new Array(5).fill('')), 600); // Adjust to match the total animation duration

//       return () => clearTimeout(timer);
//     }
//   }, [isGuessed]);

//   return (
//     <div className="grid grid-cols-5 gap-1 mb-2" data-key={inputKey}>
//       {new Array(5).fill(0).map((_, i) => {
//         const bgColor = !isGuessed
//           ? 'bg-black'
//           : guess[i] === word[i]
//           ? 'bg-green-400'
//           : word.includes(guess[i])
//           ? 'bg-yellow-400'
//           : 'bg-black';

//         return (
//           <div
//             key={i}
//             className={`word-guess-input ${bgColor} ${animation[i] ? 'flip-animation' : ''}`}
//             style={{ animationDelay: animation[i] }}
//           >
//             {guess[i]}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default GuessInput;


import { useState, useEffect } from 'react';

interface Props {
  inputKey: string;
  word: string;
  guess: string;
  isGuessed: Boolean;
}

const GuessInput = ({ inputKey, word, guess, isGuessed }: Props) => {
  const [animation, setAnimation] = useState<string[]>(new Array(5).fill(''));
  const [finalColors, setFinalColors] = useState<string[]>(new Array(5).fill(''));

  useEffect(() => {
    if (isGuessed) {
      // Apply the flip animation to each character with a delay
      const delays = new Array(5).fill(0).map((_, i) => `${i * 100}ms`);
      setAnimation(delays);

      // Determine the final colors after the flip
      const colors = new Array(5).fill('').map((_, i) => {
        if (guess[i] === word[i]) return 'bg-green-400';
        if (word.includes(guess[i])) return 'bg-yellow-400';
        return 'bg-black';
      });
      setFinalColors(colors);

      // Reset the animation and colors after it's done
      const timer = setTimeout(() => {
        setAnimation(new Array(5).fill(''));
        setFinalColors(new Array(5).fill('bg-black'));
      }, 600); // Adjust to match the total animation duration

      return () => clearTimeout(timer);
    }
  }, [isGuessed]);

  return (
    <div className="grid grid-cols-5 gap-1 mb-2" data-key={inputKey}>
      {new Array(5).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? 'bg-black'
          : guess[i] === word[i]
          ? 'bg-green-400'
          : word.includes(guess[i])
          ? 'bg-yellow-400'
          : 'bg-red-400';
        return (
          <div
            key={i}
            className={`word-guess-input ${bgColor} ${animation[i] ? 'flip-animation' : ''} ${finalColors[i]}`}
            style={{ animationDelay: animation[i] }}
          >
            {guess[i]}
          </div>
        );
      })}
    </div>
  );
};

export default GuessInput;
