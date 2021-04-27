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

const Movie = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		nextPage: null,
		prevPage: null,
		start: null,
	});
	const [page, setPage] = useState(1);
	const loadMovies = () => {
		setLoading(true);
		axios
			.get(
				`http://localhost:8000/api/v1/movies?limit=10&sort=movName&page=${page}`
			)
			.then((res) => {
				setLoading(false);
				setMovies(res.data.data);
				setPagination(res.data.pagination);
			})
			.catch((err) => {
				setLoading(false);
				setError(err.response.data.error);
			});
	};
	useEffect(() => {
		loadMovies();
	}, [page]);

	const deleteItem = (id) => {
		let token = localStorage.getItem("t");
		axios
			.delete(`http://localhost:8000/api/v1/movies/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				loadMovies();
				enqueueSnackbar("Амжилттай устгалаа", { variant: "success" });
			})
			.catch((err) => {
				console.log(err.response.data.error);
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
												<UpdateIcon fontSize="small" />
											</div>
										</TableCell>
										<TableCell align="center">
											<div
												onClick={() => deleteItem(movie._id)}
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
