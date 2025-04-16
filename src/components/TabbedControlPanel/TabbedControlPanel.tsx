import { useState, memo } from "react";
import ImprovedColorPicker from "../ImprovedColorPicker/ImprovedColorPicker";
import PatternSelector from "../PatternSelector/PatternSelector";
import MessageInput from "../MessageInput/MessageInput";
import ShareButton from "../ShareButton/ShareButton";
import EmojiSelector from "../EmojiSelector/EmojiSelector";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import "./TabbedControlPanel.scss";

type TabType = "pattern" | "color" | "emoji" | "message";

const TabbedControlPanel = () => {
	const { resetDesign } = useEggDesigner();
	const [activeTab, setActiveTab] = useState<TabType>("pattern");

	const tabs: Array<{ id: TabType; label: string }> = [
		{ id: "pattern", label: "Mönster" },
		{ id: "color", label: "Färger" },
		{ id: "emoji", label: "Motiv" },
		{ id: "message", label: "Hälsning" },
	];

	const handleNextTab = () => {
		const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
		if (currentIndex < tabs.length - 1) {
			setActiveTab(tabs[currentIndex + 1].id);
		}
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "pattern":
				return <PatternSelector />;
			case "color":
				return <ImprovedColorPicker />;
			case "emoji":
				return <EmojiSelector />;
			case "message":
				return <MessageInput />;
			default:
				return null;
		}
	};

	const isLastTab = activeTab === tabs[tabs.length - 1].id;

	return (
		<div className="control-panel">
			<h2 className="control-panel__title">Designa ditt påskägg</h2>

			<div className="control-panel__tabs">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`control-panel__tab ${
							activeTab === tab.id ? "control-panel__tab--active" : ""
						}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div className="control-panel__content">{renderTabContent()}</div>

			<div className="control-panel__actions">
				<button
					className="control-panel__reset-button"
					onClick={() => {
						resetDesign();
						setActiveTab(tabs[0].id);
					}}
				>
					Börja om
				</button>

				{isLastTab ? (
					<ShareButton />
				) : (
					<button
						className="control-panel__next-button"
						onClick={handleNextTab}
					>
						Nästa
					</button>
				)}
			</div>
		</div>
	);
};

export default memo(TabbedControlPanel);
