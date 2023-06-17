"use client";

import Cell from "@/src/components/cell";

const Maze = (props: { grid: number[][] }) => {
	const { grid } = props;

	const drawGrid = () => {
		return (
			<div>
				{grid.map((row) => (
					<div className="flex">
						{row.map((column) => (
							<Cell cellValue={column} />
						))}
					</div>
				))}
			</div>
		);
	};

	return <div className="flex justify-center">{drawGrid()}</div>;
};

export default Maze;
