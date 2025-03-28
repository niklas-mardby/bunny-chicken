import React, { useState, useEffect } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import { Pattern, StripeDirection, StripeStyle } from "../../types";
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
					<div className="pattern-selector__setting">
						<label className="pattern-selector__label" htmlFor="dotSize">
							Storlek på prickar
						</label>
						<input
							id="dotSize"
							type="range"
							min="2"
							max="10"
							value={dotSize}
							onChange={(e) => setDotSize(parseInt(e.target.value))}
							onMouseUp={handleDotSettingsChange}
							onTouchEnd={handleDotSettingsChange}
							className="pattern-selector__slider"
							placeholder="Prickstorlek"
						/>
					</div>

					<div className="pattern-selector__setting">
						<label
							className="pattern-selector__label"
							htmlFor="dotDensity"
						>
							Täthet
						</label>
						<input
							id="dotDensity"
							type="range"
							min="0.2"
							max="1"
							step="0.1"
							value={dotDensity}
							onChange={(e) => setDotDensity(parseFloat(e.target.value))}
							onMouseUp={handleDotSettingsChange}
							onTouchEnd={handleDotSettingsChange}
							className="pattern-selector__slider"
							placeholder="Pricktäthet"
						/>
					</div>
				</div>
			)}

			{design.patternSettings.pattern === "stripes" && (
				<div className="pattern-selector__settings">
					<div className="pattern-selector__setting">
						<label
							className="pattern-selector__label"
							htmlFor="stripeCount"
						>
							Antal ränder
						</label>
						<input
							id="stripeCount"
							type="range"
							min="2"
							max="12"
							value={stripeCount}
							onChange={(e) => setStripeCount(parseInt(e.target.value))}
							onMouseUp={handleStripeSettingsChange}
							onTouchEnd={handleStripeSettingsChange}
							className="pattern-selector__slider"
							placeholder="Antal ränder"
						/>
					</div>

					<div className="pattern-selector__setting">
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
											console.log("Direction changed to horizontal");
											setStripeDirection("horizontal");
											// Använd direkt anrop istället för att förlita sig på stripeDirection som kanske inte uppdaterats än
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
											console.log("Direction changed to vertical");
											setStripeDirection("vertical");
											// Använd direkt anrop
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
											console.log("Direction changed to diagonal");
											setStripeDirection("diagonal");
											// Använd direkt anrop
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

					<div className="pattern-selector__setting">
						<fieldset className="pattern-selector__fieldset">
							<legend className="pattern-selector__legend">Stil</legend>
							<div className="pattern-selector__radio-group">
								<div className="pattern-selector__radio-option">
									<input
										id="styleStraight"
										type="radio"
										name="style"
										checked={stripeStyle === "straight"}
										onChange={() => {
											console.log("Style changed to straight");
											setStripeStyle("straight");
											// Använd direkt anrop
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
											console.log("Style changed to zigzag");
											setStripeStyle("zigzag");
											// Använd direkt anrop
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
											console.log("Style changed to wavy");
											setStripeStyle("wavy");
											// Använd direkt anrop
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
				</div>
			)}

			{design.patternSettings.pattern === "checkered" && (
				<div className="pattern-selector__settings">
					<div className="pattern-selector__setting">
						<label
							className="pattern-selector__label"
							htmlFor="checkeredSize"
						>
							Rutstorlek
						</label>
						<input
							id="checkeredSize"
							type="range"
							min="10"
							max="40"
							value={checkeredSize}
							onChange={(e) =>
								setCheckeredSize(parseInt(e.target.value))
							}
							onMouseUp={handleCheckeredSettingsChange}
							onTouchEnd={handleCheckeredSettingsChange}
							className="pattern-selector__slider"
							placeholder="Rutstorlek"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default PatternSelector;
