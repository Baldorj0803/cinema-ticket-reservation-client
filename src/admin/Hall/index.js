import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import UpdateIcon from "@material-ui/icons/Update";
import axios from "axios";
import { useSnackbar } from "notistack";
import AdminModel from "../AdminModel";
import { API } from "../../config";
import AddIcon from "@material-ui/icons/Add";

const Hall = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [halls, setHalls] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		nextPage: null,
		prevPage: null,
		start: null,
	});
	const [page, setPage] = useState(1);
	const loadBranches = () => {
		let token = localStorage.getItem("t");

		setLoading(true);
		axios
			.get(`${API}/halls?page=${page}`)
			.then((res) => {
				console.log(res.data.data);
				setLoading(false);
				setHalls(res.data.data);
				setPagination(res.data.pagination);
			})
			.catch((err) => {
				setLoading(false);
				setError(err.response.data.error);
			});
	};
	useEffect(() => {
		loadBranches();
	}, [page]);

	const deleteItem = (hallId) => {
		let token = localStorage.getItem("t");
		axios
			.delete(`${API}/halls/${hallId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				loadBranches();
				enqueueSnackbar("Амжилттай устгалаа", { variant: "success" });
			})
			.catch((err) => {
				enqueueSnackbar("Алдаа гарлаа" + err.response.data.error, {
					variant: "error",
				});
			});
	};
	const [open, setOpen] = useState(false);
	const [method, setMethod] = useState(null);
	const [hall, setHall] = useState(null);

	const handleMethod = (method, hall) => {
		setMethod(method);
		handleOpen();
		setHall(hall);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={css.Branch}>
			<div className={css.Header}>
				<span>Танхимын мэдээлэл</span>
				<button onClick={() => handleMethod("POST")}>
					<AddIcon />
					<span>Танхим нэмэх</span>
				</button>
			</div>

			<div className={css.Table}>
				<TableContainer component={Paper}>
					<Table aria-label="simple table" size="small">
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell align="center">Дугаар</TableCell>
								<TableCell align="center">Төрөл</TableCell>
								<TableCell align="center">Суудлын тоо</TableCell>
								<TableCell align="center">Салбар</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{halls.map((hall, i) => {
								return (
									<TableRow key={hall._id}>
										<TableCell component="th" scope="row">
											{pagination.start + i}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{hall.hallNumber}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{hall.hallType}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{hall.row * hall.column}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{hall.branch ? hall.branch.branchName : ""}
										</TableCell>

										<TableCell align="center">
											<div
												style={{ height: "10px", cursor: "pointer" }}
												onClick={() => handleMethod("PUT", hall)}
											>
												<UpdateIcon fontSize="small" />
											</div>
										</TableCell>
										<TableCell align="center">
											<div
												onClick={() => deleteItem(hall._id)}
												style={{ height: "10px", cursor: "pointer" }}
											>
												<DeleteOutlineIcon fontSize="small" />
											</div>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<div className={css.Footer}>
				{pagination.prevPage && (
					<button onClick={() => setPage((prevPage) => prevPage - 1)}>
						Өмнөх
					</button>
				)}
				{pagination.nextPage && (
					<button onClick={() => setPage((prevPage) => prevPage + 1)}>
						Дараах
					</button>
				)}
			</div>
			<AdminModel
				hall={hall}
				method={method}
				loadData={loadBranches}
				alert={enqueueSnackbar}
				open={open}
				handleClose={handleClose}
				model="hall"
			/>
		</div>
	);
};

export default Hall;
