import {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
	useRef,
	useMemo,
} from "react";
import "./SliderWithTooltipGroup.scss";

// Define the context type
type TooltipGroupContextType = {
	activeSlider: string | null;
	activateSlider: (id: string | null, callback?: () => void) => void;
	registerCallback: (id: string, callback: () => void) => void;
	unregisterCallback: (id: string) => void;
};

// Create context with undefined default value
const TooltipGroupContext = createContext<TooltipGroupContextType | undefined>(
	undefined
);

// Custom hook to use the tooltip group context
export const useTooltipGroup = (): TooltipGroupContextType => {
	const context = useContext(TooltipGroupContext);
	if (context === undefined) {
		throw new Error(
			"useTooltipGroup must be used within a SliderWithTooltipGroup"
		);
	}
	return context;
};

// Props type for the group component
type SliderWithTooltipGroupProps = {
	children: ReactNode;
	className?: string;
	title?: string;
	horizontal?: boolean;
	columns?: number; // Nytt attribut för att stödja kolumner
	customLayout?: boolean; // Nytt attribut för att tillåta en anpassad layout
};

export const SliderWithTooltipGroup = ({
	children,
	className = "",
	title,
	horizontal = false,
	columns = 1, // Standard är 1 kolumn
	customLayout = false, // Standard är false
}: SliderWithTooltipGroupProps) => {
	// State to track which slider is currently active (being dragged)
	const [activeSlider, setActiveSlider] = useState<string | null>(null);
	// Store callbacks for each slider
	const callbacksRef = useRef<Record<string, () => void>>({});

	// Register a callback for a slider
	const registerCallback = (id: string, callback: () => void) => {
		callbacksRef.current[id] = callback;
	};

	// Unregister a callback for a slider
	const unregisterCallback = (id: string) => {
		delete callbacksRef.current[id];
	};

	// Set the active slider and store any provided immediate callback
	const activateSlider = (id: string | null, callback?: () => void) => {
		setActiveSlider(id);
		if (callback) {
			// If a callback is provided immediately, store it temporarily
			if (id) {
				callbacksRef.current[id] = callback;
			}
		}
	};

	// Handle global mouseup/touchend to deactivate any active slider
	useEffect(() => {
		const handleGlobalMouseUp = () => {
			if (activeSlider && callbacksRef.current[activeSlider]) {
				// Call the callback for the active slider when mouse is released
				callbacksRef.current[activeSlider]();
			}
			setActiveSlider(null);
		};

		// Add event listeners to document
		document.addEventListener("mouseup", handleGlobalMouseUp);
		document.addEventListener("touchend", handleGlobalMouseUp);

		// Clean up event listeners on unmount
		return () => {
			document.removeEventListener("mouseup", handleGlobalMouseUp);
			document.removeEventListener("touchend", handleGlobalMouseUp);
		};
	}, [activeSlider]);

	const value = useMemo(
		() => ({
			activeSlider,
			activateSlider,
			registerCallback,
			unregisterCallback,
		}),
		[activeSlider]
	);

	// Beräkna klassnamn baserad på props
	const groupClassName = `slider-with-tooltip-group 
		${horizontal ? "slider-with-tooltip-group--horizontal" : ""} 
		${customLayout ? "slider-with-tooltip-group--custom-layout" : ""} 
		${
			columns > 1 && !customLayout
				? `slider-with-tooltip-group--columns-${columns}`
				: ""
		} 
		${className}`.trim();

	return (
		<TooltipGroupContext.Provider value={value}>
			<div className={groupClassName}>
				{title && (
					<h3 className="slider-with-tooltip-group__title">{title}</h3>
				)}
				<div className="slider-with-tooltip-group__container">
					{children}
				</div>
			</div>
		</TooltipGroupContext.Provider>
	);
};

export default SliderWithTooltipGroup;
