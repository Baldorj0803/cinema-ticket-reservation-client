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
import axios from "axios";
import { useSnackbar } from "notistack";
import MyModal from "../MyModal";
import { API } from "../../config";
import CreateIcon from "@material-ui/icons/Create";

const Movie = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [movies, setMovies] = useState([]);
	const [pagination, setPagination] = useState({
		nextPage: null,
		prevPage: null,
		start: null,
	});
	const [page, setPage] = useState(1);
	const loadMovies = () => {
		axios
			.get(`${API}/movies?limit=10&sort=movName&page=${page}`)
			.then((res) => {
				console.log(res.data);
				setMovies(res.data.data);
				setPagination(res.data.pagination);
			})
			.catch((err) => {
				enqueueSnackbar(err.response.data.error, { variant: "error" });
			});
	};
	useEffect(() => {
		loadMovies();
	}, [page]);

	const deleteItem = (id) => {
		let token = localStorage.getItem("t");
		axios
			.delete(`${API}/movies/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				enqueueSnackbar("Амжилттай устгалаа", { variant: "success" });
				loadMovies();
			})
			.catch((err) => {
				enqueueSnackbar(err.response.data.error, { variant: "error" });
			});
	};
	const [open, setOpen] = useState(false);
	const [method, setMethod] = useState(null);
	const [movie, setMovie] = useState(null);

	const handleMethod = (method, movie) => {
		setMethod(method);
		handleOpen();
		setMovie(movie);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const averageRate = (value, count) => {
		if (value < 1 || count < 1) {
			return 0;
		} else {
			return Number.parseFloat(value / count).toFixed(1);
		}
	};
	return (
		<div className={css.Movie}>
			<div className={css.Header}>
				<span>Киноны мэдээлэл</span>
				<Button
					variant="contained"
					color="primary"
					onClick={() => handleMethod("POST")}
				>
					Кино нэмэх
				</Button>
			</div>

			<div className={css.Table}>
				<TableContainer component={Paper}>
					<Table aria-label="simple table" size="small">
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell>Киноны нэр</TableCell>
								<TableCell align="center">Зохиолч</TableCell>
								<TableCell align="center">Үүссэн он</TableCell>
								<TableCell align="center">Үргэлжлэх хугацаа</TableCell>
								<TableCell align="center">Насаны хязгаар</TableCell>
								<TableCell align="center">Үнэлгээ</TableCell>
								<TableCell align="center">Хуваарийн тоо</TableCell>
								<TableCell align="center">Зураг</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{movies.map((movie, i) => {
								return (
									<TableRow key={movie._id}>
										<TableCell component="th" scope="row">
											{pagination.start + i}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{movie.movName}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{movie.movAuthor}
										</TableCell>
										<TableCell align="center">{movie.createdDate}</TableCell>
										<TableCell align="center">{movie.duration} мин</TableCell>
										<TableCell align="center">{movie.ageLimit} </TableCell>
										<TableCell align="center">
											{averageRate(movie.rateValue, movie.rateCount)}
										</TableCell>
										<TableCell align="center">
											{movie.schedules.length}
										</TableCell>
										<TableCell align="center">
											<a
												href={`http://localhost:8000/static/upload/${movie.photo}`}
												target="_blank"
											>
												Зураг
											</a>
										</TableCell>
										<TableCell align="center">
											<div
												style={{ height: "10px", cursor: "pointer" }}
												onClick={() => handleMethod("PUT", movie)}
											>
												<CreateIcon fontSize="small" htmlColor="blue" />
											</div>
										</TableCell>
										<TableCell align="center">
											<div
												onClick={() => deleteItem(movie._id)}
												style={{ height: "10px", cursor: "pointer" }}
											>
												<DeleteOutlineIcon fontSize="small" htmlColor="red" />
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
				{pagination.prevPage ? (
					<div>Хуудас {pagination.prevPage + 1}</div>
				) : pagination.nextPage ? (
					<div>Хуудас {pagination.nextPage - 1}</div>
				) : (
					""
				)}
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
				movie={movie}
				method={method}
				loadMovies={loadMovies}
				alert={enqueueSnackbar}
				open={open}
				handleClose={handleClose}
				model="movie"
			/>
		</div>
	);
};

export default Movie;
