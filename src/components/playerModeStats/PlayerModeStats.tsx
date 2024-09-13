import { ProfileDataObject } from '@/lib/models/PlayerDataModels';
import WinLossGraph from '@/components/winlossGraph/WinLossGraph';
interface PlayerModeStatsProps{
	gameModeData: ProfileDataObject
}
const PlayerModeStats: React.FC<PlayerModeStatsProps> = ({gameModeData}) => {
	return(
		<div className="flex flex-col gap-1 md:w-1/2 self-center w-full h-full md:h-auto">
			{gameModeData?.data?.record 
				?<WinLossGraph modeRecord = {gameModeData.data.record}/>
				:<div>no win/loss stats to display</div>
			}
		</div>
	)
}
export default PlayerModeStats
