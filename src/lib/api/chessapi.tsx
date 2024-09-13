import { LeaderboardPlayer } from "@/lib/models/LeaderboardModels";
import { LeaderboardDataObject, ModeData, ProfileDataObject } from "../models/PlayerDataModels";

export async function get_leaderboard_info(game_mode: string): Promise<LeaderboardDataObject | undefined> {
	try {
		const response = await fetch(`https://api.chess.com/pub/leaderboards/`)
		const data = await response.json()

		const parsedData: LeaderboardDataObject[] = Object.entries(data).map(([mode, players]) => ({
			mode,
			data: players as LeaderboardPlayer[]
		}));
		const dataSelection = parsedData.find((dataset) => dataset.mode === game_mode)
		if (dataSelection) {
			return dataSelection
		}
	} catch (error) {
		console.log(`oh no it shidded: ${error}`)
	}
}

export async function get_player_profile_info(username: string) {
	try {
		const response = await fetch(`https://api.chess.com/pub/player/${username}`);
		const data = await response.json();
		return data;
	}
	catch (error) {
		console.log(`Error fetching player profile info: ${error}`)
	}

}

export async function get_player_mode_info(username: string): Promise<ProfileDataObject[] | undefined> {
	try {
		const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
		const data = await response.json();
		const parsedData: ProfileDataObject[] = Object.entries(data).map(([mode, modeData]) => ({
			mode,
			data: modeData as ModeData
		}));
		return (parsedData);
	}
	catch (error) {
		console.log(`oh no player not found!: ${error}`);
	}
}

export async function get_player_game_info(username: string) {
	try {
		const response = await fetch(`https://api.chess.com/pub/player/${username}/games/2024/09`);
		const data = await response.json();
		return data;
	}
	catch (error) {
		console.log(`Problem fetching data: ${error}`)
	}
}
