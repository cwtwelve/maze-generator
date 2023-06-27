"use client";

import Cell from "@/src/components/cell";
import { generateInitialCellValues } from "./utilities";
import classNames from "classnames";

interface MazeProps {
	numRows: number;
	numColumns: number;
}

const Maze = (props: MazeProps) => {
	const { numRows, numColumns } = props;

	const grid = generateInitialCellValues(numRows, numColumns);

	grid[0][0] = [true, false, true, true];
	grid[0][1] = [true, true, true, false];

	const drawGrid = () => {
		return (
			<div
				className={classNames("border", "border-solid", "border-black")}
			>
				{grid.map((row, rowIndex) => (
					<div key={rowIndex} className="flex">
						{row.map((column, columnIndex) => (
							<Cell
								key={`${rowIndex},${columnIndex}`}
								cellValues={column}
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
