const generateInitialCellValues = (numRows: number, numColumns: number) => {
	return Array<number>(numRows)
		.fill(0)
		.map(() =>
			Array<[boolean, boolean, boolean, boolean]>(numColumns).fill([
				true,
				true,
				true,
				true
			])
		);
};

export { generateInitialCellValues };
