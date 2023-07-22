"use client";

import classNames from "classnames";

const Cell = (props: { walls: [boolean, boolean, boolean, boolean] }) => {
	const { walls } = props;
	const [topBorder, rightBorder, bottomBorder, leftBorder] = walls;

	const widthClass = `w-[${40}px]`;
	const heightClass = `h-[${40}px]`;

	return (
		<div
			className={classNames(
				widthClass,
				heightClass,
				"hover:bg-orange-400",
				{ "border-t": topBorder },
				{ "border-r": rightBorder },
				{ "border-b": bottomBorder },
				{ "border-l": leftBorder }
			)}
		></div>
	);
};

export default Cell;
