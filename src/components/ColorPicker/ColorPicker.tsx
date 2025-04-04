import { useCallback } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import "./ColorPicker.scss";

// Fördefinierade pastellfärger
const PASTEL_COLORS = [
	"#ffb6c1", // ljusrosa
	"#add8e6", // ljusblå
	"#b0e0e6", // puderblå
	"#f5f5dc", // beige
	"#ffffe0", // ljusgul
	"#e6e6fa", // lavendel
	"#d8bfd8", // tistel
	"#dda0dd", // plommon
	"#98fb98", // ljusgrön
	"#ffdab9", // persika
	"#afeeee", // turkos
	"#ffa07a", // ljuskorall
	"#f0e68c", // kaki
	"#ffdead", // navajo vit
	"#b0c4de", // ljus stålblå
];

const ColorPicker = () => {
	const { design, setColorScheme } = useEggDesigner();

	// Hämta nuvarande färger
	const { primary, secondary } = design.patternSettings.colorScheme;

	// Hantera färgändring för primär färg
	const handlePrimaryColorChange = useCallback(
		(color: string) => {
			setColorScheme({
				primary: color,
				secondary,
			});
		},
		[secondary, setColorScheme]
	);

	// Hantera färgändring för sekundär färg
	const handleSecondaryColorChange = useCallback(
		(color: string) => {
			setColorScheme({
				primary,
				secondary: color,
			});
		},
		[primary, setColorScheme]
	);

	// Hantera färgval för primär färg
	const handlePrimaryColorInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setColorScheme({
				primary: e.target.value,
				secondary,
			});
		},
		[secondary, setColorScheme]
	);

	// Hantera färgval för sekundär färg
	const handleSecondaryColorInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setColorScheme({
				primary,
				secondary: e.target.value,
			});
		},
		[primary, setColorScheme]
	);

	return (
		<div className="color-picker">
			<div className="color-picker__section">
				<label className="color-picker__label" htmlFor="primaryColorInput">
					Primär färg
				</label>
				<div className="color-picker__input-group">
					<input
						id="primaryColorInput"
						type="color"
						value={primary}
						onChange={handlePrimaryColorInput}
						className="color-picker__color-input"
						placeholder="Välj primär färg"
					/>
					<span className="color-picker__color-code">{primary}</span>
				</div>
				<div className="color-picker__palette">
					{PASTEL_COLORS.map((color) => (
						<button
							key={color}
							className={`color-picker__color ${
								primary === color ? "color-picker__color--selected" : ""
							}`}
							style={{ backgroundColor: color }}
							onClick={() => handlePrimaryColorChange(color)}
							aria-label={`Välj färg ${color}`}
						/>
					))}
				</div>
			</div>

			{design.patternSettings.pattern !== "solid" && (
				<div className="color-picker__section">
					<label
						className="color-picker__label"
						htmlFor="secondaryColorInput"
					>
						Sekundär färg
					</label>
					<div className="color-picker__input-group">
						<input
							id="secondaryColorInput"
							type="color"
							value={secondary}
							onChange={handleSecondaryColorInput}
							className="color-picker__color-input"
							placeholder="Välj sekundär färg"
						/>
						<span className="color-picker__color-code">{secondary}</span>
					</div>
					<div className="color-picker__palette">
						{PASTEL_COLORS.map((color) => (
							<button
								key={color}
								className={`color-picker__color ${
									secondary === color
										? "color-picker__color--selected"
										: ""
								}`}
								style={{ backgroundColor: color }}
								onClick={() => handleSecondaryColorChange(color)}
								aria-label={`Välj färg ${color}`}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ColorPicker;
