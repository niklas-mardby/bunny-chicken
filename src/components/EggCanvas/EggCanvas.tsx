import { useRef, useEffect } from "react";
import { useEggDesign } from "../../context/EggDesignContext";
import "./EggCanvas.scss";

interface EggCanvasProps {
	width?: number;
	height?: number;
}

const EggCanvas = ({ width = 300, height = 400 }: EggCanvasProps) => {
	const { state } = useEggDesign();
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Render ägget med det valda mönstret och andra designalternativ
	useEffect(() => {
		console.log(
			"EggCanvas rendering, pattern:",
			state.patternSettings.pattern
		);
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Rensa canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Rita äggformen
		drawEggShape(
			ctx,
			canvas.width / 2,
			canvas.height / 2,
			canvas.width * 0.8,
			canvas.height * 0.8
		);

		// Rita mönstret baserat på inställningarna
		drawPattern(ctx, state.patternSettings);

		// Rita emojis
		drawEmojis(ctx, state.emojiDecorations);
	}, [state, width, height]);

	// Rita äggformen
	const drawEggShape = (
		ctx: CanvasRenderingContext2D,
		centerX: number,
		centerY: number,
		width: number,
		height: number
	) => {
		ctx.save();

		// Definiera äggform - mer spetsig upptill och rundare nertill
		const eggWidth = width * 0.8;
		const eggHeight = height * 0.95;

		ctx.beginPath();

		// Flytta start till toppen av ägget
		ctx.moveTo(centerX, centerY - eggHeight / 2);

		// Definiera kontrollpunkter för toppen (spetsig del)
		const topWidth = eggWidth * 0.3; // Ännu smalare i toppen
		// const topHeight = eggHeight * 0.45; // Gör toppen högre/spetsigare

		// Höger sida, övre halvan (spetsig)
		ctx.bezierCurveTo(
			centerX + topWidth,
			centerY - eggHeight / 2, // Kontrollpunkt 1 - smalare
			centerX + eggWidth / 2,
			centerY - eggHeight / 5, // Kontrollpunkt 2 - högre upp
			centerX + eggWidth / 2,
			centerY // Slutpunkt (mitten i höjdled)
		);

		// Höger sida, nedre halvan (rundad)
		ctx.bezierCurveTo(
			centerX + eggWidth / 2,
			centerY + eggHeight / 3.5, // Kontrollpunkt 1
			centerX + eggWidth * 0.4,
			centerY + eggHeight / 2, // Kontrollpunkt 2
			centerX,
			centerY + eggHeight / 2 // Slutpunkt (botten)
		);

		// Vänster sida, nedre halvan (rundad)
		ctx.bezierCurveTo(
			centerX - eggWidth * 0.4,
			centerY + eggHeight / 2, // Kontrollpunkt 1
			centerX - eggWidth / 2,
			centerY + eggHeight / 3.5, // Kontrollpunkt 2
			centerX - eggWidth / 2,
			centerY // Slutpunkt (mitten i höjdled)
		);

		// Vänster sida, övre halvan (spetsig)
		ctx.bezierCurveTo(
			centerX - eggWidth / 2,
			centerY - eggHeight / 5, // Kontrollpunkt 1 - högre upp
			centerX - topWidth,
			centerY - eggHeight / 2, // Kontrollpunkt 2 - smalare
			centerX,
			centerY - eggHeight / 2 // Tillbaka till toppen
		);

		ctx.closePath();

		// Fyll ägget med en basfärg
		ctx.fillStyle = state.patternSettings.colorScheme.primary;
		ctx.fill();

		ctx.restore();

		// Spara äggformen för att klippa mönstret
		ctx.save();
		ctx.clip();

		return { centerX, centerY, width, height };
	};

	// Rita mönster inom äggformen
	const drawPattern = (
		ctx: CanvasRenderingContext2D,
		patternSettings: typeof state.patternSettings
	) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const { centerX, centerY, width, height } = drawEggShape(
			ctx,
			canvas.width / 2,
			canvas.height / 2,
			canvas.width * 0.8,
			canvas.height * 0.8
		);

		const { pattern, colorScheme } = patternSettings;

		switch (pattern) {
			case "solid":
				// Enfärgat - redan hanterat i drawEggShape
				break;

			case "dots":
				if (patternSettings.dots) {
					const { size, density, rotation = 0 } = patternSettings.dots; // Default 0 om rotation saknas
					drawDotPattern(ctx, centerX, centerY, width, height, {
						colorScheme,
						size,
						density,
						rotation,
					});
				}
				break;

			case "stripes":
				if (patternSettings.stripes) {
					const {
						count,
						rotation = 0,
						width = 20,
						position = 50,
						style,
					} = patternSettings.stripes;
					drawStripePattern(ctx, centerX, centerY, width, height, {
						colorScheme,
						count,
						rotation,
						width,
						position,
						style,
					});
				}
				break;

			case "checkered":
				if (patternSettings.checkered) {
					const { size, rotation = 0 } = patternSettings.checkered; // Hämta rotation med default 0
					drawCheckeredPattern(ctx, centerX, centerY, width, height, {
						colorScheme,
						size,
						rotation,
					});
				}
				break;
		}

		ctx.restore(); // Återställ clip
	};

	// Rita prickmönster
	const drawDotPattern = (
		ctx: CanvasRenderingContext2D,
		centerX: number,
		centerY: number,
		width: number,
		height: number,
		options: {
			colorScheme: typeof state.patternSettings.colorScheme;
			size: number;
			density: number;
			rotation: number;
		}
	) => {
		const { colorScheme, size, density, rotation } = options;
		const dotRadius = size;
		const spacing = dotRadius * 3 * (1 / density);

		// Rita en bakgrund
		ctx.fillStyle = colorScheme.primary;
		ctx.fillRect(centerX - width / 2, centerY - height / 2, width, height);

		// Spara canvas state innan rotation
		ctx.save();

		// Rotera canvas runt mittpunkten
		ctx.translate(centerX, centerY);
		ctx.rotate((rotation * Math.PI) / 180); // Konvertera grader till radianer
		ctx.translate(-centerX, -centerY);

		// Rita prickar
		ctx.fillStyle = colorScheme.secondary;

		for (
			let x = centerX - width * 0.7;
			x < centerX + width * 0.7;
			x += spacing
		) {
			for (
				let y = centerY - height / 2;
				y < centerY + height / 2;
				y += spacing
			) {
				ctx.beginPath();
				ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		// Återställ canvas state
		ctx.restore();
	};

	// Rita rändermönster
	const drawStripePattern = (
		ctx: CanvasRenderingContext2D,
		centerX: number,
		centerY: number,
		width: number,
		height: number,
		options: {
			colorScheme: typeof state.patternSettings.colorScheme;
			count: number;
			rotation: number;
			width: number; // Ny parameter för bredd
			position: number; // Ny parameter för position
			style: string;
		}
	) => {
		const {
			colorScheme,
			count,
			rotation,
			width: stripeWidth,
			position,
			style,
		} = options;

		// Konvertera position (1-100) till en offset
		const positionOffset = ((position - 50) / 50) * (width * 10);

		// Beräkna vinkeln från rotation (i grader)
		const angle = (rotation * Math.PI) / 180; // Konvertera grader till radianer

		ctx.save();
		ctx.translate(centerX + positionOffset, centerY);
		ctx.rotate(angle);

		// Beräkna den maximala diagonalen för att säkerställa att hela ägget täcks vid alla rotationer
		const diagonal = Math.sqrt(width * width + height * height);

		// Fyll hela ägget med primärfärgen först
		ctx.fillStyle = colorScheme.primary;
		ctx.fillRect(-diagonal / 2, -diagonal / 2, diagonal, diagonal);

		// Rita ränder i sekundärfärgen
		ctx.fillStyle = colorScheme.secondary;

		// Bredden på varje rand baserat på inställningen
		const actualStripeWidth = stripeWidth;

		// Om count är 1, rita bara en rand i mitten
		if (count === 1) {
			const stripeX = -actualStripeWidth / 2;
			const stripeY = -diagonal / 2;

			if (style === "straight") {
				// Rita en rak rand
				ctx.fillRect(stripeX, stripeY, actualStripeWidth, diagonal);
			} else {
				// Hantera andra stilar (zigzag, wavy)
				drawStylizedStripe(
					ctx,
					stripeX,
					stripeY,
					actualStripeWidth,
					diagonal,
					style
				);
			}
		} else {
			// Om count är större än 1, rita flera ränder centrerat
			const totalWidth =
				count * actualStripeWidth + (count - 1) * actualStripeWidth;
			const startX = -totalWidth / 2;

			for (let i = 0; i < count; i++) {
				const stripeX = startX + i * 2 * actualStripeWidth;
				const stripeY = -diagonal / 2;

				if (style === "straight") {
					// Rita en rak rand
					ctx.fillRect(stripeX, stripeY, actualStripeWidth, diagonal);
				} else {
					// Hantera andra stilar (zigzag, wavy)
					drawStylizedStripe(
						ctx,
						stripeX,
						stripeY,
						actualStripeWidth,
						diagonal,
						style
					);
				}
			}
		}

		ctx.restore();
	};

	// Hjälpfunktion för att rita stiliserade ränder (zigzag eller vågiga)
	const drawStylizedStripe = (
		ctx: CanvasRenderingContext2D,
		startX: number,
		startY: number,
		width: number,
		height: number,
		style: string
	) => {
		ctx.beginPath();
		ctx.moveTo(startX, startY);

		const amplitude = width * 0.4;
		const segments = 20;
		const segmentHeight = height / segments;

		for (let j = 0; j < segments; j++) {
			const y = startY + j * segmentHeight;

			if (style === "zigzag") {
				// Zigzag
				const x = j % 2 === 0 ? startX : startX + amplitude;
				ctx.lineTo(x, y);
			} else {
				// Vågiga ränder
				const x = startX + Math.sin((j * Math.PI) / 4) * amplitude;
				ctx.lineTo(x, y);
			}
		}

		ctx.lineTo(startX, startY + height);
		ctx.lineTo(startX + width, startY + height);

		// Rita tillbaka uppåt för att avsluta formen
		for (let j = segments - 1; j >= 0; j--) {
			const y = startY + j * segmentHeight;

			if (style === "zigzag") {
				const x = j % 2 === 0 ? startX + width : startX + width + amplitude;
				ctx.lineTo(x, y);
			} else {
				const x = startX + width + Math.sin((j * Math.PI) / 4) * amplitude;
				ctx.lineTo(x, y);
			}
		}

		ctx.closePath();
		ctx.fill();
	};

	// Rita rutmönster
	const drawCheckeredPattern = (
		ctx: CanvasRenderingContext2D,
		centerX: number,
		centerY: number,
		width: number,
		height: number,
		options: {
			colorScheme: typeof state.patternSettings.colorScheme;
			size: number;
			rotation: number; // Ny parameter för rotation
		}
	) => {
		const { colorScheme, size, rotation } = options;
		const tileSize = size;

		// Spara canvas state innan rotation
		ctx.save();

		// Rotera canvas runt mittpunkten
		ctx.translate(centerX, centerY);
		ctx.rotate((rotation * Math.PI) / 180); // Konvertera grader till radianer
		ctx.translate(-centerX, -centerY);

		// Rita rutmönster
		for (
			let x = centerX - width * 0.7 - tileSize; // Utöka området för att täcka kanter vid rotation
			x < centerX + width * 0.7 + tileSize;
			x += tileSize
		) {
			for (
				let y = centerY - height / 2 - tileSize; // Utöka området för att täcka kanter vid rotation
				y < centerY + height / 2 + tileSize;
				y += tileSize
			) {
				const isEvenRow =
					Math.floor((y - (centerY - height / 2)) / tileSize) % 2 === 0;
				const isEvenCol =
					Math.floor((x - (centerX - width / 2)) / tileSize) % 2 === 0;

				ctx.fillStyle =
					(isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol)
						? colorScheme.primary
						: colorScheme.secondary;

				ctx.fillRect(x, y, tileSize, tileSize);
			}
		}

		// Återställ canvas state
		ctx.restore();
	};

	// Rita emojis
	const drawEmojis = (
		ctx: CanvasRenderingContext2D,
		emojiDecorations: typeof state.emojiDecorations
	) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		emojiDecorations.forEach((decoration) => {
			const { emoji, position, size, rotation } = decoration;

			ctx.save();

			// Placera emojin
			const x = (position.x / 100) * canvas.width;
			const y = (position.y / 100) * canvas.height;

			ctx.translate(x, y);
			ctx.rotate(rotation * (Math.PI / 180)); // Konvertera grader till radianer

			// Rita emojin
			ctx.font = `${size}px Arial`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(emoji, 0, 0);

			ctx.restore();
		});
	};

	return (
		<div className="egg-canvas">
			<canvas
				ref={canvasRef}
				width={width}
				height={height}
				className="egg-canvas__canvas"
			/>
		</div>
	);
};

export default EggCanvas;
