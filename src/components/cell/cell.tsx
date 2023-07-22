"use client";

import classNames from "classnames";

const Cell = (props: { walls: [boolean, boolean, boolean, boolean] }) => {
	const { walls } = props;
	const [topBorder, rightBorder, bottomBorder, leftBorder] = walls;

	return (
		<div
			className={classNames(
				`w-[${40}px]`,
				`h-[${40}px]`,
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
