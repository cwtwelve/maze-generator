"use client";

import { useState } from "react";

const RangeSlider = (props: any) => {
	const [value, setValue] = useState("50");

	const handleChange = (e: any) => {
		// console.log(e);
		setValue(e.target.value);
	};

	return (
		<>
			<input
				type="range"
				min="0"
				max="100"
				className="range"
				value={value}
				onChange={handleChange}
			/>
			<div className="w-full flex justify-between text-xs px-2"></div>
		</>
	);
};

export default RangeSlider;
