import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import { API, HOST } from "../../config";
import Rating from "@material-ui/lab/Rating";
import { useSnackbar } from "notistack";

const MovieDetial = (props) => {
	const [movie, setMovie] = useState({ loading: false, error: "" });
	const [data, setdata] = useState({});
	const { enqueueSnackbar } = useSnackbar();
	const { movieId } = useParams();
	const [commentShow, setcommentShow] = useState(false);
	const [rated, setRated] = useState(false);
	const [myRating, setmyRating] = useState(0.0);
	const [movieRating, setmovieRating] = useState(0.0);

	useEffect(() => {
		setMovie((prevState) => ({
			...prevState,
			loading: true,
		}));

		let query = `${API}/movies/${movieId}`;
		if (props.userId) query = query + `?userId=${props.userId}`;
		axios
			.get(query)
			.then((movie) => {
				console.log(movie.data);
				setMovie((prevState) => ({
					...prevState,
					loading: false,
				}));
				setdata(movie.data.data);
				let r = averageRate(
					movie.data.data.rateValue,
					movie.data.data.rateCount
				);
				setmovieRating(r);
				let i = FloatToInt(r);
				setmyRating(i);
				setRated(movie.data.rated);
			})
			.catch((err) => {
				setMovie((prevState) => ({
					...prevState,
					loading: false,
					error: err.response.message,
				}));
			});
	}, []);

	const {
		createdDate,
		duration,
		movAuthor,
		movDesc,
		movName,
		photo,
		schedules,
		movGenre,
	} = data;

	const averageRate = (value, count) => {
		if (value < 1 || count < 1) {
			return 0;
		} else {
			return Number.parseFloat(value / count).toFixed(1);
		}
	};
	const FloatToInt = (value) => {
		return Math.round(value);
	};

	const sendRating = (e) => {
		const value = parseInt(e.target.value);
		setmyRating(value);

		let token = localStorage.getItem("t");
		axios
			.post(
				`${API}/movies/${movieId}/rating`,
				{
					rating: value,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setRated(true);
				let r = averageRate(
					res.data.ratedMovie.rateValue,
					res.data.ratedMovie.rateCount
				);
				setmovieRating(r);
				enqueueSnackbar("Баярлалаа", { variant: "success" });
			})
			.catch((err) => {
				enqueueSnackbar(err.response.data.error, { variant: "warning" });
			});
	};
	const stringToDate = (str) => {
		let date = new Date(str);
		date.setHours(date.getHours() - 8);
		let now = new Date();
		let day = date.getMonth() + 1 + " сарын " + date.getDate() + " ";
		if (
			date.getFullYear() === now.getFullYear() &&
			date.getMonth() === now.getMonth()
		) {
			let diff = date.getDay() - now.getDay();
			if (diff === 0) day = "Өнөөдөр ";
			if (diff === 1) day = "Маргааш ";
			if (diff === 2) day = "Нөгөөдөр ";
		}
		let time = str.substr(str.indexOf("T") + 1, 5);
		return [day, time];
	};

	const history = useHistory();
	const handleRoute = (id) => {
		if (props.userId) {
			props.addScheduleId(id);
			history.replace("/order");
		} else {
			history.replace("/login");
		}
	};

	return (
		<div className={css.MovieDetial}>
			<div className={css.Movie}>
				{movie.error && <div>Алдаа гарлаа{movie.error}</div>}
				<div className={css.Left}>
					<div
						className={css.Image}
						style={{
							backgroundImage: `url(${HOST}static/upload/${photo})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
						}}
					></div>
				</div>
				<div className={css.Right}>
					<div className={css.Title}>
						<span>{movName}</span>
					</div>

					<div className={css.Duration}>
						<span>{createdDate}</span>
						<span>{duration} мин</span>
						<span>{movAuthor}</span>

						<span style={{ color: "orange" }}>
							{!movie.loading && movieRating}
						</span>
					</div>
					<div className={css.Category}>
						<span>Төрөл: </span>
						{movGenre &&
							movGenre.map((category) => {
								return <span key={category._id}>{category.name}</span>;
							})}
					</div>
					<div className={css.RateInfo}>
						{props.userId ? (rated ? "" : "Үнэлгээ өгнө үү") : ""}
					</div>
					{!movie.loading && (
						<Rating
							name="customized-10"
							value={myRating}
							max={10}
							className={css.Rating}
							readOnly={rated}
							onChange={(e) => sendRating(e)}
						/>
					)}

					<div className={css.Description}>
						<span>
							<span style={{ color: "black" }}>Тайлбар: </span>
							{movDesc}
						</span>
					</div>

					<div className={css.Schedules}>
						{schedules &&
							schedules.map((schedule) => {
								let date = stringToDate(schedule.startTime);
								return (
									<div key={schedule.id}>
										<span>{schedule.branch}</span>
										<button
											className={css.ticket}
											onClick={() => handleRoute(schedule._id)}
										>
											<span>{date[0]}</span>
											<span>{date[1]}</span>
										</button>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		userId: state.signupLoginReducer.userId,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addScheduleId: (id) => dispatch(actions.addScheduleId(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetial);
