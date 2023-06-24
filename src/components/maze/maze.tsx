"use client";

import Cell from "@/src/components/cell";

const Maze = (props: { grid: number[][] }) => {
	const { grid } = props;

	const drawGrid = () => {
		return (
			<div>
				{grid.map((row, rowIndex) => (
					<div key={rowIndex} className="flex">
						{row.map((column, columnIndex) => (
							<Cell
								key={`${rowIndex},${columnIndex}`}
								cellValue={column}
							/>
						))}
					</div>
				))}
			</div>
		);
	};

	return <div className="flex justify-center">{drawGrid()}</div>;
};

export default Maze;
