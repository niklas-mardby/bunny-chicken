/**
 * Konverterar en hex-färgkod till RGB-objekt
 * @param hex Hex-färgkod (med eller utan #)
 * @returns Ett objekt med r, g, b värden eller null om ogiltig input
 */
export const hexToRgb = (
	hex: string
): { r: number; g: number; b: number } | null => {
	// Ta bort # om den finns
	hex = hex.replace(/^#/, "");

	// Kontrollera om det är en giltig hex-färg
	if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
		return null;
	}

	// Konvertera till RGB
	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return { r, g, b };
};

/**
 * Konverterar RGB-värden till en hex-färgkod
 * @param r Röd (0-255)
 * @param g Grön (0-255)
 * @param b Blå (0-255)
 * @returns Hex-färgkod med #
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
	return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

/**
 * Genererar en ljusare version av en färg
 * @param hex Hex-färgkod
 * @param amount Mängd att ljusa upp (0-1)
 * @returns Ljusare färg som hex-kod
 */
export const lightenColor = (hex: string, amount: number): string => {
	const rgb = hexToRgb(hex);
	if (!rgb) return hex;

	return rgbToHex(
		Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount)),
		Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount)),
		Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount))
	);
};

/**
 * Genererar en mörkare version av en färg
 * @param hex Hex-färgkod
 * @param amount Mängd att mörka ner (0-1)
 * @returns Mörkare färg som hex-kod
 */
export const darkenColor = (hex: string, amount: number): string => {
	const rgb = hexToRgb(hex);
	if (!rgb) return hex;

	return rgbToHex(
		Math.max(0, Math.round(rgb.r * (1 - amount))),
		Math.max(0, Math.round(rgb.g * (1 - amount))),
		Math.max(0, Math.round(rgb.b * (1 - amount)))
	);
};

/**
 * Kontrollerar om en färg är ljus eller mörk
 * @param hex Hex-färgkod
 * @returns true om färgen är ljus, false om den är mörk
 */
export const isLightColor = (hex: string): boolean => {
	const rgb = hexToRgb(hex);
	if (!rgb) return true;

	// Beräkna luminans enligt YIQ-formeln
	const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

	return yiq >= 128; // Om YIQ är >= 128, anses färgen vara ljus
};
