import React, { useState, useCallback, useEffect } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import SliderWithTooltip from "../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../SliderWithTooltipGroup/SliderWithTooltipGroup";
import "./EmojiSelector.scss";

// Maximum number of emojis allowed
const MAX_EMOJIS = 10;

// Lista med påskrelaterade och våriga emojis
const EASTER_EMOJIS = [
	"🐰",
	"🐣",
	"🐥",
	"🌷",
	"🌼",
	"🥚",
	"🐇",
	"🌱",
	"🦆",
	"🧺",
	"🐓",
	"🌸",
	"🍀",
	"🦋",
	"🐞",
	"🐤",
	"🌈",
	"🌻",
	"🌺",
	"🌹",
	"🌞",
	"🐝",
	"🦔",
	"🐿️",
	"🌧️",
	"🌤️",
	"🌳",
	"🦩",
	"🦚",
	"🐔",
	"🐦",
	"🪶",
	"🪺",
];

const EmojiSelector: React.FC = () => {
	const { design, addEmoji, removeEmoji, updateEmoji } = useEggDesigner();
	const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<number | null>(
		null
	);

	// Calculated current emoji properties from the design state
	const currentEmoji =
		selectedEmojiIndex !== null
			? design.emojiDecorations[selectedEmojiIndex]
			: null;

	// Hantera klick på en emoji i paletten
	const handleEmojiClick = useCallback(
		(emoji: string) => {
			// Kontrollera om max antal emojis är uppnått
			if (design.emojiDecorations.length >= MAX_EMOJIS) {
				return; // Tillåt inte fler än MAX_EMOJIS emojis
			}

			// Lägg till emoji med position mitt på ägget och standardstorlek 50px
			const xPosition = 50; // Alltid mitt på ägget horisontellt
			const yPosition = 50; // Alltid mitt på ägget vertikalt

			// Lägg till emojin - den automatiska selektionen hanteras i useEffect
			addEmoji(emoji, { x: xPosition, y: yPosition }, 50); // Standardstorlek 50px
		},
		[design.emojiDecorations.length, addEmoji]
	);

	// Håll koll på antalet emojis för att kunna välja den senast tillagda
	const previousEmojiCount = React.useRef(design.emojiDecorations.length);

	// Håll koll på förändringar i emoji-arrayen för att hantera ny tillagd emoji
	useEffect(() => {
		const currentEmojiCount = design.emojiDecorations.length;

		// Om en ny emoji lagts till (längden har ökat)
		if (
			currentEmojiCount > previousEmojiCount.current &&
			currentEmojiCount > 0
		) {
			// Välj den senast tillagda emojin
			setSelectedEmojiIndex(currentEmojiCount - 1);
		}
		// Om alla emojis har tagits bort, återställ valet
		else if (currentEmojiCount === 0) {
			setSelectedEmojiIndex(null);
		}
		// Om den valda emojin är utanför arrayen, välj den sista
		else if (
			selectedEmojiIndex !== null &&
			selectedEmojiIndex >= currentEmojiCount
		) {
			setSelectedEmojiIndex(currentEmojiCount - 1);
		}

		// Uppdatera referensvärdet för nästa jämförelse
		previousEmojiCount.current = currentEmojiCount;
	}, [design.emojiDecorations.length, selectedEmojiIndex]);

	// Hantera val av en befintlig emoji
	const handleSelectEmoji = (index: number) => {
		setSelectedEmojiIndex(selectedEmojiIndex === index ? null : index);
	};

	// Hantera borttagning av vald emoji
	const handleRemoveEmoji = useCallback(
		(index?: number) => {
			// Om index är angiven, ta bort den emojin
			// Annars, ta bort den markerade emojin
			const emojiIndexToRemove =
				index !== undefined ? index : selectedEmojiIndex;

			if (emojiIndexToRemove !== null && emojiIndexToRemove !== undefined) {
				removeEmoji(emojiIndexToRemove);

				// Om den borttagna emojin var den markerade, återställ markeringen
				if (selectedEmojiIndex === emojiIndexToRemove) {
					setSelectedEmojiIndex(null);
				}
			}
		},
		[selectedEmojiIndex, removeEmoji]
	);

	// Dupliceringsfunktion borttagen

	// Hantera ändring av emojistorlek
	const handleSizeChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (selectedEmojiIndex !== null) {
				updateEmoji(selectedEmojiIndex, { size: parseInt(e.target.value) });
			}
		},
		[selectedEmojiIndex, updateEmoji]
	);

	// Hantera ändring av emojirotation
	const handleRotationChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (selectedEmojiIndex !== null) {
				updateEmoji(selectedEmojiIndex, {
					rotation: parseInt(e.target.value),
				});
			}
		},
		[selectedEmojiIndex, updateEmoji]
	);

	// Hantera ändring av emoji X-position
	const handlePositionXChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (selectedEmojiIndex !== null && currentEmoji) {
				updateEmoji(selectedEmojiIndex, {
					position: {
						...currentEmoji.position,
						x: parseInt(e.target.value),
					},
				});
			}
		},
		[selectedEmojiIndex, updateEmoji, currentEmoji]
	);

	// Hantera ändring av emoji Y-position
	const handlePositionYChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (selectedEmojiIndex !== null && currentEmoji) {
				updateEmoji(selectedEmojiIndex, {
					position: {
						...currentEmoji.position,
						y: parseInt(e.target.value),
					},
				});
			}
		},
		[selectedEmojiIndex, updateEmoji, currentEmoji]
	);

	// Hantera klart-händelsen för slidern (för att uppdatera state när användaren slutar dra)
	const handleSizeChangeComplete = useCallback(() => {
		// Ingen extra hantering behövs eftersom updateEmoji anropas kontinuerligt
	}, []);

	// Hantera klart-händelsen för rotationslidern
	const handleRotationChangeComplete = useCallback(() => {
		// Ingen extra hantering behövs eftersom updateEmoji anropas kontinuerligt
	}, []);

	return (
		<div className="emoji-selector">
			<div className="emoji-selector__palette">
				{EASTER_EMOJIS.map((emoji) => (
					<button
						key={emoji}
						className="emoji-selector__emoji"
						onClick={() => handleEmojiClick(emoji)}
						aria-label={`Lägg till emoji ${emoji}`}
					>
						{emoji}
					</button>
				))}
			</div>

			{/* Lista över befintliga emojis på ägget */}
			{design.emojiDecorations.length > 0 && (
				<div className="emoji-selector__active-emojis">
					<p className="emoji-selector__info-text">Dina emojis:</p>
					<div className="emoji-selector__emoji-list">
						{design.emojiDecorations.map((decoration, index) => (
							<button
								key={decoration.id}
								className={`emoji-selector__active-emoji ${
									selectedEmojiIndex === index
										? "emoji-selector__active-emoji--selected"
										: ""
								}`}
								onClick={() => handleSelectEmoji(index)}
								style={{
									fontSize: `${Math.min(30, decoration.size / 3)}px`,
								}}
								aria-label={`Redigera emoji ${decoration.emoji}`}
							>
								{decoration.emoji}
								<button
									className="emoji-selector__active-emoji__remove"
									onClick={(e) => {
										e.stopPropagation(); // Förhindra att emoji väljs när man klickar på kryss
										handleRemoveEmoji(index);
									}}
									aria-label={`Ta bort emoji ${decoration.emoji}`}
								></button>
							</button>
						))}
					</div>
				</div>
			)}

			{/* Kontroller för att redigera vald emoji med SliderWithTooltipGroup */}
			{currentEmoji && (
				<div className="emoji-selector__controls">
					<div className="emoji-selector__slider-group">
						<SliderWithTooltipGroup customLayout={true}>
							<SliderWithTooltip
								id="emojiSize"
								label="Storlek"
								min={20}
								max={100}
								value={currentEmoji.size}
								onChange={handleSizeChange}
								onChangeComplete={handleSizeChangeComplete}
								tooltipFormatter={(value) => `${value}px`}
							/>
						</SliderWithTooltipGroup>

						<SliderWithTooltipGroup customLayout={true}>
							<SliderWithTooltip
								id="emojiRotation"
								label="Rotation"
								min={0}
								max={360}
								value={currentEmoji.rotation}
								onChange={handleRotationChange}
								onChangeComplete={handleRotationChangeComplete}
								tooltipFormatter={(value) => `${value}°`}
							/>
						</SliderWithTooltipGroup>

						<SliderWithTooltipGroup customLayout={true}>
							<SliderWithTooltip
								id="emojiPositionX"
								label="X-Position"
								min={0}
								max={100}
								value={currentEmoji.position.x}
								onChange={handlePositionXChange}
								tooltipFormatter={(value) => `${value}%`}
							/>
						</SliderWithTooltipGroup>

						<SliderWithTooltipGroup customLayout={true}>
							<SliderWithTooltip
								id="emojiPositionY"
								label="Y-Position"
								min={0}
								max={100}
								value={currentEmoji.position.y}
								onChange={handlePositionYChange}
								tooltipFormatter={(value) => `${value}%`}
							/>
						</SliderWithTooltipGroup>
					</div>

					{/* Knappar borttagna för renare gränssnitt */}
				</div>
			)}

			{design.emojiDecorations.length >= MAX_EMOJIS && (
				<p className="emoji-selector__hint emoji-selector__hint--warning">
					Du har nått maximalt antal emojis ({MAX_EMOJIS} st).
				</p>
			)}

			{/* Visa hjälptext när inga emojis är tillagda */}
			{design.emojiDecorations.length === 0 && (
				<p className="emoji-selector__hint">
					Klicka på en emoji ovan för att lägga till den på ditt ägg!
				</p>
			)}
		</div>
	);
};

export default EmojiSelector;
