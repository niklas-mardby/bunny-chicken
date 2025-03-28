import React from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import PatternSelector from "../PatternSelector/PatternSelector";
import MessageInput from "../MessageInput/MessageInput";
import ShareButton from "../ShareButton/ShareButton";
import "./ControlPanel.scss";
import EmojiSelector from "../EmojiSelector/EmojiSelector";
import { useEggDesigner } from "../../hooks/useEggDesigner";

const ControlPanel: React.FC = () => {
	const { resetDesign } = useEggDesigner();

	return (
		<div className="control-panel">
			<h2 className="control-panel__title">Designa ditt påskägg</h2>

			<div className="control-panel__section">
				<h3 className="control-panel__section-title">Välj mönster</h3>
				<PatternSelector />
			</div>

			<div className="control-panel__section">
				<h3 className="control-panel__section-title">Välj färger</h3>
				<ColorPicker />
			</div>

			<div className="control-panel__section">
				<h3 className="control-panel__section-title">
					Lägg till påskmotiv
				</h3>
				<EmojiSelector />
			</div>

			<div className="control-panel__section">
				<h3 className="control-panel__section-title">
					Skriv din påskhälsning
				</h3>
				<MessageInput />
			</div>

			<div className="control-panel__actions">
				<button
					className="control-panel__reset-button"
					onClick={resetDesign}
				>
					Börja om
				</button>

				<ShareButton />
			</div>
		</div>
	);
};

export default ControlPanel;
