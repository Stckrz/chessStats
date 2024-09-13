import { MatchObject } from "@/lib/models/MatchModels"

interface GameHistoryMatchProps {
	match_stats: MatchObject,
}
const GameHistoryMatch: React.FC<GameHistoryMatchProps> = ({ match_stats }) => {
	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="flex w-full justify-evenly">
				<div>
					{match_stats.time_class}
				</div>
				<div>
					{new Date(match_stats.end_time * 1000).toLocaleDateString()}
				</div>
			</div>
			<div className="flex justify-between h-full w-full border rounded md:flex-row flex-col">
				<div className="flex flex-col text-left bg-chessWhite text-black md:w-1/2 p-2 rounded">
					<div>
						{match_stats.white.username}
					</div>
					<div>
						{match_stats.white.rating}
					</div>
					<div>
						{match_stats.white.result}
					</div>
				</div>
				<div className="h-full flex flex-col text-left md:text-right bg-chessBlack md:w-1/2 p-2 rounded">
					<div>
						{match_stats.black.username}
					</div>
					<div>
						{match_stats.black.rating}
					</div>
					<div>
						{match_stats.black.result}
					</div>
				</div>
			</div>
		</div>
	)

}
export default GameHistoryMatch;
