import { useState, useCallback } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import "./ImprovedColorPicker.scss";

// Fördefinierade pastellfärger (samma som tidigare)
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

// Interface för att spåra upp till 4 färger
interface ColorSchemeExtended {
	primary: string;
	secondary: string;
	tertiary?: string;
	quaternary?: string;
}

// Typen för aktiv/markerad färg
type SelectedColorType =
	| "primary"
	| "secondary"
	| "tertiary"
	| "quaternary"
	| null;

interface ImprovedColorPickerProps {
	// Hur många färger som behövs för det aktiva mönstret
	colorCount?: number;
}

const ImprovedColorPicker = ({
	colorCount = 2, // Standard är 2 färger (primär och sekundär)
}: ImprovedColorPickerProps) => {
	const { design, setColorScheme } = useEggDesigner();

	// Hämta nuvarande färger från globalt state
	const { primary, secondary } = design.patternSettings.colorScheme;

	// Definiera utökad färgschema med alla möjliga färger
	const extendedColorScheme: ColorSchemeExtended = {
		primary,
		secondary,
		tertiary: "#e6e6fa", // Default lavendel för tertiär
		quaternary: "#afeeee", // Default turkos för kvartiär
	};

	// Vilken färg som är markerad just nu (börjar med primary)
	const [selectedColor, setSelectedColor] =
		useState<SelectedColorType>("primary");

	// Hantera klick på en färg-selector (primary, secondary, etc.)
	const handleColorSelectorClick = useCallback(
		(colorType: SelectedColorType) => {
			setSelectedColor(colorType);
		},
		[]
	);

	// Hantera klick på en färg i paletten
	const handleColorSelect = useCallback(
		(color: string) => {
			if (!selectedColor) return;

			// Skapa ny färguppsättning baserat på vilken färg som var markerad
			const newColorScheme = { ...design.patternSettings.colorScheme };

			if (selectedColor === "primary") {
				newColorScheme.primary = color;
			} else if (selectedColor === "secondary") {
				newColorScheme.secondary = color;
			}
			// Här kan vi lägga till stöd för tertiary och quaternary senare
			// när EggDesignContext har uppdaterats för att stödja det

			// Uppdatera färgschemat i globalt state
			setColorScheme(newColorScheme);
		},
		[selectedColor, design.patternSettings.colorScheme, setColorScheme]
	);

	// Hantera direktval av färg via input
	const handleColorInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (!selectedColor) return;

			const newColor = e.target.value;
			const newColorScheme = { ...design.patternSettings.colorScheme };

			if (selectedColor === "primary") {
				newColorScheme.primary = newColor;
			} else if (selectedColor === "secondary") {
				newColorScheme.secondary = newColor;
			}
			// Stöd för tertiary och quaternary kommer här senare

			setColorScheme(newColorScheme);
		},
		[selectedColor, design.patternSettings.colorScheme, setColorScheme]
	);

	// Säker åtkomst till den aktuella utvalda färgen
	const getCurrentColor = (colorType: SelectedColorType): string => {
		if (!colorType) return "#ffffff"; // Fallback
		return extendedColorScheme[colorType] ?? "#ffffff";
	};

	// Om nuvarande färg är samma som den i paletten
	const isCurrentColor = (
		paletteColor: string,
		colorType: SelectedColorType
	): boolean => {
		if (!colorType) return false;
		const currentColor = extendedColorScheme[colorType];
		return currentColor === paletteColor;
	};

	return (
		<div className="improved-color-picker">
			{/* Färgvalsrutor (primär, sekundär, etc.) */}
			<div className="improved-color-picker__selectors">
				<button
					className={`improved-color-picker__selector ${
						selectedColor === "primary"
							? "improved-color-picker__selector--selected"
							: ""
					}`}
					style={{ backgroundColor: extendedColorScheme.primary }}
					onClick={() => handleColorSelectorClick("primary")}
					aria-label="Välj primär färg"
				>
					<span className="improved-color-picker__selector-label">
						Primär
					</span>
				</button>

				{colorCount >= 2 && (
					<button
						className={`improved-color-picker__selector ${
							selectedColor === "secondary"
								? "improved-color-picker__selector--selected"
								: ""
						}`}
						style={{ backgroundColor: extendedColorScheme.secondary }}
						onClick={() => handleColorSelectorClick("secondary")}
						aria-label="Välj sekundär färg"
					>
						<span className="improved-color-picker__selector-label">
							Sekundär
						</span>
					</button>
				)}

				{colorCount >= 3 && (
					<button
						className={`improved-color-picker__selector ${
							selectedColor === "tertiary"
								? "improved-color-picker__selector--selected"
								: ""
						}`}
						style={{ backgroundColor: extendedColorScheme.tertiary }}
						onClick={() => handleColorSelectorClick("tertiary")}
						aria-label="Välj tertiär färg"
					>
						<span className="improved-color-picker__selector-label">
							Tertiär
						</span>
					</button>
				)}

				{colorCount >= 4 && (
					<button
						className={`improved-color-picker__selector ${
							selectedColor === "quaternary"
								? "improved-color-picker__selector--selected"
								: ""
						}`}
						style={{ backgroundColor: extendedColorScheme.quaternary }}
						onClick={() => handleColorSelectorClick("quaternary")}
						aria-label="Välj kvartiär färg"
					>
						<span className="improved-color-picker__selector-label">
							Kvartiär
						</span>
					</button>
				)}
			</div>

			{/* Färgväljarens input-del och palette i en rad */}
			<div className="improved-color-picker__color-section">
				{/* Färgpaletten */}
				<div className="improved-color-picker__palette">
					{PASTEL_COLORS.map((color) => (
						<button
							key={color}
							className={`improved-color-picker__color-swatch ${
								selectedColor && isCurrentColor(color, selectedColor)
									? "improved-color-picker__color-swatch--selected"
									: ""
							}`}
							style={{ backgroundColor: color }}
							onClick={() => handleColorSelect(color)}
							aria-label={`Välj färg ${color}`}
						/>
					))}
				</div>

				{/* Custom färgval */}
				{selectedColor && (
					<div className="improved-color-picker__input-group">
						<input
							type="color"
							value={getCurrentColor(selectedColor)}
							onChange={handleColorInputChange}
							className="improved-color-picker__color-input"
							aria-label={`Välj ${selectedColor} färg`}
						/>
						<span className="improved-color-picker__color-code">
							{getCurrentColor(selectedColor).toUpperCase()}
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImprovedColorPicker;
