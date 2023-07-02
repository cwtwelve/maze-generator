"use client";

import Cell from "@/src/components/cell";
import { generateInitialCellValues, createMaze } from "./utilities";
import cloneDeep from "lodash/cloneDeep";
import classNames from "classnames";

interface MazeProps {
	numRows: number;
	numColumns: number;
}

const Maze = (props: MazeProps) => {
	const { numRows, numColumns } = props;

	const grid = generateInitialCellValues(numRows, numColumns);

	const solvedGrid = createMaze(cloneDeep(grid), numRows, numColumns);

	const drawGrid = () => {
		return (
			<div
				className={classNames("border", "border-solid", "border-black")}
			>
				{solvedGrid.map((row: any, rowIndex: number) => (
					<div key={rowIndex} className="flex">
						{row.map((cellData: any, columnIndex: number) => (
							<Cell
								key={`${rowIndex},${columnIndex}`}
								walls={cellData.walls}
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
