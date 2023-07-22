"use client";

import classNames from "classnames";

interface CellProps {
	walls: [boolean, boolean, boolean, boolean];
	cellSize: number;
}

const Cell = (props: CellProps) => {
	const { walls, cellSize } = props;
	const [topBorder, rightBorder, bottomBorder, leftBorder] = walls;

	return (
		<div
			style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
			className={classNames(
				{ "border-t": topBorder },
				{ "border-r": rightBorder },
				{ "border-b": bottomBorder },
				{ "border-l": leftBorder }
			)}
		></div>
	);
};

export default Cell;
