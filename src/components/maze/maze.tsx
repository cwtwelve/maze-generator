"use client";

import Cell from "@/src/components/cell";
import { generateInitialCellValues, createMaze } from "./utilities";
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

	const [grid, setGrid] = useState(
		generateInitialCellValues(numRows, numColumns, startY, startX)
	);
	const [availableCells, setAvailableCells] = useState([
		`${startY},${startX}`
	]);

	const x = async () => {
		let tempGrid = grid;
		while (availableCells.length) {
			console.log(availableCells);
			const [updatedGrid, updatedAvailableCells] = await createMaze(
				cloneDeep(tempGrid),
				availableCells,
				numRows,
				numColumns
			);

			tempGrid = updatedGrid;
			setGrid(updatedGrid);
			setAvailableCells(updatedAvailableCells);
		}
	};

	useEffect(() => {
		console.log("fdsfsqqqqq");
		setGrid(generateInitialCellValues(numRows, numColumns, startY, startX));
		setAvailableCells([`${startY},${startX}`]);
		x();
	}, [numRows, numColumns]);

	const drawGrid = () => {
		return (
			<div
				className={classNames("border", "border-solid", "border-black")}
			>
				{grid.map((row: any, rowIndex: number) => (
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
