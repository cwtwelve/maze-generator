"use client";

import "./cell.scss";

const Cell = (props: { cellValue: number }) => {
	const { cellValue } = props;

	return (
		<div className="cell">
			<div className="cell-text">{cellValue}</div>
		</div>
	);
};

export default Cell;
