"use client";

import Maze from "@/src/components/maze";
import { RangeSlider } from "@/src/ui";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

interface FormData {
	rows: string;
	columns: string;
}

const MazeOptions = () => {
	const [numRows, setNumRows] = useState(5);
	const [numColumns, setNumColumns] = useState(5);

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

	const methods = useForm<FormData>({ defaultValues: initialValues });
	const onSubmit = (data: FormData) => {
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
			<Maze numRows={numRows} numColumns={numColumns} />
		</>
	);
};

export default MazeOptions;
