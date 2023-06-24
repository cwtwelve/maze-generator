"use client";

import Maze from "@/src/components/maze";
import { RangeSlider } from "@/src/ui";
import { GridOptions } from "@/src/types";

const MazeOptions = () => {
	const gridOptions: GridOptions = {
		rows: 4,
		columns: 4
	};

	const columns: number[] = Array<number>(gridOptions.columns).fill(0);
	const rows: number[][] = Array<number[]>(gridOptions.rows).fill(columns);
	const grid: number[][] = [...rows];

	return (
		<>
			<RangeSlider />
			<RangeSlider />
			<Maze grid={grid} />
		</>
	);
};

export default MazeOptions;
