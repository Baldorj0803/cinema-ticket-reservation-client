import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderAction";
import { HOST } from "../../config";
import { useSnackbar } from "notistack";
const Card = (props) => {
	const {
		_id,
		photo,
		schedules,
		// ageLimit,
		// createdDate,
		// duration,
		// movAuthor,
		// movDesc,
		// movGenre,
		// movName,
	} = props.movie;
	const { enqueueSnackbar } = useSnackbar();

	const history = useHistory();
	const handleRoute = (id) => {
		if (props.userId) {
			props.addScheduleId(id);
			history.replace("/order");
		} else {
			enqueueSnackbar(`Та нэвтрэнэ үү `, {
				variant: "info",
			});
		}
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
	const [booking, setBooking] = useState("none");

	const handleBook = () => {
		booking === "none" ? setBooking("block") : setBooking("none");
	};

	return (
		<div
			className={css.Card}
			style={{
				backgroundImage: photo ? `url(${HOST}static/upload/${photo})` : "none",
			}}
		>
			<div className={css.Schedule} style={{ display: `${booking}` }}>
				{schedules &&
					schedules.map((schedule, i) => {
						let date = stringToDate(schedule.startTime);
						return (
							<div key={i}>
								<span>{schedule.branch.branchName}</span>
								<button onClick={() => handleRoute(schedule._id)}>
									<span>{date[0]}</span>
									<span>{date[1]}</span>
								</button>
							</div>
						);
					})}
			</div>
			<div className={css.Footer}>
				{schedules && (
					<button onClick={() => handleBook()} className={css.Link} to="/order">
						<span>Захиалах</span>
					</button>
				)}
				<Link to={`/movies/${_id}`} className={css.Link}>
					<span>Дэлгэрэнгүй</span>
				</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);
