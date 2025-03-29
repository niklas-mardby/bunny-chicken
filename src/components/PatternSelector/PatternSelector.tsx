import React, { useState, useEffect } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import { Pattern, StripeDirection, StripeStyle } from "../../types";
import SliderWithTooltip from "../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../SliderWithTooltipGroup/SliderWithTooltipGroup";
import "./PatternSelector.scss";

const PatternSelector: React.FC = () => {
	const {
		design,
		setPattern,
		updateDotSettings,
		updateStripeSettings,
		updateCheckeredSettings,
	} = useEggDesigner();

	// Lokalt state för mönsterinställningar
	const [dotSize, setDotSize] = useState(5);
	const [dotDensity, setDotDensity] = useState(0.5);
	const [stripeCount, setStripeCount] = useState(6);
	const [stripeDirection, setStripeDirection] =
		useState<StripeDirection>("horizontal");
	const [stripeStyle, setStripeStyle] = useState<StripeStyle>("straight");
	const [checkeredSize, setCheckeredSize] = useState(20);

	// Synkronisera lokalt state med globalt state
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

	// Hantera byte av mönster
	const handlePatternChange = (pattern: Pattern) => {
		setPattern(pattern);

		// Initiera mönsterinställningar om de inte finns
		if (pattern === "dots" && !design.patternSettings.dots) {
			updateDotSettings(dotSize, dotDensity);
		} else if (pattern === "stripes" && !design.patternSettings.stripes) {
			updateStripeSettings(stripeCount, stripeDirection, stripeStyle);
		} else if (pattern === "checkered" && !design.patternSettings.checkered) {
			updateCheckeredSettings(checkeredSize);
		}
	};

	// Uppdatera prickinställningar och skicka till global state
	const handleDotSettingsChange = () => {
		updateDotSettings(dotSize, dotDensity);
	};

	// Uppdatera rändinställningar och skicka till global state
	const handleStripeSettingsChange = () => {
		updateStripeSettings(stripeCount, stripeDirection, stripeStyle);
	};

	// Uppdatera rutmönsterinställningar och skicka till global state
	const handleCheckeredSettingsChange = () => {
		updateCheckeredSettings(checkeredSize);
	};

	return (
		<div className="pattern-selector">
			<div className="pattern-selector__options">
				<button
					type="button"
					className={`pattern-selector__option ${
						design.patternSettings.pattern === "solid"
							? "pattern-selector__option--active"
							: ""
					}`}
					onClick={() => handlePatternChange("solid")}
				>
					Enfärgat
				</button>

				<button
					type="button"
					className={`pattern-selector__option ${
						design.patternSettings.pattern === "dots"
							? "pattern-selector__option--active"
							: ""
					}`}
					onClick={() => handlePatternChange("dots")}
				>
					Prickar
				</button>

				<button
					type="button"
					className={`pattern-selector__option ${
						design.patternSettings.pattern === "stripes"
							? "pattern-selector__option--active"
							: ""
					}`}
					onClick={() => handlePatternChange("stripes")}
				>
					Ränder
				</button>

				<button
					type="button"
					className={`pattern-selector__option ${
						design.patternSettings.pattern === "checkered"
							? "pattern-selector__option--active"
							: ""
					}`}
					onClick={() => handlePatternChange("checkered")}
				>
					Rutmönster
				</button>
			</div>

			{/* Visa inställningar baserat på valt mönster */}
			{design.patternSettings.pattern === "dots" && (
				<div className="pattern-selector__settings">
					<SliderWithTooltipGroup>
						<SliderWithTooltip
							id="dotSize"
							label="Storlek på prickar"
							min={2}
							max={15}
							value={dotSize}
							onChange={(e) => setDotSize(parseInt(e.target.value))}
							onChangeComplete={handleDotSettingsChange}
							tooltipFormatter={(value) => `${value}px`}
						/>

						<SliderWithTooltip
							id="dotDensity"
							label="Täthet"
							min={0.2}
							max={1}
							step={0.1}
							value={dotDensity}
							onChange={(e) => setDotDensity(parseFloat(e.target.value))}
							onChangeComplete={handleDotSettingsChange}
							tooltipFormatter={(value) =>
								`${(parseFloat(value.toString()) * 100).toFixed(0)}%`
							}
						/>
					</SliderWithTooltipGroup>
				</div>
			)}

			{design.patternSettings.pattern === "stripes" && (
				<div className="pattern-selector__settings">
					<div className="pattern-selector__stripes-settings">
						{/* Översta raden med stil och riktning */}
						<div className="pattern-selector__stripes-top-row">
							{/* Stil först */}
							<div className="pattern-selector__stripes-style">
								<fieldset className="pattern-selector__fieldset">
									<legend className="pattern-selector__legend">
										Stil
									</legend>
									<div className="pattern-selector__radio-group">
										<div className="pattern-selector__radio-option">
											<input
												id="styleStraight"
												type="radio"
												name="style"
												checked={stripeStyle === "straight"}
												onChange={() => {
													setStripeStyle("straight");
													updateStripeSettings(
														stripeCount,
														stripeDirection,
														"straight"
													);
												}}
												className="pattern-selector__radio"
											/>
											<label
												className="pattern-selector__radio-label"
												htmlFor="styleStraight"
											>
												Raka
											</label>
										</div>

										<div className="pattern-selector__radio-option">
											<input
												id="styleZigzag"
												type="radio"
												name="style"
												checked={stripeStyle === "zigzag"}
												onChange={() => {
													setStripeStyle("zigzag");
													updateStripeSettings(
														stripeCount,
														stripeDirection,
														"zigzag"
													);
												}}
												className="pattern-selector__radio"
											/>
											<label
												className="pattern-selector__radio-label"
												htmlFor="styleZigzag"
											>
												Zigzag
											</label>
										</div>

										<div className="pattern-selector__radio-option">
											<input
												id="styleWavy"
												type="radio"
												name="style"
												checked={stripeStyle === "wavy"}
												onChange={() => {
													setStripeStyle("wavy");
													updateStripeSettings(
														stripeCount,
														stripeDirection,
														"wavy"
													);
												}}
												className="pattern-selector__radio"
											/>
											<label
												className="pattern-selector__radio-label"
												htmlFor="styleWavy"
											>
												Vågiga
											</label>
										</div>
									</div>
								</fieldset>
							</div>

							{/* Sedan riktning */}
							<div className="pattern-selector__stripes-direction">
								<fieldset className="pattern-selector__fieldset">
									<legend className="pattern-selector__legend">
										Riktning
									</legend>
									<div className="pattern-selector__radio-group">
										<div className="pattern-selector__radio-option">
											<input
												id="directionHorizontal"
												type="radio"
												name="direction"
												checked={stripeDirection === "horizontal"}
												onChange={() => {
													setStripeDirection("horizontal");
													updateStripeSettings(
														stripeCount,
														"horizontal",
														stripeStyle
													);
												}}
												className="pattern-selector__radio"
											/>
											<label
												className="pattern-selector__radio-label"
												htmlFor="directionHorizontal"
											>
												Horisontell
											</label>
										</div>

										<div className="pattern-selector__radio-option">
											<input
												id="directionVertical"
												type="radio"
												name="direction"
												checked={stripeDirection === "vertical"}
												onChange={() => {
													setStripeDirection("vertical");
													updateStripeSettings(
														stripeCount,
														"vertical",
														stripeStyle
													);
												}}
												className="pattern-selector__radio"
											/>
											<label
												className="pattern-selector__radio-label"
												htmlFor="directionVertical"
											>
												Vertikal
											</label>
										</div>

										<div className="pattern-selector__radio-option">
											<input
												id="directionDiagonal"
												type="radio"
												name="direction"
												checked={stripeDirection === "diagonal"}
												onChange={() => {
													setStripeDirection("diagonal");
													updateStripeSettings(
														stripeCount,
														"diagonal",
														stripeStyle
													);
												}}
												className="pattern-selector__radio"
											/>
											<label
												className="pattern-selector__radio-label"
												htmlFor="directionDiagonal"
											>
												Diagonal
											</label>
										</div>
									</div>
								</fieldset>
							</div>
						</div>

						{/* Antal ränder slider under de andra kontrollerna */}
						<div className="pattern-selector__stripes-count">
							<SliderWithTooltipGroup>
								<SliderWithTooltip
									id="stripeCount"
									label="Antal ränder"
									min={2}
									max={12}
									value={stripeCount}
									onChange={(e) =>
										setStripeCount(parseInt(e.target.value))
									}
									onChangeComplete={handleStripeSettingsChange}
									tooltipFormatter={(value) => `${value} st`}
								/>
							</SliderWithTooltipGroup>
						</div>
					</div>
				</div>
			)}

			{design.patternSettings.pattern === "checkered" && (
				<div className="pattern-selector__settings">
					<SliderWithTooltipGroup>
						<SliderWithTooltip
							id="checkeredSize"
							label="Rutstorlek"
							min={10}
							max={40}
							value={checkeredSize}
							onChange={(e) =>
								setCheckeredSize(parseInt(e.target.value))
							}
							onChangeComplete={handleCheckeredSettingsChange}
							tooltipFormatter={(value) => `${value}px`}
						/>
					</SliderWithTooltipGroup>
				</div>
			)}
		</div>
	);
};

export default PatternSelector;
