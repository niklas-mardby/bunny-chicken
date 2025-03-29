import React, { useState, useRef, useEffect } from "react";
import Tooltip from "../Tooltip/Tooltip";
import "./SliderWithTooltip.scss";

interface SliderWithTooltipProps {
	id: string;
	min: number | string;
	max: number | string;
	step?: number | string;
	value: number | string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeComplete?: () => void;
	className?: string;
	placeholder?: string;
	label?: string;
	showTooltip?: boolean;
	tooltipFormatter?: (value: number | string) => string;
	disabled?: boolean;
}

const SliderWithTooltip: React.FC<SliderWithTooltipProps> = ({
	id,
	min,
	max,
	step = 1,
	value,
	onChange,
	onChangeComplete,
	className = "",
	placeholder,
	label,
	showTooltip = true,
	tooltipFormatter,
	disabled = false,
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [thumbPosition, setThumbPosition] = useState({ x: 0, y: 0 });
	const sliderRef = useRef<HTMLInputElement>(null);

	// Format the tooltip value
	const formatTooltipValue = (value: number | string): string => {
		if (tooltipFormatter) {
			return tooltipFormatter(value);
		}

		// Default formatters based on value type
		if (typeof value === "number") {
			// If value is a number less than 1, show with 1 decimal
			return value < 1 ? value.toFixed(1) : value.toString();
		}

		return value.toString();
	};

	// Calculate thumb position for tooltip placement
	const calculateThumbPosition = () => {
		if (!sliderRef.current) return;

		const slider = sliderRef.current;
		const sliderRect = slider.getBoundingClientRect();
		const range = parseFloat(max.toString()) - parseFloat(min.toString());
		const valuePercent =
			(parseFloat(value.toString()) - parseFloat(min.toString())) / range;

		// Calculate horizontal position of the thumb
		const thumbX = valuePercent * sliderRect.width + sliderRect.left;

		// Y position just above the thumb
		const thumbY = sliderRect.top - 5;

		setThumbPosition({ x: thumbX, y: thumbY });
	};

	// Update thumb position when value changes
	useEffect(() => {
		if (isDragging && showTooltip) {
			calculateThumbPosition();
		}
	}, [value, isDragging, showTooltip]);

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			if (isDragging && showTooltip) {
				calculateThumbPosition();
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isDragging, showTooltip]);

	// Handle mouse/touch events
	const handleMouseDown = () => {
		setIsDragging(true);
		calculateThumbPosition();
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		if (onChangeComplete) {
			onChangeComplete();
		}
	};

	useEffect(() => {
		// Add global event listeners for mouseup/touchend
		document.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("touchend", handleMouseUp);

		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("touchend", handleMouseUp);
		};
	}, [onChangeComplete]);

	return (
		<div className={`slider-with-tooltip ${className}`}>
			{label && (
				<label htmlFor={id} className="slider-with-tooltip__label">
					{label}
				</label>
			)}

			<div className="slider-with-tooltip__container">
				<input
					ref={sliderRef}
					id={id}
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={onChange}
					onMouseDown={handleMouseDown}
					onTouchStart={handleMouseDown}
					className="slider-with-tooltip__input"
					placeholder={placeholder}
					disabled={disabled}
				/>

				{isDragging && showTooltip && (
					<Tooltip
						x={thumbPosition.x}
						y={thumbPosition.y}
						className="slider-with-tooltip__tooltip"
					>
						{formatTooltipValue(value)}
					</Tooltip>
				)}
			</div>
		</div>
	);
};

export default SliderWithTooltip;
