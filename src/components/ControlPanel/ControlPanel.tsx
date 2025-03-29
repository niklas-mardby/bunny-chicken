import { memo } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import PatternSelector from "../PatternSelector/PatternSelector";
import MessageInput from "../MessageInput/MessageInput";
import ShareButton from "../ShareButton/ShareButton";
import EmojiSelector from "../EmojiSelector/EmojiSelector";
import { useEggDesigner } from "../../hooks/useEggDesigner";

// Style import moved to a separate file that loads this
// instead of importing it directly here

const ControlPanel = () => {
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

// Use memo to prevent unnecessary re-renders when parent components update
// This is beneficial since this component likely doesn't change based on props
export default memo(ControlPanel);
