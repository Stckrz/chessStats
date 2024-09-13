import React, { useState, useEffect, useCallback } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MatchObject } from '@/lib/models/MatchModels';
import { get_player_game_info } from '@/lib/api/chessapi';
import GameHistoryMatch from './GameHistoryMatch';

interface GameHistoryProps {
	username: string,
}

const GameHistory: React.FC<GameHistoryProps> = ({ username }) => {
	const [gameHistoryArray, setGameHistoryArray] = useState([]);

	const fetch_player_games = useCallback(async (username: string) => {
		const data = await get_player_game_info(username)
		if (data) {
			setGameHistoryArray(data.games);
		}
	}, [])

	useEffect(() => {
		fetch_player_games(username);
	}, [fetch_player_games, username])

	return (
		<ScrollArea className="w-full flex md:h-full p-2 h-96">
			{gameHistoryArray.length > 0
				? gameHistoryArray.map((gameObject: MatchObject, index) => {
					return (
						<div key={index}>
							<GameHistoryMatch match_stats={gameObject} />
							<Separator className="my-2" />
						</div>
					)
				})
				: <div>No matches yet this month</div>
			}
		</ScrollArea>
	)
}
export default GameHistory;
