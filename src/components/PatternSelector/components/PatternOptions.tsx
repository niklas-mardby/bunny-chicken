import { Pattern } from "../../../types";

type PatternOptionsProps = {
	currentPattern: Pattern;
	onPatternChange: (pattern: Pattern) => void;
};

const PatternOptions = ({
	currentPattern,
	onPatternChange,
}: PatternOptionsProps) => {
	return (
		<div className="pattern-selector__options">
			<PatternButton
				label="Enfärgat"
				active={currentPattern === "solid"}
				onClick={() => onPatternChange("solid")}
			/>
			<PatternButton
				label="Prickar"
				active={currentPattern === "dots"}
				onClick={() => onPatternChange("dots")}
			/>
			<PatternButton
				label="Ränder"
				active={currentPattern === "stripes"}
				onClick={() => onPatternChange("stripes")}
			/>
			<PatternButton
				label="Rutmönster"
				active={currentPattern === "checkered"}
				onClick={() => onPatternChange("checkered")}
			/>
		</div>
	);
};

type PatternButtonProps = {
	label: string;
	active: boolean;
	onClick: () => void;
};
const PatternButton = ({ label, active, onClick }: PatternButtonProps) => (
	<button
		type="button"
		className={`pattern-selector__option ${
			active ? "pattern-selector__option--active" : ""
		}`}
		onClick={onClick}
	>
		{label}
	</button>
);

export default PatternOptions;
