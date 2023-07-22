import { CellType } from "@/src/types";
import cloneDeep from "lodash/cloneDeep";

const sleep = (timeout: number) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const generateInitialCellValues = (
	numRows: number,
	numColumns: number,
	startY: number,
	startX: number
) => {
	const defaultCellConfiguration: CellType = {
		walls: [true, true, true, true],
		explored: false
	};

	const rows = [];

	for (let y = 0; y < numRows; y++) {
		const columns = [];

		for (let x = 0; x < numColumns; x++) {
			const cellConfiguration =
				y === startY && x === startX
					? { ...cloneDeep(defaultCellConfiguration), explored: true }
					: cloneDeep(defaultCellConfiguration);
			columns.push(cellConfiguration);
		}

		rows.push(columns);
	}

	return rows;
};

const getLookDirectionOrder = () =>
	["N", "E", "S", "W"]
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

const getIsNeighborInBounds = (
	chosenY: number,
	chosenX: number,
	lookDirection: string,
	numRows: number,
	numColumns: number
) => {
	if (lookDirection === "N" && chosenY <= 0) return false;
	if (lookDirection === "E" && chosenX >= numColumns - 1) return false;
	if (lookDirection === "S" && chosenY >= numRows - 1) return false;
	if (lookDirection === "W" && chosenX <= 0) return false;

	return true;
};

const getIsNeighborUnexplored = (
	grid: CellType[][],
	testCoordinates: number[]
) =>
	grid[testCoordinates[0]][testCoordinates[1]].explored === false
		? true
		: false;

const getUnexploredNeighbors = (
	grid: CellType[][],
	chosenY: number,
	chosenX: number,
	numRows: number,
	numColumns: number
) => {
	const unexploredNeighbors = [];

	const lookDirectionOrder = getLookDirectionOrder();

	for (const lookDirection of lookDirectionOrder) {
		const isNeighborInBounds = getIsNeighborInBounds(
			chosenY,
			chosenX,
			lookDirection,
			numRows,
			numColumns
		);

		let testCoordinates: number[] = [];
		if (lookDirection === "N") testCoordinates = [chosenY - 1, chosenX];
		if (lookDirection === "E") testCoordinates = [chosenY, chosenX + 1];
		if (lookDirection === "S") testCoordinates = [chosenY + 1, chosenX];
		if (lookDirection === "W") testCoordinates = [chosenY, chosenX - 1];

		const isNeighborUnexplored =
			isNeighborInBounds &&
			getIsNeighborUnexplored(grid, testCoordinates);

		if (isNeighborInBounds && isNeighborUnexplored) {
			unexploredNeighbors.push({
				direction: lookDirection,
				coordinates: testCoordinates
			});
		}
	}

	return unexploredNeighbors.length ? unexploredNeighbors : null;
};

const addCell = async (
	grid: CellType[][],
	availableCells: string[],
	numRows: number,
	numColumns: number
): Promise<[CellType[][], string[]]> => {
	const randomIndex = Math.floor(Math.random() * availableCells.length);
	const chosenCell = availableCells[randomIndex];

	const [stringY, stringX] = chosenCell.split(",");

	const chosenY: number = parseInt(stringY);
	const chosenX: number = parseInt(stringX);

	const unexploredNeighbors = getUnexploredNeighbors(
		grid,
		chosenY,
		chosenX,
		numRows,
		numColumns
	);

	if (unexploredNeighbors !== null && unexploredNeighbors.length) {
		await sleep(20);
		const neighborDirection = unexploredNeighbors[0].direction;
		const neighborCoordinates = unexploredNeighbors[0].coordinates;
		const neighborY = neighborCoordinates[0];
		const neighborX = neighborCoordinates[1];

		const chosenCellWalls = cloneDeep(grid[chosenY][chosenX].walls);
		const neighborCellWalls = cloneDeep(grid[neighborY][neighborX].walls);

		if (neighborDirection === "N") {
			chosenCellWalls[0] = false;
			neighborCellWalls[2] = false;
		}
		if (neighborDirection === "E") {
			chosenCellWalls[1] = false;
			neighborCellWalls[3] = false;
		}
		if (neighborDirection === "S") {
			chosenCellWalls[2] = false;
			neighborCellWalls[0] = false;
		}
		if (neighborDirection === "W") {
			chosenCellWalls[3] = false;
			neighborCellWalls[1] = false;
		}

		grid[chosenY][chosenX].walls = chosenCellWalls;
		grid[neighborY][neighborX].walls = neighborCellWalls;
		grid[neighborY][neighborX].explored = true;

		if (unexploredNeighbors.length === 1) {
			availableCells.splice(randomIndex, 1);
		}

		availableCells.push(`${neighborY},${neighborX}`);
	} else {
		availableCells.splice(randomIndex, 1);
	}

	return [cloneDeep(grid), cloneDeep(availableCells)];
};

export { generateInitialCellValues, addCell };
