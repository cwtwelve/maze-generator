"use client";

import Maze from "../maze";
import { GridOptions } from "@/src/types";

const MazeOptions = () => {
	const gridOptions: GridOptions = {
		rows: 4,
		columns: 4,
	};

	const columns: number[] = Array(gridOptions.columns).fill(0);
	const rows: number[][] = Array(gridOptions.rows).fill(columns);
	const grid: number[][] = [...rows];

	return (
		<>
			<Maze grid={grid} />
		</>
	);
};

export default MazeOptions;
