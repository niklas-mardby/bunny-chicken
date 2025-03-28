import React, { useState } from "react";
import { useShareLink } from "../../hooks/useShareLink";
import "./ShareButton.scss";

const ShareButton: React.FC = () => {
	const { copyShareLink } = useShareLink();
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);
	const [shareUrl, setShareUrl] = useState("");

	// Generera och kopiera delningslänk
	const handleShareClick = async () => {
		const result = await copyShareLink();

		if (result.success) {
			setShareUrl(result.url);
			setShowCopiedMessage(true);

			// Dölj meddelandet efter 3 sekunder
			setTimeout(() => {
				setShowCopiedMessage(false);
			}, 3000);
		}
	};

	return (
		<div className="share-button">
			<button
				className="share-button__button"
				onClick={handleShareClick}
				aria-label="Dela påskägget"
			>
				Dela påskägget
			</button>

			{showCopiedMessage && (
				<div className="share-button__copied-message">
					<p className="share-button__copied-text">
						Länk kopierad till urklipp!
					</p>
					<div className="share-button__url-container">
						<label htmlFor="shareUrlInput" className="visually-hidden">
							Delningslänk
						</label>
						<input
							id="shareUrlInput"
							type="text"
							value={shareUrl}
							readOnly
							className="share-button__url-input"
							aria-label="Kopierad delningslänk"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShareButton;
