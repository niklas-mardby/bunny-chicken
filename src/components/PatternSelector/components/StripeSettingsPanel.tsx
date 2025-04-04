import { StripeDirection, StripeStyle } from "../../../types";
import SliderWithTooltip from "../../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../../SliderWithTooltipGroup";

type StripeSettingsProps = {
	stripeCount: number;
	stripeDirection: StripeDirection;
	stripeStyle: StripeStyle;
	onCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDirectionChange: (direction: StripeDirection) => void;
	onStyleChange: (style: StripeStyle) => void;
	onChangeComplete: () => void;
};

const StripeSettingsPanel = ({
	stripeCount,
	stripeDirection,
	stripeStyle,
	onCountChange,
	onDirectionChange,
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
					<DirectionSelector
						direction={stripeDirection}
						onDirectionChange={onDirectionChange}
					/>
				</div>

				<div className="pattern-selector__stripes-count">
					<SliderWithTooltipGroup>
						<SliderWithTooltip
							id="stripeCount"
							label="Antal ränder"
							min={2}
							max={12}
							value={stripeCount}
							onChange={onCountChange}
							onChangeComplete={onChangeComplete}
							tooltipFormatter={(value) => `${value} st`}
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

// Helper components
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

type DirectionSelectorProps = {
	direction: StripeDirection;
	onDirectionChange: (arg0: StripeDirection) => void;
};

const DirectionSelector = ({
	direction,
	onDirectionChange,
}: DirectionSelectorProps) => (
	<div className="pattern-selector__stripes-direction">
		<fieldset className="pattern-selector__fieldset">
			<legend className="pattern-selector__legend">Riktning</legend>
			<div className="pattern-selector__radio-group">
				<RadioOption
					id="directionHorizontal"
					label="Horisontell"
					checked={direction === "horizontal"}
					onChange={() => onDirectionChange("horizontal")}
				/>
				<RadioOption
					id="directionVertical"
					label="Vertikal"
					checked={direction === "vertical"}
					onChange={() => onDirectionChange("vertical")}
				/>
				<RadioOption
					id="directionDiagonal"
					label="Diagonal"
					checked={direction === "diagonal"}
					onChange={() => onDirectionChange("diagonal")}
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
