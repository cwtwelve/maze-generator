"use client";

import Cell from "@/src/components/cell";
import { CellType } from "@/src/types";
import { generateInitialCellValues, addCell } from "./utilities";
import { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import classNames from "classnames";

interface MazeProps {
	numRows: number;
	numColumns: number;
	startY: number;
	startX: number;
	endY: number;
	endX: number;
}

const Maze = (props: MazeProps) => {
	const { numRows, numColumns, startY, startX } = props;

	const [grid, setGrid] = useState<null | CellType[][]>(null);

	const drawMaze = async (initialCellValues: CellType[][]) => {
		let buildGrid: CellType[][] = initialCellValues;
		let availableCells: string[] = [`${startY},${startX}`];

		while (availableCells.length) {
			const [updatedGrid, updatedAvailableCells] = await addCell(
				cloneDeep(buildGrid),
				availableCells,
				numRows,
				numColumns
			);

			availableCells = updatedAvailableCells;
			buildGrid = updatedGrid;
			setGrid(updatedGrid);
		}
	};

	useEffect(() => {
		const initialCellValues = generateInitialCellValues(
			numRows,
			numColumns,
			startY,
			startX
		);
		setGrid(initialCellValues);
		drawMaze(initialCellValues).catch(() => null);
	}, [numRows, numColumns, startY, startX]);

	const drawGrid = () => {
		return grid ? (
			<div
				className={classNames("border", "border-solid", "border-black")}
			>
				{grid.map((row: CellType[], rowIndex: number) => (
					<div key={rowIndex} className="flex">
						{row.map((cellData: CellType, columnIndex: number) => (
							<Cell
								key={`${rowIndex},${columnIndex}`}
								walls={cellData.walls}
							/>
						))}
					</div>
				))}
			</div>
		) : null;
	};

	return <div className="flex justify-center">{drawGrid()}</div>;
};

export default Maze;
