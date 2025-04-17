// Typer för olika mönster
export type Pattern = "solid" | "dots" | "stripes" | "checkered" | "gradient";

// Stil för ränder
export type StripeStyle = "straight" | "zigzag" | "wavy";

// Interfacen för färger (utökad med stöd för fler färger)
export interface ColorScheme {
	primary: string;
	secondary: string;
	third?: string;
	fourth?: string;
	fifth?: string;
}

// Interface för olika mönsterinställningar

export interface PatternSettings {
	pattern: Pattern;
	colorScheme: ColorScheme;
	// Specifika inställningar för varje mönster
	dots?: {
		size: number;
		density: number;
		rotation: number; // Rotation (0-180 grader)
	};
	stripes?: {
		count: number; // Antal ränder (1-10)
		rotation: number; // Rotation (0-180 grader)
		width: number; // Ny property för bredd på ränderna
		position: number; // Ny property för position (1-100, default 50)
		style: StripeStyle;
	};
	checkered?: {
		size: number;
		rotation: number; // Rotation (0-90 grader)
	};
	gradient?: {
		direction: string; // t.ex. "linear" eller "radial"
		angle?: number; // För linjära gradienter
		type?: string; // För radiella gradienter ("circle", "ellipse")
	};
}

// Interface för emoji-motiv
export interface EmojiDecoration {
	id: string; // Unikt ID för varje emoji
	emoji: string;
	position: { x: number; y: number };
	size: number;
	rotation: number;
}

// Interface för hela äggdesignen
export interface EggDesign {
	patternSettings: PatternSettings;
	emojiDecorations: EmojiDecoration[];
	message: string;
}

// Action typer för reducer
export type EggDesignAction =
	| { type: "SET_PATTERN"; payload: Pattern }
	| { type: "SET_COLOR_SCHEME"; payload: ColorScheme }
	| { type: "UPDATE_PATTERN_SETTINGS"; payload: Partial<PatternSettings> }
	| { type: "ADD_EMOJI"; payload: EmojiDecoration }
	| { type: "REMOVE_EMOJI"; payload: number }
	| {
			type: "UPDATE_EMOJI";
			payload: { index: number; decoration: Partial<EmojiDecoration> };
	  }
	| { type: "SET_MESSAGE"; payload: string }
	| { type: "RESET_DESIGN" }
	| { type: "LOAD_DESIGN"; payload: EggDesign };
