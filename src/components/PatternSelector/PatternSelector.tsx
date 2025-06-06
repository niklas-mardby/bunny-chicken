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
	const [stripeRotation, setStripeRotation] = useState(0);
	const [stripeStyle, setStripeStyle] = useState<StripeStyle>("straight");
	const [stripeWidth, setStripeWidth] = useState(20); // Default bredd
	const [stripePosition, setStripePosition] = useState(50); // Default position (centrerad)
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
			// Synka de nya inställningarna
			setStripeWidth(design.patternSettings.stripes.width ?? 20);
			setStripePosition(design.patternSettings.stripes.position ?? 50);
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
			// Initiera med standardvärden för alla inställningar
			updateStripeSettings(
				1, // Börja med en rand som standard
				0, // Ingen rotation
				20, // Standard bredd
				50, // Centrerad position
				"straight" // Raka ränder som standard
			);
		} else if (pattern === "checkered" && !design.patternSettings.checkered) {
			updateCheckeredSettings(checkeredSize, checkeredRotation);
		}
	};

	// Update callbacks
	const handleDotSettingsChange = () => {
		updateDotSettings(dotSize, dotDensity, dotRotation);
	};

	const handleStripeSettingsChange = () => {
		updateStripeSettings(
			stripeCount,
			stripeRotation,
			stripeWidth,
			stripePosition,
			stripeStyle
		);
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
						onSizeChange={(e) => {
							setDotSize(parseInt(e.target.value));
							updateDotSettings(
								parseInt(e.target.value),
								dotDensity,
								dotRotation
							);
						}}
						onDensityChange={(e) => {
							setDotDensity(parseFloat(e.target.value));
							updateDotSettings(
								dotSize,
								parseFloat(e.target.value),
								dotRotation
							);
						}}
						onRotationChange={(e) => {
							setDotRotation(parseInt(e.target.value));
							updateDotSettings(
								dotSize,
								dotDensity,
								parseInt(e.target.value)
							);
						}}
						onChangeComplete={handleDotSettingsChange}
					/>
				);

			case "stripes":
				return (
					<StripeSettingsPanel
						stripeCount={stripeCount}
						stripeRotation={stripeRotation}
						stripeWidth={stripeWidth}
						stripePosition={stripePosition}
						stripeStyle={stripeStyle}
						onCountChange={(e) => {
							setStripeCount(parseInt(e.target.value));
							updateStripeSettings(
								parseInt(e.target.value),
								stripeRotation,
								stripeWidth,
								stripePosition,
								stripeStyle
							);
						}}
						onRotationChange={(e) => {
							setStripeRotation(parseInt(e.target.value));
							updateStripeSettings(
								stripeCount,
								parseInt(e.target.value),
								stripeWidth,
								stripePosition,
								stripeStyle
							);
						}}
						onWidthChange={(e) => {
							setStripeWidth(parseInt(e.target.value));
							updateStripeSettings(
								stripeCount,
								stripeRotation,
								parseInt(e.target.value),
								stripePosition,
								stripeStyle
							);
						}}
						onPositionChange={(e) => {
							setStripePosition(parseInt(e.target.value));
							updateStripeSettings(
								stripeCount,
								stripeRotation,
								stripeWidth,
								parseInt(e.target.value),
								stripeStyle
							);
						}}
						onStyleChange={(style) => {
							setStripeStyle(style);
							updateStripeSettings(
								stripeCount,
								stripeRotation,
								stripeWidth,
								stripePosition,
								style
							);
						}}
						onChangeComplete={handleStripeSettingsChange}
					/>
				);
			case "checkered":
				return (
					<CheckeredSettingsPanel
						checkeredSize={checkeredSize}
						checkeredRotation={checkeredRotation}
						onSizeChange={(e) => {
							setCheckeredSize(parseInt(e.target.value));
							updateCheckeredSettings(
								parseInt(e.target.value),
								checkeredRotation
							);
						}}
						onRotationChange={(e) => {
							setCheckeredRotation(parseInt(e.target.value));
							updateCheckeredSettings(
								checkeredSize,
								parseInt(e.target.value)
							);
						}}
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
