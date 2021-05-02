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
		// props.cleanState();
		props.loadSchedule(props.scheduleId);
		return () => {
			props.cleanState();
			props.changePage(1);
		};
	}, []);
	const movie = props.schedule ? props.schedule.movieId : null;
	const startTime = props.schedule ? props.schedule.startTime : null;
	const branch = props.schedule ? props.schedule.branch : null;
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
							{!props.loading && props.scheduleId && props.pageNumber === 1 && (
								<SeatCount />
							)}
							{props.scheduleId && props.pageNumber === 2 && <Seats />}
							{props.scheduleId && props.pageNumber === 3 && <Ticket />}
						</>
					)}
				</div>
				<div className={css.right}>
					{!props.loading && (
						<>
							<span>Таны захиалга</span>
							<div>
								<span className={css.Title}>Кино:</span>
								<span className={css.Content}>
									{movie !== null ? movie.movName : null}
								</span>
							</div>
							<div>
								<span className={css.Title}>Хэзээ:</span>
								<span className={css.Content}>
									{startTime !== null
										? startTime.slice(5, 16).replace("T", " ")
										: null}
								</span>
							</div>
							<div>
								<span className={css.Title}>Хаана:</span>
								<span className={css.Content}>
									{branch !== null ? branch : null}
								</span>
							</div>
							{props.adultSeat > 0 && (
								<>
									<div>
										<span className={css.Title}>Суудлын тоо /Том хүн/:</span>
										<span className={css.Content}>
											{props.adultSeat ? props.adultSeat : null}
										</span>
									</div>
								</>
							)}
							{props.childSeat > 0 && (
								<>
									<div>
										<span className={css.Title}>Суудлын тоо /Хүүхэд/:</span>
										<span className={css.Content}>
											{props.childSeat ? props.childSeat : null}
										</span>
									</div>
								</>
							)}
							{props.totalPrice > 0 && (
								<>
									<div>
										<span className={css.Title}>Нийт үнэ:</span>
										<span className={css.Content}>
											{props.totalPrice ? props.totalPrice : null}
										</span>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		// movie: state.orderReducer.movie,
		pageNumber: state.orderReducer.pageNumber,
		loading: state.orderReducer.loading,
		// order: state.orderReducer.order,
		error: state.orderReducer.error,
		schedule: state.orderReducer.schedule,
		// seats: state.orderReducer.seats,
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
