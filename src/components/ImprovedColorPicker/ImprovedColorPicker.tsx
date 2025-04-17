import { useState, useCallback } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import "./ImprovedColorPicker.scss";

// Fördefinierade pastellfärger (samma som tidigare)
const PASTEL_COLORS = [
	// https://coolors.co/9b5de5-f15bb5-fee440-00bbf9-00f5d4
	"#9B5DE5",
	"#F15BB5",
	"#72E1D1",
	"#FEE440",
	"#FC440F",
	"#00bbf9",
	"#00f5d4",
	"#00FFF5",
	"#644536",
	// https://coolors.co/ff99c8-fcf6bd-d0f4de-a9def9-e4c1f9
	"#A6DDAA",
	"#fcf6bd",
	"#E4C4B4",
	"#d0f4de",
	"#a9def9",
	"#e4c1f9",
	"#FD9BC5",
	"#B6B67C",
	// https://coolors.co/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-277da1
	"#f8961e",
	"#f9844a",
	"#f9c74f",
	"#90be6d",
	"#43aa8b",
	"#4d908e",
	"#277da1",
	//
	"#5C5552", // walnut brown
	// purples
	"#F7F0F5", // magnolia
	"#EAD7E4", // pale purple
	"#BF9BB8", // lilac
	"#BEA7E5", // wisteria
	"#985277", // magenta haze
	"#5C374C", // eggplant
	// greens
	"#7DCE82", // mantis
	"#76BC84", // emerald
	"#4C9F70", // shamrock green
	"#496F5D", // hookers green
	// yellows
	"#FFFD82", // icterine
	// reds
	"#ED6A5A", // bittersweet
	"#F35B04", // persimmon (rödish)
	// pinks
	"#FFA0AC", // salmon pink
	"#F896D8", // persian pink
	"#FF006E", // rose
	// blues
	"#3A86FF", // azure
	"#7678ED", // medium slate blue
	"#3D348B", // tekhelet
	"#04395E", // prussian blue
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
