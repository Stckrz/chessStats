import React, { useState, useEffect, SetStateAction, useCallback } from 'react';
import { LeaderboardPlayer } from '@/lib/models/LeaderboardModels';
import { get_leaderboard_info } from '@/lib/api/chessapi';
import { gameModes } from '@/lib/objects';
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHeader,
} from '@/components/ui/table';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import SelectBox from '@/components/selectBox/SelectBox';
import { useViewport } from '@/hooks/useViewport';

interface PlayerTableProps {
	setSelectedPlayer: React.Dispatch<SetStateAction<string>>
}
const PlayerTable: React.FC<PlayerTableProps> = ({ setSelectedPlayer }) => {
	const [currentGameMode, setCurrentGameMode] = useState("daily960");
	const [playerData, setPlayerData] = useState<LeaderboardPlayer[]>([]);
	const width = useViewport().width;

	const fetch_player_data = useCallback(async () => {
		try {
			const data = await get_leaderboard_info(currentGameMode);
			if (data !== undefined) {
				setPlayerData(data.data);
			}
		} catch (error) {
			console.log(`problem fetching leaderboard data: ${error}`);
		}
	}, [currentGameMode])

	useEffect(() => {
		fetch_player_data();
	}, [fetch_player_data])

	return (
		playerData.length > 0 ?
			<div className="w-full h-full rounded-xl">
				<div className="h-full">
					<div className="flex md:flex-row flex-col">
						<div className="p-4 m-2 text-xl w-full flex">
								Leaderboard scores for {currentGameMode}
						</div>
						<div className="flex flex-col md:w-1/3 m-4 z-50">
							<SelectBox
								selectableItems={gameModes}
								callback={setCurrentGameMode}
								label={"Game Modes"}
							/>
						</div>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableCell className="w-10 text-left">
									Rank
								</TableCell>
								<TableCell className="text-left">
									Name
								</TableCell>
								<TableCell className="text-left">
									Score
								</TableCell>
								{width > 800 &&
									<>
										<TableCell className="text-left">
											Wins
										</TableCell>
										<TableCell className="text-left">
											Losses
										</TableCell>
										<TableCell className="text-left">
											Draws
										</TableCell>
									</>
								}
							</TableRow>
						</TableHeader>
						<TableBody>
							{playerData.map((player) => {
								return (
									<TableRow
										key={player.username}
										onClick={() => setSelectedPlayer(player.username)}
									>
										<TableCell className="w-10">
											{player.rank}
										</TableCell>
										<TableCell>
											<div className="h-6 flex gap-2">
												<img
													className="object-contain rounded-full"
													src={player.avatar}>
												</img>
												<div className="flex items-center justify-center">
													{player.username}
												</div>
											</div>
										</TableCell>
										<TableCell className="text-left">
											{player.score}
										</TableCell>
										{width > 800 &&
											<>
												<TableCell className="text-left">
													{player.win_count}
												</TableCell>
												<TableCell className="text-left">
													{player.loss_count}
												</TableCell>
												<TableCell className="text-left">
													{player.draw_count}
												</TableCell>
											</>
										}
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</div>
			: <LoadingSpinner />

	);
};
export default PlayerTable;
