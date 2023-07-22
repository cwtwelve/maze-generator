"use client";

import { RangeSliderType } from "@/src/types";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

const RangeSlider = (props: RangeSliderType) => {
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
				className={classNames("range")}
			/>
		</>
	);
};

export default RangeSlider;
