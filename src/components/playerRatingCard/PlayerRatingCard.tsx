import React, { useState, useEffect } from 'react';
import { DateRating } from "@/lib/models/PlayerDataModels";
import { Card, CardContent, CardTitle } from "../ui/card";

interface PlayerRatingCardProps {
	ratingStats: DateRating,
	type: string,
}
const PlayerRatingCard: React.FC<PlayerRatingCardProps> = ({ ratingStats, type }) => {
	const [statArray, setStatArray] = useState<string[]>([""]);

	const format_object_string_array = (ratingObject: DateRating) => {
		const tempArray: string[] = []
		if (ratingObject) {
			Object.entries(ratingObject).map(([key, value]) => {
				if(key === "date"){
					const date = new Date(value * 1000).toLocaleDateString();
					tempArray.push(`${key}: ${date}`)
				}else if (key !== "game") {
					tempArray.push(`${key}: ${value}`)
				}
			})
			setStatArray(tempArray)
		}
	}

	useEffect(() => {
		format_object_string_array(ratingStats)
	}, [ratingStats])

	return (
		<Card className="p-1 md:m-2 w-full md:w-auto my-2">
			<CardTitle>
				{type}
			</CardTitle>
			<CardContent className="text-left">
				{
					statArray.map((statString, index) => {
						return (
							<p key={index}>{statString}</p>
						)
					})
				}
			</CardContent>
		</Card>
	)
}
export default PlayerRatingCard;
