import { create } from 'zustand';
import words from '../data/words.json';

interface GameState {
  word: string;
	isValidatedWord: Boolean;
	wonLoseFlag: '' | 'Won' | 'Lost';
  guesses: string[];
  currentGuesses: number;
  remainAttempts: number;
  setWord: (newWord: string) => void;
	setGuess: (character: string, index: number) => void;
	updateGuesses: () => void;
  addGuess: (guess: string) => void;
  incrementGuesses: () => void;
  decrementAttempts: () => void;
  resetGame: () => void;
  getAllGuesses: () => string[];
	getTrueGuesses: () => string[];
	getWrongGuesses: () => string[];
}

function getRandomWord(words: string[]): string {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

const useGameStore = create<GameState>((set, get) => ({
    word: getRandomWord(words),
		wonLoseFlag: '',
		isValidatedWord: false,
    guesses: Array(5).fill(''),
    currentGuesses: 0,
    remainAttempts: 5,
    setWord: (newWord) => set({ word: newWord }),
		setGuess: (character, index) =>
		set((state) => {
			const newGuesses = [...state.guesses];
			if (newGuesses[index].length < 5 && /^[A-Za-z]$/.test(character)) {
				newGuesses[index] += character.toLowerCase();
				return { guesses: newGuesses };
			}
			return state;
		}),
		addGuess: (guess) =>
    set((state) => {
			if (guess.length < 5){
				state.isValidatedWord = true;
				return state;
			}
      const newGuesses = [...state.guesses];
      const isValidGuess = words.includes(guess.toLowerCase());
      newGuesses[state.currentGuesses] = guess;
      const won = isValidGuess && guess.toLowerCase() === state.word.toLowerCase();
      const lost = !isValidGuess && state.currentGuesses >= 4;

			if (!isValidGuess && state.currentGuesses >= 4)
	      state.decrementAttempts();


      return {
        guesses: newGuesses,
        currentGuesses: state.currentGuesses + 1,
        wonLoseFlag: won ? 'Won' : lost ? 'Lost' : state.wonLoseFlag,
				isValidatedWord: false,
      };
    }),
		updateGuesses: () => 
			set((state) => {
				const newGuesses = [...state.guesses];
				const currentGuess = newGuesses[state.currentGuesses];
				newGuesses[state.currentGuesses] = currentGuess.slice(0, - 1);
				return { guesses: newGuesses };
		}),
    incrementGuesses: () =>
		set((state) => ({
        currentGuesses: state.currentGuesses + 1,
      })),
    decrementAttempts: () =>
      set((state) => ({
        remainAttempts: state.remainAttempts - 1,
      })),
    resetGame: () =>
      set((state) => ({
        word: getRandomWord(words),
        guesses: Array(5).fill(''),
        currentGuesses: 0,
        remainAttempts: state.wonLoseFlag === 'Won' ? 5 : state.remainAttempts,//if won reset it with 5 if lost give it the write number
				wonLoseFlag: '',
      })),
		getAllGuesses: () => {
			const state = get(); // Access the current state
			return state.guesses.slice(0, state.currentGuesses).join('').split('');
		},
		getTrueGuesses: () => {
			const state = get();
			return state.word.split('').filter((char, i) => {
				return state.guesses
					.slice(0, state.currentGuesses)
					.map((word) => word[i])
					.includes(char)
			})
		},
		getWrongGuesses: () => {
			const state = get();
			return state.word
				.split('')
				.filter((letter) => state.getAllGuesses().includes(letter));
		},
}));
		
export default useGameStore;
