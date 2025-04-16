import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	Pattern,
	ColorScheme,
	StripeStyle,
	EmojiDecoration,
	PatternSettings,
} from "../types";
import { useEggDesign } from "../context/EggDesignContext";

export const useEggDesigner = () => {
	const { state, dispatch } = useEggDesign();

	// Funktion för att uppdatera mönster
	const setPattern = useCallback(
		(pattern: Pattern) => {
			console.log("setPattern called with:", pattern);
			dispatch({ type: "SET_PATTERN", payload: pattern });
			console.log("dispatch was called, current state:", state);
		},
		[dispatch, state]
	);

	// Funktion för att uppdatera färgschema
	const setColorScheme = useCallback(
		(colorScheme: ColorScheme) => {
			dispatch({ type: "SET_COLOR_SCHEME", payload: colorScheme });
		},
		[dispatch]
	);

	// Funktion för att uppdatera specifika mönsterinställningar
	const updatePatternSettings = useCallback(
		(settings: Partial<PatternSettings>) => {
			dispatch({ type: "UPDATE_PATTERN_SETTINGS", payload: settings });
		},
		[dispatch]
	);

	// Funktion för att uppdatera rändinställningar
	const updateStripeSettings = useCallback(
		(count: number, rotation: number, style: StripeStyle) => {
			// Ändrat från direction till rotation
			console.log(
				"updateStripeSettings called with:",
				count,
				rotation, // Ändrat från direction till rotation
				style
			);
			updatePatternSettings({
				stripes: { count, rotation, style }, // Ändrat från direction till rotation
			});
		},
		[updatePatternSettings]
	);

	// Funktion för att uppdatera prickinställningar
	const updateDotSettings = useCallback(
		(size: number, density: number, rotation: number) => {
			console.log("updateDotSettings called with:", size, density, rotation);
			updatePatternSettings({
				dots: { size, density, rotation },
			});
		},
		[updatePatternSettings]
	);

	// Funktion för att uppdatera rutmönsterinställningar
	const updateCheckeredSettings = useCallback(
		(size: number, rotation: number = 0) => {
			console.log("updateCheckeredSettings called with:", size, rotation);
			updatePatternSettings({
				checkered: { size, rotation },
			});
		},
		[updatePatternSettings]
	);

	// Funktion för att lägga till emoji
	const addEmoji = useCallback(
		(emoji: string, position = { x: 50, y: 50 }, size = 30, rotation = 0) => {
			const newEmoji: EmojiDecoration = {
				id: uuidv4(), // Generera ett unikt ID för emojin
				emoji,
				position,
				size,
				rotation,
			};
			dispatch({ type: "ADD_EMOJI", payload: newEmoji });
		},
		[dispatch]
	);

	// Funktion för att ta bort emoji
	const removeEmoji = useCallback(
		(index: number) => {
			dispatch({ type: "REMOVE_EMOJI", payload: index });
		},
		[dispatch]
	);

	// Funktion för att uppdatera emoji
	const updateEmoji = useCallback(
		(index: number, decoration: Partial<EmojiDecoration>) => {
			dispatch({
				type: "UPDATE_EMOJI",
				payload: { index, decoration },
			});
		},
		[dispatch]
	);

	// Funktion för att uppdatera hälsningsmeddelande
	const setMessage = useCallback(
		(message: string) => {
			dispatch({ type: "SET_MESSAGE", payload: message });
		},
		[dispatch]
	);

	// Funktion för att återställa designen
	const resetDesign = useCallback(() => {
		dispatch({ type: "RESET_DESIGN" });
	}, [dispatch]);

	return {
		design: state,
		setPattern,
		setColorScheme,
		updatePatternSettings,
		updateStripeSettings,
		updateDotSettings,
		updateCheckeredSettings,
		addEmoji,
		removeEmoji,
		updateEmoji,
		setMessage,
		resetDesign,
	};
};
