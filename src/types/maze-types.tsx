export interface GridOptionsType {
	rows: string;
	columns: string;
}

export interface CellType {
	walls: [boolean, boolean, boolean, boolean];
	explored: boolean;
}
