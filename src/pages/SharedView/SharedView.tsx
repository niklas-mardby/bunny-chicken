import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EggCanvas from "../../components/EggCanvas/EggCanvas";
import { useShareLink } from "../../hooks/useShareLink";
import { useEggDesign } from "../../context/EggDesignContext";
import "./SharedView.scss";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import { useEggDesigner } from "../../hooks/useEggDesigner";

const SharedView = () => {
	const { designHash } = useParams<{ designHash: string }>();
	const { loadDesignFromHash } = useShareLink();
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const { resetDesign } = useEggDesigner();
	const navigate = useNavigate();

	const handleCreateNew = () => {
		resetDesign(); // Återställ designen först
		navigate("/"); // Navigera sedan till startsidan
	};

	// Ladda designen baserat på hash-parametern
	useEffect(() => {
		if (designHash) {
			try {
				const success = loadDesignFromHash(designHash);
				setIsLoaded(true);
				setHasError(!success);
			} catch (error) {
				console.error("Failed to load design:", error);
				setIsLoaded(true);
				setHasError(true);
			}
		}
	}, [designHash, loadDesignFromHash]);

	if (!isLoaded) {
		return (
			<div className="shared-view shared-view--loading">
				<p className="shared-view__loading">Laddar påskägget...</p>
			</div>
		);
	}

	if (hasError) {
		return (
			<div className="shared-view shared-view--error">
				<h2 className="shared-view__error-title">Ojdå!</h2>
				<p className="shared-view__error-message">
					Vi kunde inte ladda påskägget. Länken kan vara felaktig eller
					utgången.
				</p>
				<button
					onClick={handleCreateNew}
					className="shared-view__create-link"
				>
					Skapa eget påskägg
				</button>
			</div>
		);
	}

	return (
		<div className="shared-view">
			<div className="shared-view__content">
				<div className="shared-view__canvas-container">
					<ErrorBoundary
						fallback={
							<div className="shared-view__error-container">
								<h3>Det gick inte att visa påskägget</h3>
								<p>Det uppstod ett fel när påskägget skulle visas.</p>
								<button
									onClick={handleCreateNew}
									className="shared-view__create-link"
								>
									Skapa eget påskägg
								</button>
							</div>
						}
					>
						<EggCanvas />
					</ErrorBoundary>
				</div>

				<div className="shared-view__message-container">
					<ErrorBoundary>
						<MessageDisplay />
					</ErrorBoundary>

					<div className="shared-view__actions">
						<button
							onClick={handleCreateNew}
							className="shared-view__create-link"
						>
							Skapa eget påskägg
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// Komponent för att visa påskhälsningen
const MessageDisplay = () => {
	const { state: design } = useEggDesign();

	if (!design.message) {
		return null;
	}

	return (
		<div className="shared-view__message">
			<h2 className="shared-view__message-title">Påskhälsning</h2>
			<div className="shared-view__message-content">{design.message}</div>
		</div>
	);
};

export default SharedView;
