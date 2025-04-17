import { StripeStyle } from "../../../types";
import SliderWithTooltip from "../../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../../SliderWithTooltipGroup";

type StripeSettingsProps = {
	stripeCount: number;
	stripeRotation: number;
	stripeWidth: number; // Ny prop för bredden på ränder
	stripePosition: number; // Ny prop för position av ränder
	stripeStyle: StripeStyle;
	onCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRotationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Ny handler för bredd
	onPositionChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Ny handler för position
	onStyleChange: (style: StripeStyle) => void;
	onChangeComplete: () => void;
};

const StripeSettingsPanel = ({
	stripeCount,
	stripeRotation,
	stripeWidth,
	stripePosition,
	stripeStyle,
	onCountChange,
	onRotationChange,
	onWidthChange,
	onPositionChange,
	onStyleChange,
	onChangeComplete,
}: StripeSettingsProps) => {
	return (
		<div className="pattern-selector__settings">
			<div className="pattern-selector__stripes-settings">
				<div className="pattern-selector__stripes-top-row">
					<StyleSelector
						style={stripeStyle}
						onStyleChange={onStyleChange}
					/>
				</div>

				<div className="pattern-selector__stripes-sliders">
					<SliderWithTooltipGroup>
						<SliderWithTooltip
							id="stripeCount"
							label="Antal ränder"
							min={1}
							max={10}
							value={stripeCount}
							onChange={onCountChange}
							onChangeComplete={onChangeComplete}
							tooltipFormatter={(value) => `${value} st`}
						/>

						<SliderWithTooltip
							id="stripeWidth"
							label="Bredd på ränder"
							min={5}
							max={50}
							value={stripeWidth}
							onChange={onWidthChange}
							onChangeComplete={onChangeComplete}
							tooltipFormatter={(value) => `${value}px`}
						/>

						<SliderWithTooltip
							id="stripePosition"
							label="Position"
							min={1}
							max={100}
							value={stripePosition}
							onChange={onPositionChange}
							onChangeComplete={onChangeComplete}
							tooltipFormatter={(value) => `${value}%`}
						/>

						<SliderWithTooltip
							id="stripeRotation"
							label="Rotation"
							min={0}
							max={180}
							value={stripeRotation}
							onChange={onRotationChange}
							onChangeComplete={onChangeComplete}
							tooltipFormatter={(value) => `${value}°`}
						/>
					</SliderWithTooltipGroup>
				</div>
			</div>
		</div>
	);
};

type StyleSelectorProps = {
	style: StripeStyle;
	onStyleChange: (arg0: StripeStyle) => void;
};

// Helper component för stil-selector
const StyleSelector = ({ style, onStyleChange }: StyleSelectorProps) => (
	<div className="pattern-selector__stripes-style">
		<fieldset className="pattern-selector__fieldset">
			<legend className="pattern-selector__legend">Stil</legend>
			<div className="pattern-selector__radio-group">
				<RadioOption
					id="styleStraight"
					label="Raka"
					checked={style === "straight"}
					onChange={() => onStyleChange("straight")}
				/>
				<RadioOption
					id="styleZigzag"
					label="Zigzag"
					checked={style === "zigzag"}
					onChange={() => onStyleChange("zigzag")}
				/>
				<RadioOption
					id="styleWavy"
					label="Vågiga"
					checked={style === "wavy"}
					onChange={() => onStyleChange("wavy")}
				/>
			</div>
		</fieldset>
	</div>
);

type RadioOptionProps = {
	id: string;
	label: string;
	checked: boolean;
	onChange: () => void;
};

const RadioOption = ({ id, label, checked, onChange }: RadioOptionProps) => (
	<div className="pattern-selector__radio-option">
		<input
			id={id}
			type="radio"
			checked={checked}
			onChange={onChange}
			className="pattern-selector__radio"
		/>
		<label className="pattern-selector__radio-label" htmlFor={id}>
			{label}
		</label>
	</div>
);

export default StripeSettingsPanel;
