"use client";

import Maze from "@/src/components/maze";
import { GridOptionsType, RangeSliderType, ButtonType } from "@/src/types";
import { RangeSlider, Button } from "@/src/ui";
import classNames from "classnames";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const MazeOptions = () => {
	const [numRows, setNumRows] = useState(3);
	const [numColumns, setNumColumns] = useState(4);
	const [startY, setStartY] = useState(0);
	const [startX, setStartX] = useState(1);
	const [endY, setEndY] = useState(0);
	const [endX, setEndX] = useState(0);

	const inputFieldData: {
		rows: RangeSliderType;
		columns: RangeSliderType;
		submitButton: ButtonType;
	} = {
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
		},
		submitButton: {
			label: "Generate",
			name: "submitButton",
			type: "submit"
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
					<Maze
						numRows={numRows}
						numColumns={numColumns}
						startY={startY}
						startX={startX}
						endY={endY}
						endX={endX}
					/>
					<div className={classNames("flex", "justify-center")}>
						<div
							className={classNames(
								"flex",
								"flex-col",
								"items-center",
								"md:w-1/2",
								"w-3/4"
							)}
						>
							<RangeSlider {...inputFieldData.rows} />
							<RangeSlider {...inputFieldData.columns} />
							<Button {...inputFieldData.submitButton} />
						</div>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default MazeOptions;
