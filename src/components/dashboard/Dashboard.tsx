import React, { useState } from 'react';
import PlayerTable from "@/components/playerTable/PlayerTable";
import PlayerProfile from "@/components/playerProfile/PlayerProfile";

const Dashboard: React.FC = () => {
	const [selectedPlayer, setSelectedPlayer] = useState("");
	return (
		selectedPlayer === "" ?
			<div className="m-2 p-2 border-gray-500 border-2 rounded-lg w-full h-full flex flex-col justify-start gap-4">
				<div className="text-chessGreen">Powered by the chess.com api</div>
				<PlayerTable setSelectedPlayer={setSelectedPlayer}/>
			</div>
			: <div className=" border-gray-500 border-2 rounded-lg m-2 p-2 w-full h-full flex flex-col justify-start gap-4">
				<div className="text-chessGreen">Powered by the chess.com api</div>
				<PlayerProfile username={selectedPlayer} setSelectedPlayer={setSelectedPlayer}/>
			</div>
	)
}
export default Dashboard;
