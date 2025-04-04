import SliderWithTooltip from "../../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../../SliderWithTooltipGroup";

interface CheckeredSettingsProps {
	checkeredSize: number;
	onSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeComplete: () => void;
}

const CheckeredSettingsPanel = ({
	checkeredSize,
	onSizeChange,
	onChangeComplete,
}: CheckeredSettingsProps) => {
	return (
		<div className="pattern-selector__settings">
			<SliderWithTooltipGroup>
				<SliderWithTooltip
					id="checkeredSize"
					label="Rutstorlek"
					min={10}
					max={80}
					value={checkeredSize}
					onChange={onSizeChange}
					onChangeComplete={onChangeComplete}
					tooltipFormatter={(value) => `${value}px`}
				/>
			</SliderWithTooltipGroup>
		</div>
	);
};

export default CheckeredSettingsPanel;
