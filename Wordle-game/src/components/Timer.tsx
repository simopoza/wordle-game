interface TimerProps {
    timer: number;
}

const Timer = ({ timer }: TimerProps) => (
	<div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
		<div className="bg-white p-8 rounded-md shadow-lg text-center">
			<h1 className="text-xl font-bold mb-4">Please wait {timer}s before retrying.</h1>
		</div>
	</div>
);

export default Timer;
  