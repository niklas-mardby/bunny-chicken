import React, { useState, useCallback, useEffect } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import { EmojiDecoration } from "../../types";
import "./EmojiSelector.scss";

// Lista med påskrelaterade emojis
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
];

const EmojiSelector: React.FC = () => {
	const { design, addEmoji, removeEmoji, updateEmoji } = useEggDesigner();
	const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<number | null>(
		null
	);
	const [emojiSize, setEmojiSize] = useState(30);
	const [emojiRotation, setEmojiRotation] = useState(0);
	const [draggedEmoji, setDraggedEmoji] = useState<EmojiDecoration | null>(
		null
	);

	// Uppdatera lokala kontroller när vald emoji ändras
	useEffect(() => {
		if (
			selectedEmojiIndex !== null &&
			design.emojiDecorations[selectedEmojiIndex]
		) {
			const emoji = design.emojiDecorations[selectedEmojiIndex];
			setEmojiSize(emoji.size);
			setEmojiRotation(emoji.rotation);
		}
	}, [selectedEmojiIndex, design.emojiDecorations]);

	// Hantera klick på en emoji i paletten
	const handleEmojiClick = useCallback(
		(emoji: string) => {
			// Lägg till emoji med standardstorlek, position och rotation
			// Generera ett unikt ID för varje emoji när den läggs till
			addEmoji(emoji);
		},
		[addEmoji]
	);

	// Hantera val av en befintlig emoji
	const handleSelectEmoji = useCallback(
		(index: number) => {
			if (selectedEmojiIndex === index) {
				// Avmarkera om redan vald
				setSelectedEmojiIndex(null);
			} else {
				setSelectedEmojiIndex(index);
			}
		},
		[selectedEmojiIndex]
	);

	// Hantera borttagning av vald emoji
	const handleRemoveEmoji = useCallback(() => {
		if (selectedEmojiIndex !== null) {
			removeEmoji(selectedEmojiIndex);
			setSelectedEmojiIndex(null);
		}
	}, [selectedEmojiIndex, removeEmoji]);

	// Hantera ändring av emojistorlek
	const handleSizeChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newSize = parseInt(e.target.value);
			setEmojiSize(newSize);

			if (selectedEmojiIndex !== null) {
				updateEmoji(selectedEmojiIndex, { size: newSize });
			}
		},
		[selectedEmojiIndex, updateEmoji]
	);

	// Hantera ändring av emojirotation
	const handleRotationChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newRotation = parseInt(e.target.value);
			setEmojiRotation(newRotation);

			if (selectedEmojiIndex !== null) {
				updateEmoji(selectedEmojiIndex, { rotation: newRotation });
			}
		},
		[selectedEmojiIndex, updateEmoji]
	);

	// Hantera drag-and-drop funktionalitet
	const handleDragStart = useCallback(
		(index: number) => {
			if (index >= 0 && index < design.emojiDecorations.length) {
				setSelectedEmojiIndex(index);
				setDraggedEmoji(design.emojiDecorations[index]);
			}
		},
		[design.emojiDecorations]
	);

	// Hantera när drag-operationen slutar
	const handleDragEnd = useCallback(() => {
		setDraggedEmoji(null);
	}, []);

	// Duplicera en emoji
	const handleDuplicateEmoji = useCallback(() => {
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
	}, [selectedEmojiIndex, design.emojiDecorations, addEmoji]);

	return (
		<div className="emoji-selector">
			<div className="emoji-selector__palette">
				{EASTER_EMOJIS.map((emoji) => (
					<button
						key={emoji} // Använd emojin själv som nyckel eftersom varje emoji är unik i vår lista
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
								key={decoration.id} // Använd det unika ID:t som nyckel istället för index
								className={`emoji-selector__active-emoji ${
									selectedEmojiIndex === index
										? "emoji-selector__active-emoji--selected"
										: ""
								}`}
								onClick={() => handleSelectEmoji(index)}
								draggable={true}
								onDragStart={() => handleDragStart(index)}
								onDragEnd={handleDragEnd}
								style={{
									fontSize: `${Math.min(24, decoration.size / 2)}px`,
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
			{selectedEmojiIndex !== null && (
				<div className="emoji-selector__controls">
					<div className="emoji-selector__control">
						<label className="emoji-selector__label" htmlFor="emojiSize">
							Storlek
						</label>
						<input
							id="emojiSize"
							type="range"
							min="15"
							max="50"
							value={emojiSize}
							onChange={handleSizeChange}
							className="emoji-selector__slider"
							placeholder="Välj storlek på emoji"
						/>
						<span className="emoji-selector__value">{emojiSize}px</span>
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
							value={emojiRotation}
							onChange={handleRotationChange}
							className="emoji-selector__slider"
							placeholder="Välj rotation på emoji"
						/>
						<span className="emoji-selector__value">
							{emojiRotation}°
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

			{design.emojiDecorations.length === 0 ? (
				<p className="emoji-selector__hint">
					Klicka på en emoji ovan för att lägga till den på ditt ägg!
				</p>
			) : (
				<p className="emoji-selector__hint">
					Tips: Välj en emoji från listan för att ändra storlek och
					rotation.
				</p>
			)}
		</div>
	);
};

export default EmojiSelector;
