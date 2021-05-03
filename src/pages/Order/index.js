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
import MovieIcon from "@material-ui/icons/Movie";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import RoomIcon from "@material-ui/icons/Room";
import PersonIcon from "@material-ui/icons/Person";
import CreditCardIcon from "@material-ui/icons/CreditCard";
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
								<div className={css.Icon}>
									<MovieIcon fontSize="large" />
								</div>
								<div className={css.Head}>
									<span className={css.Content}>
										{movie !== null ? movie.movName : null}
									</span>
									<span className={css.Title}>Киноны нэр</span>
								</div>
							</div>
							<div>
								<div className={css.Icon}>
									<AccessTimeIcon fontSize="large" />
								</div>
								<div className={css.Head}>
									<span className={css.Content}>
										{startTime !== null
											? startTime.slice(5, 16).replace("T", " ")
											: null}
									</span>
									<span className={css.Title}>Хэзээ</span>
								</div>
							</div>

							<div>
								<div className={css.Icon}>
									<RoomIcon fontSize="large" />
								</div>
								<div className={css.Head}>
									<span className={css.Content}>
										{branch !== null ? branch : null}
									</span>
									<span className={css.Title}>Хаана</span>
								</div>
							</div>

							{props.adultSeat > 0 && (
								<>
									<div>
										<div className={css.Icon}>
											<PersonIcon fontSize="large" />
										</div>
										<div className={css.Head}>
											<span className={css.Content}>
												{props.adultSeat ? props.adultSeat : null}
											</span>
											<span className={css.Title}>Том хүн</span>
										</div>
									</div>
								</>
							)}

							{props.childSeat > 0 && (
								<>
									<div>
										<div className={css.Icon} style={{ padding: "0 5px" }}>
											<PersonIcon fontSize="medium" />
										</div>
										<div className={css.Head}>
											<span className={css.Content}>
												{props.childSeat ? props.childSeat : null}
											</span>
											<span className={css.Title}>Хүүхэд</span>
										</div>
									</div>
								</>
							)}

							{props.totalPrice > 0 && (
								<>
									<div>
										<div className={css.Icon}>
											<CreditCardIcon fontSize="large" />
										</div>
										<div className={css.Head}>
											<span className={css.Content}>
												{props.totalPrice ? props.totalPrice : null}
											</span>
											<span className={css.Title}>Нийт үнэ</span>
										</div>
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
		pageNumber: state.orderReducer.pageNumber,
		loading: state.orderReducer.loading,
		error: state.orderReducer.error,
		schedule: state.orderReducer.schedule,
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
