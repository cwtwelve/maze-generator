"use client";

import Cell from "@/src/components/cell";
import { CellType } from "@/src/types";
import { BUILD_STATES } from "@/src/constants";
import { generateInitialCellValues, addCell } from "./utilities";
import { useState, useEffect, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import classNames from "classnames";

interface MazeProps {
	numRows: number;
	numColumns: number;
	startY: number;
	startX: number;
	buildState: BUILD_STATES;
	setBuildState: (argument: BUILD_STATES) => void;
}

const Maze = (props: MazeProps) => {
	const { numRows, numColumns, startY, startX, buildState, setBuildState } =
		props;

	const [grid, setGrid] = useState<null | CellType[][]>(null);
	const cellSize = useRef(40);

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

		setBuildState(BUILD_STATES.CONFIGURE);
	};

	useEffect(() => {
		const maximumCellHeight = (window.innerHeight - 100) / numRows;
		const maximumCellWidth = (window.innerWidth - 100) / numColumns;
		cellSize.current = Math.min(maximumCellHeight, maximumCellWidth, 40);

		if (buildState === BUILD_STATES.CREATE) {
			setBuildState(BUILD_STATES.DRAW);
			const initialCellValues = generateInitialCellValues(
				numRows,
				numColumns,
				startY,
				startX
			);
			setGrid(initialCellValues);
			drawMaze(initialCellValues).catch(() => null);
		}
	}, [
		numRows,
		numColumns,
		startY,
		startX,
		buildState,
		setBuildState,
		drawMaze
	]);

	const drawGrid = () => {
		return grid ? (
			<div className={classNames("border", "border-solid")}>
				{grid.map((row: CellType[], rowIndex: number) => (
					<div key={rowIndex} className="flex">
						{row.map((cellData: CellType, columnIndex: number) => (
							<Cell
								key={`${rowIndex},${columnIndex}`}
								walls={cellData.walls}
								cellSize={cellSize.current}
							/>
						))}
					</div>
				))}
			</div>
		) : null;
	};

	return (
		<div
			className={classNames(
				"flex",
				"justify-center",
				"items-center",
				"p-10",
				{ "h-screen": buildState === BUILD_STATES.DRAW }
			)}
		>
			{drawGrid()}
		</div>
	);
};

export default Maze;
