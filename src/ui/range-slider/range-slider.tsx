"use client";

import { useFormContext } from "react-hook-form";

interface RangeSliderProps {
	label: string;
	name: string;
	min: string;
	max: string;
}

const RangeSlider = (props: RangeSliderProps) => {
	const { label, name, min, max } = props;
	const { register } = useFormContext();

	return (
		<>
			<label className="label">
				<span className="label-text">{label}</span>
			</label>
			<input
				{...register(name)}
				min={min}
				max={max}
				type="range"
				className="range"
			/>
		</>
	);
};

export default RangeSlider;
