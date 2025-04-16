import { useState, useEffect } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import { Pattern, StripeStyle } from "../../types";
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
	const [dotRotation, setDotRotation] = useState(0);
	const [stripeCount, setStripeCount] = useState(6);
	const [stripeRotation, setStripeRotation] = useState(0); // Ändrat från stripeDirection
	const [stripeStyle, setStripeStyle] = useState<StripeStyle>("straight");
	const [checkeredSize, setCheckeredSize] = useState(20);
	const [checkeredRotation, setCheckeredRotation] = useState(0);

	// Sync local state with global state
	useEffect(() => {
		if (design.patternSettings.dots) {
			setDotSize(design.patternSettings.dots.size);
			setDotDensity(design.patternSettings.dots.density);
			setDotRotation(design.patternSettings.dots.rotation || 0);
		}

		if (design.patternSettings.stripes) {
			setStripeCount(design.patternSettings.stripes.count);
			setStripeRotation(design.patternSettings.stripes.rotation ?? 0);
			setStripeStyle(design.patternSettings.stripes.style);
		}

		if (design.patternSettings.checkered) {
			setCheckeredSize(design.patternSettings.checkered.size);
			setCheckeredRotation(design.patternSettings.checkered.rotation || 0);
		}
	}, [design.patternSettings]);

	// Handle pattern change
	const handlePatternChange = (pattern: Pattern) => {
		setPattern(pattern);

		// Initialize pattern settings if they don't exist
		if (pattern === "dots" && !design.patternSettings.dots) {
			updateDotSettings(dotSize, dotDensity, dotRotation);
		} else if (pattern === "stripes" && !design.patternSettings.stripes) {
			updateStripeSettings(stripeCount, stripeRotation, stripeStyle);
		} else if (pattern === "checkered" && !design.patternSettings.checkered) {
			updateCheckeredSettings(checkeredSize, checkeredRotation);
		}
	};

	// Update callbacks
	const handleDotSettingsChange = () => {
		updateDotSettings(dotSize, dotDensity, dotRotation);
	};

	const handleStripeSettingsChange = () => {
		updateStripeSettings(stripeCount, stripeRotation, stripeStyle);
	};

	const handleCheckeredSettingsChange = () => {
		updateCheckeredSettings(checkeredSize, checkeredRotation);
	};

	// Render appropriate settings panel based on current pattern
	const renderSettingsPanel = () => {
		switch (design.patternSettings.pattern) {
			case "dots":
				return (
					<DotSettingsPanel
						dotSize={dotSize}
						dotDensity={dotDensity}
						dotRotation={dotRotation}
						onSizeChange={(e) => setDotSize(parseInt(e.target.value))}
						onDensityChange={(e) =>
							setDotDensity(parseFloat(e.target.value))
						}
						onRotationChange={(e) =>
							setDotRotation(parseInt(e.target.value))
						}
						onChangeComplete={handleDotSettingsChange}
					/>
				);

			case "stripes":
				return (
					<StripeSettingsPanel
						stripeCount={stripeCount}
						stripeRotation={stripeRotation}
						stripeStyle={stripeStyle}
						onCountChange={(e) =>
							setStripeCount(parseInt(e.target.value))
						}
						onRotationChange={(e) => {
							setStripeRotation(parseInt(e.target.value));
							updateStripeSettings(
								stripeCount,
								parseInt(e.target.value),
								stripeStyle
							);
						}}
						onStyleChange={(style) => {
							setStripeStyle(style);
							updateStripeSettings(stripeCount, stripeRotation, style);
						}}
						onChangeComplete={handleStripeSettingsChange}
					/>
				);
			case "checkered":
				return (
					<CheckeredSettingsPanel
						checkeredSize={checkeredSize}
						checkeredRotation={checkeredRotation}
						onSizeChange={(e) =>
							setCheckeredSize(parseInt(e.target.value))
						}
						onRotationChange={(e) =>
							setCheckeredRotation(parseInt(e.target.value))
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
