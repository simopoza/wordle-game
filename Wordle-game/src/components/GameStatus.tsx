interface GameStatusProps {
	wonLoseFlag: string;
	remainAttempts: number;
	showPlayAgain: boolean;
	resetGame: () => void;
}

const GameStatus = ({ wonLoseFlag, remainAttempts, showPlayAgain, resetGame }: GameStatusProps) => {
	if (wonLoseFlag === "Won") {
		return (
			<div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-white p-8 rounded-md shadow-lg text-center">
					<h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
					<p className="text-xl mb-4">You won the game!</p>
					<button 
						onClick={resetGame} 
						className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
					>
						Play Again
					</button>
				</div>
			</div>
		);
	}

	if (wonLoseFlag === "Lost" && remainAttempts > 0) {
		return (
			<div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-white p-8 rounded-md shadow-lg text-center">
					<h1 className="text-3xl font-bold mb-4">Game Over</h1>
					<p className="text-lg mb-4">Remaining Attempts: {remainAttempts}</p>
					{showPlayAgain && (
						<button 
							onClick={resetGame} 
							className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
						>
							Play Again
						</button>
					)}
				</div>
			</div>
		);
	}

	return null;
};

export default GameStatus;
