import React, { useEffect } from "react";
import css from "./style.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../redux/actions/orderAction";
import SeatCount from "../../components/SeatCount";
import Seats from "../../components/Seats";
import Ticket from "../../components/Ticket";
import Spinner from "../../components/Spinner";
import TheatersIcon from "@material-ui/icons/Theaters";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PaymentIcon from "@material-ui/icons/Payment";

const Order = (props) => {
	useEffect(() => {
		props.cleanState();
		props.loadSchedule(props.scheduleId);
		return () => {
			props.changePage(1);
		};
	}, []);
	return (
		<div className={css.Order}>
			{!props.scheduleId && <Redirect to="/movies" />}
			<div>
				<div className={css.left}>
					<div
						className={css.item}
						style={{ backgroundColor: "rgb(0, 187, 56)", border: "none" }}
					>
						<TheatersIcon htmlColor="#000000" />
					</div>
					<div className={css.arrowDown} />
					<div
						className={css.item}
						style={{
							backgroundColor: props.pageNumber > 1 ? "rgb(0, 187, 56)" : null,
							border: props.pageNumber > 1 ? "none" : null,
						}}
					>
						<FormatListNumberedIcon />
					</div>
					<div className={css.arrowDown} />
					<div
						className={css.item}
						style={{
							backgroundColor: props.pageNumber > 2 ? "rgb(0, 187, 56)" : null,
							border: props.pageNumber > 2 ? "none" : null,
						}}
					>
						<EventSeatIcon />
					</div>
					<div className={css.arrowDown} />
					<div className={css.item}>
						<PaymentIcon />
					</div>
				</div>
				<div className={css.center}>
					{props.loading ? (
						<Spinner />
					) : (
						<>
							{props.scheduleId && props.pageNumber === 1 && <SeatCount />}
							{props.pageNumber === 2 && <Seats />}
							{props.pageNumber === 3 && <Ticket />}
						</>
					)}
				</div>
				<div className={css.right}>
					<span>Таны захиалга</span>
					<div>
						Кино :
						{JSON.stringify(props.movie !== null ? props.movie.movName : "")}
					</div>
					<div>
						Хэзээ:
						{JSON.stringify(
							props.schedule !== null ? props.schedule.startTime : ""
						)
							.slice(6, 17)
							.replace("T", " ")}
					</div>
					<div>
						Хаана:
						{JSON.stringify(
							props.schedule !== null ? props.schedule.branch : ""
						)}
					</div>
					<div>Нийт үнэ :{JSON.stringify(props.totalPrice)}</div>
					<div>Хүүхэд :{JSON.stringify(props.childSeat)}</div>
					<div>Том хүн :{JSON.stringify(props.adultSeat)}</div>
					<div>Суудал :{JSON.stringify(props.adultSeat + props.childSeat)}</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		movie: state.orderReducer.movie,
		pageNumber: state.orderReducer.pageNumber,
		loading: state.orderReducer.loading,
		order: state.orderReducer.order,
		error: state.orderReducer.error,
		schedule: state.orderReducer.schedule,
		seats: state.orderReducer.seats,
		scheduleId: state.orderReducer.scheduleId,
		totalPrice: state.orderReducer.totalPrice,
		childSeat: state.orderReducer.childSeat,
		adultSeat: state.orderReducer.adultSeat,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadSchedule: (schId) => dispatch(actions.loadSchedule(schId)),
		changePage: (page) => dispatch(actions.changePage(page)),
		cleanState: () => dispatch(actions.cleanState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
