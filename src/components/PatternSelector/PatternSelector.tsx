import { useState, useEffect } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import { Pattern, StripeDirection, StripeStyle } from "../../types";
import PatternOptions from "./components/PatternOptions";
import DotSettingsPanel from "./components/DotSettingsPanel";
import StripeSettingsPanel from "./components/StripeSettingsPanel";
import CheckeredSettingsPanel from "./components/CheckeredSettingsPanel";
import "./PatternSelector.scss";

const PatternSelector = () => {
	const {
		design,
		setPattern,
		updateDotSettings,
		updateStripeSettings,
		updateCheckeredSettings,
	} = useEggDesigner();

	// Local state for pattern settings
	const [dotSize, setDotSize] = useState(5);
	const [dotDensity, setDotDensity] = useState(0.5);
	const [stripeCount, setStripeCount] = useState(6);
	const [stripeDirection, setStripeDirection] =
		useState<StripeDirection>("horizontal");
	const [stripeStyle, setStripeStyle] = useState<StripeStyle>("straight");
	const [checkeredSize, setCheckeredSize] = useState(20);

	// Sync local state with global state
	useEffect(() => {
		if (design.patternSettings.dots) {
			setDotSize(design.patternSettings.dots.size);
			setDotDensity(design.patternSettings.dots.density);
		}

		if (design.patternSettings.stripes) {
			setStripeCount(design.patternSettings.stripes.count);
			setStripeDirection(design.patternSettings.stripes.direction);
			setStripeStyle(design.patternSettings.stripes.style);
		}

		if (design.patternSettings.checkered) {
			setCheckeredSize(design.patternSettings.checkered.size);
		}
	}, [design.patternSettings]);

	// Handle pattern change
	const handlePatternChange = (pattern: Pattern) => {
		setPattern(pattern);

		// Initialize pattern settings if they don't exist
		if (pattern === "dots" && !design.patternSettings.dots) {
			updateDotSettings(dotSize, dotDensity);
		} else if (pattern === "stripes" && !design.patternSettings.stripes) {
			updateStripeSettings(stripeCount, stripeDirection, stripeStyle);
		} else if (pattern === "checkered" && !design.patternSettings.checkered) {
			updateCheckeredSettings(checkeredSize);
		}
	};

	// Update callbacks
	const handleDotSettingsChange = () => {
		updateDotSettings(dotSize, dotDensity);
	};

	const handleStripeSettingsChange = () => {
		updateStripeSettings(stripeCount, stripeDirection, stripeStyle);
	};

	const handleCheckeredSettingsChange = () => {
		updateCheckeredSettings(checkeredSize);
	};

	// Render appropriate settings panel based on current pattern
	const renderSettingsPanel = () => {
		switch (design.patternSettings.pattern) {
			case "dots":
				return (
					<DotSettingsPanel
						dotSize={dotSize}
						dotDensity={dotDensity}
						onSizeChange={(e) => setDotSize(parseInt(e.target.value))}
						onDensityChange={(e) =>
							setDotDensity(parseFloat(e.target.value))
						}
						onChangeComplete={handleDotSettingsChange}
					/>
				);
			case "stripes":
				return (
					<StripeSettingsPanel
						stripeCount={stripeCount}
						stripeDirection={stripeDirection}
						stripeStyle={stripeStyle}
						onCountChange={(e) =>
							setStripeCount(parseInt(e.target.value))
						}
						onDirectionChange={(direction) => {
							setStripeDirection(direction);
							updateStripeSettings(stripeCount, direction, stripeStyle);
						}}
						onStyleChange={(style) => {
							setStripeStyle(style);
							updateStripeSettings(stripeCount, stripeDirection, style);
						}}
						onChangeComplete={handleStripeSettingsChange}
					/>
				);
			case "checkered":
				return (
					<CheckeredSettingsPanel
						checkeredSize={checkeredSize}
						onSizeChange={(e) =>
							setCheckeredSize(parseInt(e.target.value))
						}
						onChangeComplete={handleCheckeredSettingsChange}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="pattern-selector">
			<PatternOptions
				currentPattern={design.patternSettings.pattern}
				onPatternChange={handlePatternChange}
			/>
			{renderSettingsPanel()}
		</div>
	);
};

export default PatternSelector;
