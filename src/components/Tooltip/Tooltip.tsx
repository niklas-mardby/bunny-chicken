import React, { useRef, useEffect, useState } from "react";
import "./Tooltip.scss";

interface TooltipProps {
	x: number;
	y: number;
	children: React.ReactNode;
	className?: string;
	position?: "top" | "right" | "bottom" | "left";
	offset?: number;
}

const Tooltip = ({
	x,
	y,
	children,
	className = "",
	position = "top",
	offset = 10,
}: TooltipProps) => {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
	const [show, setShow] = useState(false);

	// Get tooltip dimensions after it's rendered for positioning
	useEffect(() => {
		if (tooltipRef.current) {
			setTooltipSize({
				width: tooltipRef.current.offsetWidth,
				height: tooltipRef.current.offsetHeight,
			});

			// Slight delay to trigger animation after initial render
			const timer = setTimeout(() => {
				setShow(true);
			}, 12);

			return () => clearTimeout(timer);
		}
	}, []);

	// Calculate positioning based on the tooltip's actual size
	const getPositionStyles = () => {
		const { width, height } = tooltipSize;

		let left = x;
		let top = y;

		// Adjust position based on the desired position and tooltip size
		switch (position) {
			case "top":
				left = x - width / 2;
				top = y - height - offset;
				break;
			case "right":
				left = x + offset;
				top = y - height / 2;
				break;
			case "bottom":
				left = x - width / 2;
				top = y + offset;
				break;
			case "left":
				left = x - width - offset;
				top = y - height / 2;
				break;
		}

		// Ensure tooltip stays in viewport
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Prevent tooltip from going off-screen to the left or right
		if (left < 0) left = 0;
		if (left + width > windowWidth) left = windowWidth - width;

		// Prevent tooltip from going off-screen at the top or bottom
		if (top < 0) top = 0;
		if (top + height > windowHeight) top = windowHeight - height;

		return {
			left: `${left}px`,
			top: `${top}px`,
		};
	};

	return (
		<div
			ref={tooltipRef}
			className={`tooltip tooltip--${position} ${className} ${
				show ? "tooltip--show" : ""
			}`}
			style={getPositionStyles()}
		>
			<div className="tooltip__content">{children}</div>
			<div className={`tooltip__arrow tooltip__arrow--${position}`}></div>
		</div>
	);
};

export default Tooltip;
