import React, { useState } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import "./EmojiSelector.scss";

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
	const handleEmojiClick = (emoji: string) => {
		// Kontrollera om max antal emojis är uppnått
		if (design.emojiDecorations.length >= 5) {
			return; // Tillåt inte fler än 5 emojis
		}

		// Lägg till emoji med position mitt på ägget och standardstorlek 50px
		const xPosition = 50; // Alltid mitt på ägget horisontellt
		const yPosition = 50; // Alltid mitt på ägget vertikalt
		addEmoji(emoji, { x: xPosition, y: yPosition }, 50); // Standardstorlek 50px
	};

	// Hantera val av en befintlig emoji
	const handleSelectEmoji = (index: number) => {
		setSelectedEmojiIndex(selectedEmojiIndex === index ? null : index);
	};

	// Hantera borttagning av vald emoji
	const handleRemoveEmoji = () => {
		if (selectedEmojiIndex !== null) {
			removeEmoji(selectedEmojiIndex);
			setSelectedEmojiIndex(null);
		}
	};

	// Hantera ändring av emojistorlek
	const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (selectedEmojiIndex !== null) {
			updateEmoji(selectedEmojiIndex, { size: parseInt(e.target.value) });
		}
	};

	// Hantera ändring av emojirotation
	const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (selectedEmojiIndex !== null) {
			updateEmoji(selectedEmojiIndex, {
				rotation: parseInt(e.target.value),
			});
		}
	};

	// Duplicera en emoji
	const handleDuplicateEmoji = () => {
		if (selectedEmojiIndex !== null) {
			const emojiToDuplicate = design.emojiDecorations[selectedEmojiIndex];
			const duplicatedEmoji = {
				...emojiToDuplicate,
				position: {
					x: Math.min(emojiToDuplicate.position.x + 10, 90),
					y: Math.min(emojiToDuplicate.position.y + 10, 90),
				},
			};
			addEmoji(
				duplicatedEmoji.emoji,
				duplicatedEmoji.position,
				duplicatedEmoji.size,
				duplicatedEmoji.rotation
			);
		}
	};

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
							</button>
						))}
					</div>
				</div>
			)}

			{/* Kontroller för att redigera vald emoji */}
			{currentEmoji && (
				<div className="emoji-selector__controls">
					<div className="emoji-selector__control">
						<label className="emoji-selector__label" htmlFor="emojiSize">
							Storlek
						</label>
						<input
							id="emojiSize"
							type="range"
							min="20"
							max="100"
							value={currentEmoji.size}
							onChange={handleSizeChange}
							className="emoji-selector__slider"
							placeholder="Välj storlek på emoji"
						/>
						<span className="emoji-selector__value">
							{currentEmoji.size}px
						</span>
					</div>

					<div className="emoji-selector__control">
						<label
							className="emoji-selector__label"
							htmlFor="emojiRotation"
						>
							Rotation
						</label>
						<input
							id="emojiRotation"
							type="range"
							min="0"
							max="360"
							value={currentEmoji.rotation}
							onChange={handleRotationChange}
							className="emoji-selector__slider"
							placeholder="Välj rotation på emoji"
						/>
						<span className="emoji-selector__value">
							{currentEmoji.rotation}°
						</span>
					</div>

					<div className="emoji-selector__buttons">
						<button
							className="emoji-selector__action-button emoji-selector__action-button--duplicate"
							onClick={handleDuplicateEmoji}
							aria-label="Duplicera emoji"
						>
							Duplicera
						</button>
						<button
							className="emoji-selector__action-button emoji-selector__action-button--remove"
							onClick={handleRemoveEmoji}
							aria-label="Ta bort emoji"
						>
							Ta bort
						</button>
					</div>
				</div>
			)}

			{design.emojiDecorations.length >= 5 && (
				<p className="emoji-selector__hint emoji-selector__hint--warning">
					Du har nått maximalt antal emojis (5 st).
				</p>
			)}

			{/* Visa relevant hjälptext baserad på antal emojis */}
			{design.emojiDecorations.length === 0 && (
				<p className="emoji-selector__hint">
					Klicka på en emoji ovan för att lägga till den på ditt ägg!
				</p>
			)}

			{design.emojiDecorations.length > 0 &&
				design.emojiDecorations.length < 5 && (
					<p className="emoji-selector__hint">
						Tips: Välj en emoji från listan för att ändra storlek och
						rotation.
					</p>
				)}
		</div>
	);
};

export default EmojiSelector;
