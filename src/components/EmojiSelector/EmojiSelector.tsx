import { useState, useCallback, useEffect, useRef } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import SliderWithTooltip from "../SliderWithTooltip/SliderWithTooltip";
import SliderWithTooltipGroup from "../SliderWithTooltipGroup/SliderWithTooltipGroup";
import "./EmojiSelector.scss";
import { EMOJI_CATEGORIES, EmojiCategory } from "./EmojiCategories";

// Maximum number of emojis allowed
const MAX_EMOJIS = 10;

const EmojiSelector = () => {
	const { design, addEmoji, removeEmoji, updateEmoji } = useEggDesigner();
	const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<number | null>(
		null
	);
	const [activeCategory, setActiveCategory] =
		useState<EmojiCategory>("easter");

	// Calculated current emoji properties from the design state
	const currentEmoji =
		selectedEmojiIndex !== null
			? design.emojiDecorations[selectedEmojiIndex]
			: null;

	// Handle category selection
	const handleCategoryClick = (category: EmojiCategory) => {
		setActiveCategory(category);
	};

	// Get active emojis based on selected category
	const getActiveEmojis = (): string[] => {
		const category = EMOJI_CATEGORIES.find(
			(cat) => cat.id === activeCategory
		);
		return category ? category.emojis : [];
	};

	// Handle emoji click from palette
	const handleEmojiClick = useCallback(
		(emoji: string) => {
			// Check if max emojis limit is reached
			if (design.emojiDecorations.length >= MAX_EMOJIS) {
				return; // Don't allow more than MAX_EMOJIS
			}

			// Add emoji at center of egg with default size 50px
			const xPosition = 50; // Always center horizontally
			const yPosition = 50; // Always center vertically

			// Add emoji - automatic selection will be handled in useEffect
			addEmoji(emoji, { x: xPosition, y: yPosition }, 50);
		},
		[design.emojiDecorations.length, addEmoji]
	);

	// Track emojis count to select the latest added one
	const previousEmojiCount = useRef(design.emojiDecorations.length);

	// Watch for changes in emoji array to handle new added emoji
	useEffect(() => {
		const currentEmojiCount = design.emojiDecorations.length;

		// If a new emoji was added (length increased)
		if (
			currentEmojiCount > previousEmojiCount.current &&
			currentEmojiCount > 0
		) {
			// Select the latest added emoji
			setSelectedEmojiIndex(currentEmojiCount - 1);
		}
		// If all emojis were removed, reset selection
		else if (currentEmojiCount === 0) {
			setSelectedEmojiIndex(null);
		}
		// If selected emoji is out of bounds, select the last one
		else if (
			selectedEmojiIndex !== null &&
			selectedEmojiIndex >= currentEmojiCount
		) {
			setSelectedEmojiIndex(currentEmojiCount - 1);
		}

		// Update reference value for next comparison
		previousEmojiCount.current = currentEmojiCount;
	}, [design.emojiDecorations.length, selectedEmojiIndex]);

	// Handle selecting an existing emoji
	const handleSelectEmoji = (index: number) => {
		setSelectedEmojiIndex(selectedEmojiIndex === index ? null : index);
	};

	// Handle removing selected emoji
	const handleRemoveEmoji = useCallback(
		(index?: number) => {
			// If index is specified, remove that emoji
			// Otherwise, remove the selected emoji
			const emojiIndexToRemove = index ?? selectedEmojiIndex;

			if (emojiIndexToRemove !== null && emojiIndexToRemove !== undefined) {
				removeEmoji(emojiIndexToRemove);

				// If the removed emoji was the selected one, reset selection
				if (selectedEmojiIndex === emojiIndexToRemove) {
					setSelectedEmojiIndex(null);
				}
			}
		},
		[selectedEmojiIndex, removeEmoji]
	);

	// Handle emoji size change
	const handleSizeChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (selectedEmojiIndex !== null) {
				updateEmoji(selectedEmojiIndex, { size: parseInt(e.target.value) });
			}
		},
		[selectedEmojiIndex, updateEmoji]
	);

	// Handle emoji rotation change
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

	// Handle emoji X position change
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

	// Handle emoji Y position change
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

	// Handle slider done events
	const handleSizeChangeComplete = useCallback(() => {
		// No additional handling needed as updateEmoji is called continuously
	}, []);

	// Handle rotation slider done event
	const handleRotationChangeComplete = useCallback(() => {
		// No additional handling needed as updateEmoji is called continuously
	}, []);

	return (
		<div className="emoji-selector">
			{/* Category buttons */}
			<div className="emoji-selector__categories">
				{EMOJI_CATEGORIES.map((category) => (
					<button
						key={category.id}
						className={`emoji-selector__category ${
							activeCategory === category.id
								? "emoji-selector__category--active"
								: ""
						}`}
						onClick={() => handleCategoryClick(category.id)}
					>
						{category.label}
					</button>
				))}
			</div>

			{/* Emoji palette based on selected category */}
			<div className="emoji-selector__palette">
				{getActiveEmojis().map((emoji) => (
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

			{/* List of existing emojis on the egg */}
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
										e.stopPropagation(); // Prevent selecting emoji when clicking remove button
										handleRemoveEmoji(index);
									}}
									aria-label={`Ta bort emoji ${decoration.emoji}`}
								></button>
							</button>
						))}
					</div>
				</div>
			)}

			{/* Controls for editing selected emoji */}
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
				</div>
			)}

			{design.emojiDecorations.length >= MAX_EMOJIS && (
				<p className="emoji-selector__hint emoji-selector__hint--warning">
					Du har nått maximalt antal emojis ({MAX_EMOJIS} st).
				</p>
			)}

			{/* Show help text when no emojis are added */}
			{design.emojiDecorations.length === 0 && (
				<p className="emoji-selector__hint">
					Klicka på en emoji ovan för att lägga till den på ditt ägg!
				</p>
			)}
		</div>
	);
};

export default EmojiSelector;
