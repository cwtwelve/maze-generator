"use client";

import Maze from "@/src/components/maze";
import { RangeSlider, Button } from "@/src/ui";
import { GridOptionsType, RangeSliderType, ButtonType } from "@/src/types";
import { FORM_PROPERTIES, BUILD_STATES } from "@/src/constants";
import classNames from "classnames";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const MazeOptions = () => {
	const [numRows, setNumRows] = useState(10);
	const [numColumns, setNumColumns] = useState(10);
	const [buildState, setBuildState] = useState<BUILD_STATES>(
		BUILD_STATES.CREATE
	);

	const inputFieldData: {
		rows: RangeSliderType;
		columns: RangeSliderType;
		submitButton: ButtonType;
	} = {
		rows: {
			name: FORM_PROPERTIES.ROWS,
			label: "Height",
			min: "2",
			max: "30"
		},
		columns: {
			name: FORM_PROPERTIES.COLUMNS,
			label: "Width",
			min: "2",
			max: "30"
		},
		submitButton: {
			label: "Generate New Maze",
			type: "submit"
		}
	};

	const initialValues = {
		[FORM_PROPERTIES.ROWS]: `${numRows}`,
		[FORM_PROPERTIES.COLUMNS]: `${numColumns}`
	};

	const methods = useForm<GridOptionsType>({ defaultValues: initialValues });
	const onSubmit = (data: GridOptionsType) => {
		const chosenNumRows: number = parseInt(data.rows);
		const chosenNumColumns: number = parseInt(data.columns);
		setNumRows(chosenNumRows);
		setNumColumns(chosenNumColumns);
		setBuildState(BUILD_STATES.CREATE);
	};

	return (
		<>
			{buildState === BUILD_STATES.CONFIGURE && (
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<div className={classNames("flex", "justify-center")}>
							<div
								className={classNames(
									"flex",
									"flex-col",
									"xl:w-1/4",
									"w-3/4"
								)}
							>
								<RangeSlider {...inputFieldData.rows} />
								<RangeSlider {...inputFieldData.columns} />
								<div className={classNames("self-end", "py-2")}>
									<Button {...inputFieldData.submitButton} />
								</div>
							</div>
						</div>
					</form>
				</FormProvider>
			)}
			<Maze
				numRows={numRows}
				numColumns={numColumns}
				startY={Math.floor(Math.random() * numRows)}
				startX={Math.floor(Math.random() * numColumns)}
				buildState={buildState}
				setBuildState={setBuildState}
			/>
		</>
	);
};

export default MazeOptions;
