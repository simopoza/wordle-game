interface PlayAgainButtonProps {
  resetGame: () => void;
}

const PlayAgainButton = ({ resetGame }: PlayAgainButtonProps) => (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-md shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-4">Time's up!</h1>
      <button 
        onClick={resetGame} 
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Play Again
      </button>
    </div>
  </div>
);

export default PlayAgainButton;
