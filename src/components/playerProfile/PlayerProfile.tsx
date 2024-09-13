import React, { useState, useEffect, useCallback, SetStateAction } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { get_player_mode_info } from '@/lib/api/chessapi';
import {
	defaultProfileDataObject,
	ProfileDataObject
} from '@/lib/models/PlayerDataModels';
import backarrow from '@/assets/back-arrow-icon.svg';
import PlayerInfoCard from '@/components/playerProfile/PlayerInfoCard';
import PlayerModeStats from '@/components/playerModeStats/PlayerModeStats';
import PlayerRatingCard from '@/components/playerRatingCard/PlayerRatingCard';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import GameHistory from '@/components/GameHistory/GameHistory';
import SelectBox from '@/components/selectBox/SelectBox';

interface PlayerProfileProps {
	username: string
	setSelectedPlayer: React.Dispatch<SetStateAction<string>>
}
const PlayerProfile: React.FC<PlayerProfileProps> = ({ username, setSelectedPlayer }) => {
	const [playerData, setPlayerData] = useState<ProfileDataObject[]>([defaultProfileDataObject])
	const [playerGameModes, setPlayerGameModes] = useState<string[]>([""]);
	const [currentGameMode, setCurrentGameMode] = useState("")
	const [currentGameModeData, setCurrentGameModeData] = useState<ProfileDataObject>(defaultProfileDataObject)

	const get_game_modes_from_data = (data: ProfileDataObject[]) => {
		const tempArray = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].mode !== "") {
				tempArray.push(data[i].mode);
			}
		}
		return tempArray;
	}

	const player_mode_selection_handler = useCallback((mode: string) => {
		const currentData = playerData.find((dataset) => dataset.mode == mode);
		if (currentData !== undefined) {
			setCurrentGameModeData(currentData)
		}
	}, [playerData])

	const fetch_player_data = useCallback(async () => {
		try {
			const data = await get_player_mode_info(username);
			if (data) {
				setPlayerData(data as ProfileDataObject[]);
			}
		} catch (error) {
			console.log(`error fetching player data: ${error}`)
		}
	}, [username])

	useEffect(() => {
		fetch_player_data();
	}, [fetch_player_data])

	useEffect(() => {
		if (currentGameMode === "") {
			player_mode_selection_handler("chess_daily")
		} else {
			player_mode_selection_handler(currentGameMode)
		}
		setPlayerGameModes(get_game_modes_from_data(playerData));
	}, [currentGameMode, playerData, player_mode_selection_handler])

	return (
		<div className="flex flex-col justify-start items-start md:h-dvh w-full">
			<div className="flex flex-col w-full">
				<div onClick={() => { setSelectedPlayer("") }}>
					<img className="m-2 h-8 w-8" src={backarrow} />
				</div>
				<div className="flex justify-start gap-10 items-center p-2">
					{playerData.length > 0
						? <div className="w-full">
							<PlayerInfoCard username={username} />
						</div>
						: <LoadingSpinner />
					}
				</div>
			</div>
			<div className="w-full h-1/2">
				<div className="flex flex-col md:w-1/4 m-4">
					{playerData.length > 0 && playerGameModes.length > 1
						? <SelectBox
							selectableItems={playerGameModes}
							callback={setCurrentGameMode}
							label={"Game Mode"}
						/>
						: <LoadingSpinner />
					}
				</div>
				{currentGameModeData ?
					<div className="flex md:flex-row flex-col justify-between w-full flex-grow h-3/4">
						<div className="flex md:flex-row flex-col md:w-1/2 h-full justify-start p-2 md:p-4 border rounded-lg md:m-2">
							<PlayerModeStats gameModeData={currentGameModeData} />
							<div className="md:w-1/2 w-full my-4 md:m-4 flex flex-row md:flex-col justify-evenly gap-2 flex-grow">
								<ScrollArea className="flex w-full">
									{Object.entries(currentGameModeData.data).map(([key, value], index) => {
										return (
											key !== "record" &&
											<PlayerRatingCard ratingStats={value} type={key} key={index} />
										)
									})}
								</ScrollArea>
							</div>
						</div>
						<div className="md:w-1/2 flex items-center justify-center border h-full my-2 md:m-2 rounded-lg">
							<GameHistory username={username} />
						</div>
					</div>
					: <LoadingSpinner />
				}
			</div>
		</div>
	)
}
export default PlayerProfile;
