"use client";

import Maze from "@/src/components/maze";
import { GridOptionsType } from "@/src/types";
import { RangeSlider } from "@/src/ui";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const MazeOptions = () => {
	const [numRows, setNumRows] = useState(3);
	const [numColumns, setNumColumns] = useState(4);
	const [startY, setStartY] = useState(0);
	const [startX, setStartX] = useState(1);
	const [endY, setEndY] = useState(0);
	const [endX, setEndX] = useState(0);

	const inputFieldData = {
		rows: {
			label: "Height",
			name: "rows",
			min: "2",
			max: "100"
		},
		columns: {
			label: "Width",
			name: "columns",
			min: "2",
			max: "100"
		}
	};

	const initialValues = {
		[inputFieldData.rows.name]: `${numRows}`,
		[inputFieldData.columns.name]: `${numColumns}`
	};

	const methods = useForm<GridOptionsType>({ defaultValues: initialValues });
	const onSubmit = (data: GridOptionsType) => {
		setNumRows(parseInt(data.rows));
		setNumColumns(parseInt(data.columns));
	};

	return (
		<>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<RangeSlider {...inputFieldData.rows} />
					<RangeSlider {...inputFieldData.columns} />
					<button className="btn" type="submit">
						Temporary Save Button
					</button>
				</form>
			</FormProvider>
			<Maze
				numRows={numRows}
				numColumns={numColumns}
				startY={startY}
				startX={startX}
				endY={endY}
				endX={endX}
			/>
		</>
	);
};

export default MazeOptions;
