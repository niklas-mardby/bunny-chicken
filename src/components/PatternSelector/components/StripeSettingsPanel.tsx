import { StripeStyle } from "../../../types";
import SliderWithTooltip from "../../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../../SliderWithTooltipGroup";

type StripeSettingsProps = {
	stripeCount: number;
	stripeRotation: number; // Ändrat från stripeDirection till stripeRotation
	stripeStyle: StripeStyle;
	onCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRotationChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Ändrat från onDirectionChange
	onStyleChange: (style: StripeStyle) => void;
	onChangeComplete: () => void;
};

const StripeSettingsPanel = ({
	stripeCount,
	stripeRotation,
	stripeStyle,
	onCountChange,
	onRotationChange,
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
							min={2}
							max={12}
							value={stripeCount}
							onChange={onCountChange}
							onChangeComplete={onChangeComplete}
							tooltipFormatter={(value) => `${value} st`}
						/>

						{/* Ny slider för rotation */}
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
