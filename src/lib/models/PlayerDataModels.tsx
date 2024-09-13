export interface ProfileDataObject {
	mode: string,
	data: ModeData
}

export interface LeaderboardDataObject {
	mode: string,
	data: LeaderboardPlayer[]
}

export interface ModeData {
	best: DateRating,
	last: DateRating,
	record: ModeRecord
}

export interface DateRating {
	rating?: number,
	date?: number,
	game?: string,
	score?: number,
	total_attempts?: number,
	rd?: number,

}

export interface ModeRecord {
	win: number,
	loss: number,
	draw: number,
	time_per_move: number
}

export interface PlayerProfileDataModel {
	id: string, // the location of this profile (always self-referencing)
	url: string, // the chess.com user's profile page (the username is displayed with the original letter case)
	username: string, // the username of this player
	player_id: number, // the non-changing Chess.com ID of this player
	title: string, // (optional) abbreviation of chess title, if any
	status: string, // account status: closed, closed:fair_play_violations, basic, premium, mod, staff
	name: string, // (optional) the personal first and last name
	avatar: string, // (optional) URL of a 200x200 image
	location: string, // (optional) the city or location
	country: string, // API location of this player's country's profile
	joined: number, // timestamp of registration on Chess.com
	last_online: number, // timestamp of the most recent login
	followers: number // the number of players tracking this player's activity
	is_streamer: string, //if the member is a Chess.com streamer
	twitch_url: string,
	fide: number, // FIDE rating
	league: string,
}

export const defaultPlayerProfileDataModel = {
	id: "",
	url: "",
	username: "",
	player_id: 0,
	title: "",
	status: "",
	name: "",
	avatar: "",
	location: "",
	country: "",
	joined: 0,
	last_online: 0,
	followers: 0,
	is_streamer: "",
	twitch_url: "",
	fide: 0,
	league: "",
}

export const defaultProfileDataObject = {
	mode: "",
	data: {
		best: {
			rating: 0,
			date: 0,
			game: "",
		},
		last: {
			rating: 0,
			date: 0,
			game: "",
		},
		record: {
			win: 0,
			loss: 0,
			draw: 0,
			time_per_move: 0,
		},
	},
}

export interface LeaderboardPlayer{
	id: string,
	avatar: string,
	country: string,
	draw_count: number,
	flair_code: string,
	loss_count: number
	name: string,
	player_id: number,
	rank: number,
	score: number,
	status: string,
	url: string,
	username: string,
	win_count: number
}
