export interface MatchPlayer{
	rating: number,
	result: string,
	username: string
}

export interface MatchObject{
	black: MatchPlayer,
	white: MatchPlayer,
	end_time: number,
	rated: boolean,
	rules: string,
	time_class: string,
	time_control: string
}
