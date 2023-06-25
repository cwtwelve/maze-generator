"use client";

import Cell from "@/src/components/cell";

interface MazeProps {
	numRows: number;
	numColumns: number;
}

const Maze = (props: MazeProps) => {
	const { numRows, numColumns } = props;

	const columns: number[] = Array<number>(numColumns).fill(0);
	const rows: number[][] = Array<number[]>(numRows).fill(columns);
	const grid: number[][] = [...rows];

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
