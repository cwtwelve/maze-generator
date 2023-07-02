"use client";

import "./cell.scss";
import classNames from "classnames";

const Cell = (props: { walls: [boolean, boolean, boolean, boolean] }) => {
	const { walls } = props;
	const [topBorder, rightBorder, bottomBorder, leftBorder] = walls;

	return (
		<div
			className={classNames(
				"cell",
				{ "cell-border-top": topBorder },
				{ "cell-border-right": rightBorder },
				{ "cell-border-bottom": bottomBorder },
				{ "cell-border-left": leftBorder }
			)}
		></div>
	);
};

export default Cell;
