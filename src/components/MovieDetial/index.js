import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import Comment from "../Comment";
import { API, HOST } from "../../config";

const MovieDetial = (props) => {
	const [movie, setMovie] = useState({ data: {}, loading: false, error: "" });

	const { movieId } = useParams();
	const [commentShow, setcommentShow] = useState(false);

	useEffect(() => {
		setMovie((prevState) => ({
			...prevState,
			loading: true,
		}));
		axios
			.get(`${API}/movies/${movieId}`)
			.then((movie) => {
				setMovie((prevState) => ({
					...prevState,
					loading: false,
					data: movie.data.data,
				}));
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
		// ageLimit,
		createdDate,
		duration,
		// _id,
		movAuthor,
		movDesc,
		movName,
		photo,
		schedules,
		movGenre,
	} = movie.data;

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
							backgroundImage: `url(${HOST}/static/upload/${photo})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
						}}
					>
						<div className={css.Comment}>
							{commentShow && <Comment movieId={movieId} />}
						</div>
						<button
							className={css.ShowComment}
							onClick={() => setcommentShow(!commentShow)}
						>
							{commentShow ? "Хаах " : "Сэтгэгдэл харах "}
						</button>
					</div>
				</div>
				<div className={css.Right}>
					<div className={css.Title}>
						<span>{movName}</span>
					</div>

					<div className={css.Duration}>
						<span>{createdDate}</span>
						<span>{duration} мин</span>
						<span>{movAuthor}</span>
					</div>
					<div className={css.Category}>
						<span>Төрөл: </span>
						{movGenre &&
							movGenre.map((category) => {
								return <span key={category._id}>{category.name}</span>;
							})}
					</div>
					<div className={css.Description}>
						<span>Тайлбар: {movDesc}</span>
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
