import React, { useState, useEffect, useCallback } from 'react';
import { useViewport } from '@/hooks/useViewport';
import { get_player_profile_info } from '@/lib/api/chessapi';
import { defaultPlayerProfileDataModel, PlayerProfileDataModel } from '@/lib/models/PlayerDataModels';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

interface PlayerInfoCardProps {
	username: string,
}
const PlayerInfoCard: React.FC<PlayerInfoCardProps> = ({ username }) => {
	const [playerInfo, setPlayerInfo] = useState<PlayerProfileDataModel>(defaultPlayerProfileDataModel)
	const width = useViewport().width;

	const fetch_player_info = useCallback(async () => {
		const data = await get_player_profile_info(username)
		if (data) {
			setPlayerInfo(data)
		}
	}, [username])

	useEffect(() => {
		fetch_player_info()
	}, [fetch_player_info])

	return (
		playerInfo.username !== "" ?
			<div className="flex w-full items-center">
				<Card className="w-full flex items-center">
					<CardContent className="w-full">
						<div className={"flex w-100vw p-4w-full rounded mt-4 items-center justify-between"}>
							<div className="flex md:flex-row flex-col w-full items-center">
								<div>
									{playerInfo.avatar
										? <img src={playerInfo.avatar} />
										: <img src="https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif" />
									}
									<div>{playerInfo.username}</div>
								</div>
								<div className="md:w-1/2 w-full text-left m-2">
									<div>League: {playerInfo.league}</div>
									<div>Status: {playerInfo.status}</div>
									{playerInfo.location &&
										<div>Location: {playerInfo.location}</div>
									}
									{width < 800 &&
										<div className="md:w-1/2 flex flex-col self-start items-start">
											<div>date joined: {new Date(playerInfo.joined * 1000).toLocaleDateString()}</div>
											<div>last online: {new Date(playerInfo.last_online * 1000).toLocaleDateString()}</div>
										</div>
									}
								</div>
							</div>
							{width > 800 &&
								<div className="md:w-1/2 flex flex-col self-start justify-self-end items-end">
									<div>date joined: {new Date(playerInfo.joined * 1000).toLocaleDateString()}</div>
									<div>last online: {new Date(playerInfo.last_online * 1000).toLocaleDateString()}</div>
								</div>
							}
						</div>
					</CardContent>
				</Card>
			</div>
			: <LoadingSpinner />
	)
}
export default PlayerInfoCard;

