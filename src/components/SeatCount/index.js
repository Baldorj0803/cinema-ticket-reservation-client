import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useSnackbar } from "notistack";
import { HOST, API } from "../../config";
import axios from "axios";

const SeatCount = (props) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [remainSeats, setRemainSeats] = useState(0);
	const [loading, setloading] = useState("");
	const [error, setError] = useState("");
	const movie = props.schedule ? props.schedule.movieId : null;
	const priceChild = props.schedule ? props.schedule.priceChild : null;
	const priceAdults = props.schedule ? props.schedule.priceAdults : null;
	const adultSeat = props.adultSeat;
	const childSeat = props.childSeat;
	const hall = props.schedule ? props.schedule.hallId : null;
	const totalSeat = hall !== null ? hall.row * hall.column : null;

	useEffect(() => {
		setloading(true);
		axios({
			method: "get",
			url: `${API}/schedules/${props.scheduleId}`,
		})
			.then((res) => {
				let orderCall = [];
				{
					res.data.data.orders.length > 0 &&
						res.data.data.orders.map((order) => orderCall.push(...order.seats));
				}
				setRemainSeats(totalSeat - orderCall.length);
				setloading(false);
			})
			.catch((err) => {
				setloading(false);
				setError(err.response.data.error);
				enqueueSnackbar(error, { variant: "error" });
			});
	}, []);

	const handleSeatAdults = (value) => {
		if (
			adultSeat + childSeat < remainSeats &&
			adultSeat + childSeat + value <= 10
		) {
			if (adultSeat + value >= 0) {
				let newSeat = adultSeat + value;
				props.handleTotalPrice(childSeat, newSeat);
			}
		} else enqueueSnackbar("Суудал дүүрсэн байна", { variant: "warning" });
	};
	const handleSeatChild = (value) => {
		if (
			adultSeat + childSeat < remainSeats &&
			adultSeat + childSeat + value <= 10
		) {
			if (childSeat + value >= 0) {
				let newSeat = childSeat + value;
				props.handleTotalPrice(newSeat, adultSeat);
			}
		} else enqueueSnackbar("Суудал дүүрсэн байна", { variant: "warning" });
	};

	return (
		<div className={css.SeatCount}>
			<div className={css.Left}>
				{movie !== null && (
					<div className={css.Movie}>
						<img src={`${HOST}static/upload/${movie.photo}`} />
					</div>
				)}
			</div>
			<div className={css.Right}>
				<div className={css.Top}>
					<h2 className={css.Title}>{movie === null ? "" : movie.movName}</h2>
					<div style={{ fontSize: "30px" }}>Нийт үнэ:{props.totalPrice}</div>
					<div style={{ fontSize: "20px" }}>Том хүн:{props.adultSeat}</div>
					{!loading && (
						<div className={css.Btn}>
							<button
								className={css.Remove1}
								onClick={() => handleSeatAdults(-1)}
							>
								<RemoveIcon />
							</button>
							<div>{priceAdults}</div>
							<button className={css.Add1} onClick={() => handleSeatAdults(1)}>
								<AddIcon />
							</button>
						</div>
					)}

					<div style={{ fontSize: "20px" }}>Хүүхэд:{props.childSeat}</div>
					{!loading && (
						<div className={css.Btn}>
							<button
								className={css.Remove2}
								onClick={() => handleSeatChild(-1)}
							>
								<RemoveIcon />
							</button>
							<div>{priceChild}</div>
							<button className={css.Add2} onClick={() => handleSeatChild(1)}>
								<AddIcon />
							</button>
						</div>
					)}
				</div>
				<div className={css.Footer}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							if (childSeat > 0 || adultSeat > 0) {
								props.changePage(2);
							} else {
								enqueueSnackbar("Суудлаа сонгоно уу", { variant: "warning" });
							}
						}}
					>
						Үргэлжлүүлэх
					</Button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		schedule: state.orderReducer.schedule,
		totalPrice: state.orderReducer.totalPrice,
		adultSeat: state.orderReducer.adultSeat,
		childSeat: state.orderReducer.childSeat,
		scheduleId: state.orderReducer.scheduleId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (page) => dispatch(actions.changePage(page)),
		handleTotalPrice: (childSeat, adultSeat) =>
			dispatch(actions.handleTotalPrice(childSeat, adultSeat)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatCount);
