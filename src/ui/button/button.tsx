"use client";

import { ButtonType } from "@/src/types";
import classNames from "classnames";

const Button = (props: ButtonType) => {
	const { label, type } = props;

	return (
		<button
			type={type}
			className={classNames("btn", "normal-case", "font-normal")}
		>
			{label}
		</button>
	);
};

export default Button;
