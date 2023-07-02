import cloneDeep from "lodash/cloneDeep";

// TODO: Move to types file
interface CellConfiguration {
	walls: [boolean, boolean, boolean, boolean];
	explored: boolean;
}

const generateInitialCellValues = (numRows: number, numColumns: number) => {
	const initialCellConfiguration: CellConfiguration = {
		walls: [true, true, true, true],
		explored: false
	};

	const rows = [];

	for (let y = 0; y < numRows; y++) {
		const columns = [];

		for (let x = 0; x < numColumns; x++)
			columns.push({ ...initialCellConfiguration });

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
	if (lookDirection === "N" && chosenY === 0) return false;
	if (lookDirection === "E" && chosenX === numColumns) return false;
	if (lookDirection === "S" && chosenY === numRows) return false;
	if (lookDirection === "W" && chosenX === 0) return false;

	return true;
};

const getIsNeighborUnexplored = (grid: any, testCoordinates: number[]) =>
	grid[testCoordinates[0]][testCoordinates[1]].explored === false
		? true
		: false;

const getNeighbor = (
	grid: any,
	chosenY: number,
	chosenX: number,
	numRows: number,
	numColumns: number
) => {
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
			isNeighborInBounds ??
			getIsNeighborUnexplored(grid, testCoordinates);

		if (isNeighborInBounds && isNeighborUnexplored) {
			return {
				direction: lookDirection,
				coordinates: testCoordinates
			};
		}
	}

	return null;
};

const createMaze = (grid: any, numRows: number, numColumns: number) => {
	const totalCellCount = numRows * numColumns;

	const availableCells: string[] = ["0,1"];
	const unavailableCells: string[] = [];

	for (let i = 0; i < totalCellCount; i++) {
		const randomIndex = Math.floor(Math.random() * availableCells.length);
		const chosenCell = availableCells[randomIndex];

		const [stringY, stringX] = chosenCell.split(",");

		const chosenY: number = parseInt(stringY);
		const chosenX: number = parseInt(stringX);

		const neighborCell = getNeighbor(
			grid,
			chosenY,
			chosenX,
			numRows,
			numColumns
		);

		if (neighborCell !== null) {
			const neighborDirection = neighborCell.direction;
			const neighborCoordinates = neighborCell.coordinates;
			const neighborY = neighborCoordinates[0];
			const neighborX = neighborCoordinates[1];

			const chosenCellWalls = cloneDeep(grid[chosenY][chosenX].walls);
			const neighborCellWalls = cloneDeep(
				grid[neighborY][neighborX].walls
			);

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

			availableCells.push(`${neighborY},${neighborX}`);
		}
	}

	return grid;
};

export { generateInitialCellValues, createMaze };
