import React, {
	createContext,
	useContext,
	useReducer,
	ReactNode,
	useMemo,
} from "react";
import { EggDesign, EggDesignAction, PatternSettings } from "../types";

// Initial pattern settings
const initialPatternSettings: PatternSettings = {
	pattern: "solid",
	colorScheme: {
		primary: "#FFB6C1", // Light pink (pastel)
		secondary: "#ADD8E6", // Light blue (pastel)
	},
};

// Initial state för EggDesign
const initialState: EggDesign = {
	patternSettings: initialPatternSettings,
	emojiDecorations: [],
	message: "",
};

// Reducer function
const eggDesignReducer = (
	state: EggDesign,
	action: EggDesignAction
): EggDesign => {
	console.log("Reducer called with action type:", action.type);
	console.log("Current state before update:", state);

	let newState: EggDesign;

	switch (action.type) {
		case "SET_PATTERN":
			console.log("SET_PATTERN payload:", action.payload);
			newState = {
				...state,
				patternSettings: {
					...state.patternSettings,
					pattern: action.payload,
				},
			};
			console.log("New state after update:", newState);
			return newState;
		case "SET_COLOR_SCHEME":
			console.log("SET_COLOR_SCHEME payload:", action.payload);
			newState = {
				...state,
				patternSettings: {
					...state.patternSettings,
					colorScheme: action.payload,
				},
			};
			console.log("New state after color update:", newState);
			return newState;
		case "UPDATE_PATTERN_SETTINGS":
			console.log("UPDATE_PATTERN_SETTINGS payload:", action.payload);
			newState = {
				...state,
				patternSettings: {
					...state.patternSettings,
					...action.payload,
				},
			};
			console.log("New state after pattern settings update:", newState);
			return newState;
		case "ADD_EMOJI":
			newState = {
				...state,
				emojiDecorations: [...state.emojiDecorations, action.payload],
			};
			console.log("New state after adding emoji:", newState);
			return newState;
		case "REMOVE_EMOJI":
			newState = {
				...state,
				emojiDecorations: state.emojiDecorations.filter(
					(_, index) => index !== action.payload
				),
			};
			console.log("New state after removing emoji:", newState);
			return newState;
		case "UPDATE_EMOJI":
			newState = {
				...state,
				emojiDecorations: state.emojiDecorations.map((decoration, index) =>
					index === action.payload.index
						? { ...decoration, ...action.payload.decoration }
						: decoration
				),
			};
			console.log("New state after updating emoji:", newState);
			return newState;
		case "SET_MESSAGE":
			newState = {
				...state,
				message: action.payload,
			};
			console.log("New state after setting message:", newState);
			return newState;
		case "RESET_DESIGN":
			console.log("Resetting design to initial state");
			return initialState;
		case "LOAD_DESIGN":
			console.log("Loading design:", action.payload);
			return action.payload;
		default:
			console.log("Unknown action type:", action);
			return state;
	}
};

// Context interface
interface EggDesignContextProps {
	state: EggDesign;
	dispatch: React.Dispatch<EggDesignAction>;
}

// Skapa context
const EggDesignContext = createContext<EggDesignContextProps | undefined>(
	undefined
);

// Provider component
interface EggDesignProviderProps {
	children: ReactNode;
}

export const EggDesignProvider: React.FC<EggDesignProviderProps> = ({
	children,
}) => {
	console.log("EggDesignProvider rendering");
	const [state, dispatch] = useReducer(eggDesignReducer, initialState);
	console.log("Current provider state:", state);

	const value = useMemo(() => ({ state, dispatch }), [state]);

	return (
		<EggDesignContext.Provider value={value}>
			{children}
		</EggDesignContext.Provider>
	);
};

// Custom hook för att använda context
export const useEggDesign = (): EggDesignContextProps => {
	const context = useContext(EggDesignContext);
	if (context === undefined) {
		throw new Error("useEggDesign must be used within an EggDesignProvider");
	}
	return context;
};
