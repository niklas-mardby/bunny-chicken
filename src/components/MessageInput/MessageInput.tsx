import React, { useState, useEffect } from "react";
import { useEggDesigner } from "../../hooks/useEggDesigner";
import "./MessageInput.scss";

const MessageInput: React.FC = () => {
	const { design, setMessage } = useEggDesigner();
	const [inputValue, setInputValue] = useState(design.message);

	// Uppdatera det lokala värdet när globalt state ändras
	useEffect(() => {
		setInputValue(design.message);
	}, [design.message]);

	// Hantera input-ändring
	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

	// Updatera globalt state när input tappar fokus
	const handleBlur = () => {
		setMessage(inputValue);
	};

	// Uppdatera globalt state vid Enter-tryck
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			setMessage(inputValue);
		}
	};

	return (
		<div className="message-input">
			<label htmlFor="messageTextarea" className="visually-hidden">
				Påskhälsning
			</label>
			<textarea
				id="messageTextarea"
				className="message-input__textarea"
				value={inputValue}
				onChange={handleInputChange}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				placeholder="Skriv din påskhälsning här..."
				rows={4}
				maxLength={200}
				aria-describedby="messageCounter"
			/>
			<div id="messageCounter" className="message-input__counter">
				{inputValue.length}/200 tecken
			</div>
		</div>
	);
};

export default MessageInput;
