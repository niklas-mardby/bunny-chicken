import SliderWithTooltip from "../../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../../SliderWithTooltipGroup";

interface CheckeredSettingsProps {
	checkeredSize: number;
	checkeredRotation: number; // Ny prop för rotation
	onSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRotationChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Ny handler för rotation
	onChangeComplete: () => void;
}

const CheckeredSettingsPanel = ({
	checkeredSize,
	checkeredRotation,
	onSizeChange,
	onRotationChange,
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

				{/* Ny slider för rotation */}
				<SliderWithTooltip
					id="checkeredRotation"
					label="Rotation"
					min={0}
					max={90}
					value={checkeredRotation}
					onChange={onRotationChange}
					onChangeComplete={onChangeComplete}
					tooltipFormatter={(value) => `${value}°`}
				/>
			</SliderWithTooltipGroup>
		</div>
	);
};

export default CheckeredSettingsPanel;
