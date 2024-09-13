import './LoadingSpinner.css'; 
const LoadingSpinner: React.FC = () => {
	return(
		<div className="w-12 h-12 grid grid-cols-2 grid-rows-2 self-center">
			<div className="spinnerSquare spinnerSquare1"></div>
			<div className="spinnerSquare spinnerSquare2"></div>
			<div className="spinnerSquare spinnerSquare3"></div>
			<div className="spinnerSquare spinnerSquare4"></div>
		</div>
	)
}
export default LoadingSpinner;
