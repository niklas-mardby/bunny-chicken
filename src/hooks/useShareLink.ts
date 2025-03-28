import { useCallback } from "react";
import {
	EggDesign,
	Pattern,
	ColorScheme,
	EmojiDecoration,
	StripeDirection,
	StripeStyle,
} from "../types";
import { useEggDesign } from "../context/EggDesignContext";

export const useShareLink = () => {
	const { state, dispatch } = useEggDesign();

	// Interface för den komprimerade/minimala designen
	interface MinimalDesign {
		p: Pattern;
		c: ColorScheme;
		e: EmojiDecoration[];
		m: string;
		d?: { size: number; density: number };
		s?: { count: number; direction: StripeDirection; style: StripeStyle };
		ch?: { size: number };
	}

	// Skapa en delbar länk genom att koda designen som en URL-parameter
	const createShareLink = useCallback(() => {
		// Rensa bort onödig information och skapa en minimal version av designen
		const minimalDesign: MinimalDesign = {
			p: state.patternSettings.pattern,
			c: state.patternSettings.colorScheme,
			e: state.emojiDecorations,
			m: state.message,
		};

		// Olika mönsterinställningar baserat på mönstertyp
		if (
			state.patternSettings.pattern === "dots" &&
			state.patternSettings.dots
		) {
			minimalDesign.d = state.patternSettings.dots;
		} else if (
			state.patternSettings.pattern === "stripes" &&
			state.patternSettings.stripes
		) {
			minimalDesign.s = state.patternSettings.stripes;
		} else if (
			state.patternSettings.pattern === "checkered" &&
			state.patternSettings.checkered
		) {
			minimalDesign.ch = state.patternSettings.checkered;
		}

		// Konvertera designen till JSON och sedan till en UTF-8 säker base64-sträng
		try {
			const jsonString = JSON.stringify(minimalDesign);
			// Använd encodeURIComponent för att hantera unicode-tecken (emojis etc)
			const encodedJson = encodeURIComponent(jsonString);
			// Skapa URL med den kodade designen
			const shareUrl = `${window.location.origin}/share/${encodedJson}`;

			return shareUrl;
		} catch (error) {
			console.error("Error creating share link:", error);
			return window.location.origin;
		}
	}, [state]);

	// Ladda en design från en kodad sträng
	const loadDesignFromHash = useCallback(
		(hash: string) => {
			try {
				// Avkoda URL-komponenten först, och sedan tolka JSON
				const decodedJson = decodeURIComponent(hash);
				const decodedDesign = JSON.parse(decodedJson) as MinimalDesign;

				// Skapa en fullständig design från den minimala versionen
				const fullDesign: EggDesign = {
					patternSettings: {
						pattern: decodedDesign.p,
						colorScheme: decodedDesign.c,
					},
					emojiDecorations: decodedDesign.e || [],
					message: decodedDesign.m || "",
				};

				// Lägg till mönsterspecifika inställningar
				if (decodedDesign.p === "dots" && decodedDesign.d) {
					fullDesign.patternSettings.dots = decodedDesign.d;
				} else if (decodedDesign.p === "stripes" && decodedDesign.s) {
					fullDesign.patternSettings.stripes = decodedDesign.s;
				} else if (decodedDesign.p === "checkered" && decodedDesign.ch) {
					fullDesign.patternSettings.checkered = decodedDesign.ch;
				}

				// Ladda designen i context
				dispatch({ type: "LOAD_DESIGN", payload: fullDesign });

				return true;
			} catch (error) {
				console.error("Failed to load design from hash:", error);
				return false;
			}
		},
		[dispatch]
	);

	// Dela länken genom att kopiera den till urklipp
	const copyShareLink = useCallback(async () => {
		const shareUrl = createShareLink();

		try {
			await navigator.clipboard.writeText(shareUrl);
			return { success: true, url: shareUrl };
		} catch (error) {
			console.error("Failed to copy share link:", error);
			return { success: false, url: shareUrl };
		}
	}, [createShareLink]);

	return {
		createShareLink,
		loadDesignFromHash,
		copyShareLink,
	};
};
