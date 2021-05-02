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
import MyModal from "../MyModal";
import { API } from "../../config";

const Schedule = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [schedules, setschedules] = useState([]);
	const [pagination, setPagination] = useState({
		nextPage: null,
		prevPage: null,
		start: null,
	});
	const [page, setPage] = useState(1);

	const loadschedules = () => {
		let token = localStorage.getItem("t");
		axios
			.get(`${API}/schedules?limit=10&page=${page}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setschedules(res.data.data);
				setPagination(res.data.pagination);
			})
			.catch((err) => {
				console.lgo(err.response.data.error);
			});
	};
	useEffect(() => {
		loadschedules();
	}, [page]);

	const deleteItem = (id) => {
		let token = localStorage.getItem("t");
		axios
			.delete(`${API}/schedules/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				loadschedules();
				enqueueSnackbar("Амжилттай устгалаа", { variant: "success" });
			})
			.catch((err) => {
				enqueueSnackbar(err.response.data.error, { variant: "error" });
			});
	};
	const [open, setOpen] = useState(false);
	const [method, setMethod] = useState(null);
	const [schedule, setschedule] = useState(null);

	const handleMethod = (method, schedule) => {
		setMethod(method);
		handleOpen();
		setschedule(schedule);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={css.Movie}>
			<div className={css.Header}>
				<span>Үзвэрийн мэдээлэл</span>
				<Button
					variant="contained"
					color="primary"
					onClick={() => handleMethod("POST")}
				>
					Хуваарь нэмэх
				</Button>
			</div>

			<div className={css.Table}>
				<TableContainer component={Paper}>
					<Table aria-label="simple table" size="small">
						<TableHead>
							<TableRow>
								<TableCell align="center">№</TableCell>
								<TableCell align="center">Киноны нэр</TableCell>
								<TableCell align="center">Эхлэх хугацаа</TableCell>
								<TableCell align="center">Дуусах хугацаа</TableCell>
								<TableCell align="center">Үнэ /том хүн/</TableCell>
								<TableCell align="center">Салбар </TableCell>
								<TableCell align="center">Ажилтан</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{schedules.map((schedule, i) => {
								return (
									<TableRow key={schedule._id}>
										<TableCell component="th" scope="row">
											{pagination.start + i}
										</TableCell>
										<TableCell align="center">
											{schedule.movieId !== null
												? schedule.movieId.movName
												: " "}
										</TableCell>
										<TableCell align="center">
											{schedule.startTime.slice(5, 16).replace("T", " ")}
										</TableCell>
										<TableCell align="center">
											{schedule.endTime.slice(5, 16).replace("T", " ")}
										</TableCell>
										<TableCell align="center">
											{schedule.priceAdults} ₮ - {schedule.priceChild} ₮
										</TableCell>
										<TableCell align="center">{schedule.branch}</TableCell>
										<TableCell align="center">
											{schedule.staffId !== null ? schedule.staffId.fName : " "}
										</TableCell>
										<TableCell align="right">
											<div
												style={{ height: "10px", cursor: "pointer" }}
												onClick={() => handleMethod("PUT", schedule)}
											>
												<UpdateIcon fontSize="small" />
											</div>
										</TableCell>
										<TableCell align="right">
											<div
												onClick={() => deleteItem(schedule._id)}
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
			<MyModal
				schedule={schedule}
				method={method}
				loadschedules={loadschedules}
				alert={enqueueSnackbar}
				open={open}
				handleClose={handleClose}
				model="schedule"
			/>
		</div>
	);
};

export default Schedule;
