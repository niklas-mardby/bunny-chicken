import SliderWithTooltip from "../../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../../SliderWithTooltipGroup";

type DotSettingsProps = {
	dotSize: number;
	dotDensity: number;
	onSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDensityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeComplete: () => void;
};

const DotSettingsPanel = ({
	dotSize,
	dotDensity,
	onSizeChange,
	onDensityChange,
	onChangeComplete,
}: DotSettingsProps) => {
	return (
		<div className="pattern-selector__settings">
			<SliderWithTooltipGroup>
				<SliderWithTooltip
					id="dotSize"
					label="Storlek på prickar"
					min={2}
					max={15}
					value={dotSize}
					onChange={onSizeChange}
					onChangeComplete={onChangeComplete}
					tooltipFormatter={(value) => `${value}px`}
				/>

				<SliderWithTooltip
					id="dotDensity"
					label="Täthet"
					min={0.2}
					max={1}
					step={0.1}
					value={dotDensity}
					onChange={onDensityChange}
					onChangeComplete={onChangeComplete}
					tooltipFormatter={(value) =>
						`${(parseFloat(value.toString()) * 100).toFixed(0)}%`
					}
				/>
			</SliderWithTooltipGroup>
		</div>
	);
};

export default DotSettingsPanel;
