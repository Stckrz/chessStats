import { SetStateAction } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

interface SelectBoxProps {
	selectableItems: string[],
	callback: React.Dispatch<SetStateAction<string>>,
	label: string,
}
const SelectBox: React.FC<SelectBoxProps> = ({ selectableItems, callback, label }) => {
	return (
		<Select onValueChange={callback}>
			<SelectTrigger>
				<SelectValue placeholder={"chess_daily"}>
				</SelectValue>
			</SelectTrigger>
			<SelectContent
				className="bg-black w-full"
				//Added to stop propogation, this component was causing click-through to the items below.
				ref={(ref) => {
					if (!ref) return;
					ref.ontouchstart = (e => { e.preventDefault(); })
				}}>
				<SelectGroup>
					<SelectLabel>{label}</SelectLabel>
					{selectableItems.map((item: string, index: number) => {
						return (
							<SelectItem key={index} value={item}>
								{item}
							</SelectItem>
						)
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
export default SelectBox;
