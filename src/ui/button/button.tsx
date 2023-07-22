"use client";

import { ButtonType } from "@/src/types";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

const Button = (props: ButtonType) => {
	const { label, name, type } = props;
	const { register } = useFormContext();

	return (
		<button {...register(name)} type={type} className={classNames("btn")}>
			{label}
		</button>
	);
};

export default Button;
