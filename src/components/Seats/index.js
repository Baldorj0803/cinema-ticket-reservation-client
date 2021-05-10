import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../Spinner";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import { API } from "../../config";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import WarningIcon from "@material-ui/icons/Warning";

const Seats = (props) => {
	const row = props.schedule.hadllId !== null ? props.schedule.hallId.row : 0;
	const column =
		props.schedule.hadllId !== null ? props.schedule.hallId.column : 0;
	const [seats, setSeats] = useState([]);
	const [ordered, setOrdered] = useState([]);
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setloading] = useState(false);
	const [loadingOrder, setloadingOrder] = useState(false);

	const totalSeat = props.childSeat + props.adultSeat;

	const order = () => {
		if (seats.length !== totalSeat || seats.length === 0) {
			enqueueSnackbar("Суудлаа гүйцэт сонгоно уу", { variant: "warning" });
		} else {
			let token = localStorage.getItem("t");
			axios
				.post(
					`${API}/orders`,
					{
						scheduleId: props.scheduleId,
						seats: seats,
						child: props.childSeat,
						adult: props.adultSeat,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => {
					let d = new Date(res.data.data.date);
					props.addticketEndTime(d);
					props.addOrderId(res.data.data._id);
					enqueueSnackbar("Амжилттай Сонгогдлоо", { variant: "success" });
					props.changePage(3);
				})
				.catch((err) => {
					loadOrder();
				});
		}
	};

	const handleS = (e) => {
		let val = e.target;
		let seat = val.value.split("-");
		let r = parseInt(seat[0]);
		let c = parseInt(seat[1]);

		if (e.target.style.backgroundColor === "rgb(68, 68, 81)") {
			if (seats.length === totalSeat) {
				enqueueSnackbar("Дахин сонгох боломжгүй", { variant: "error" });
			} else {
				setSeats((prevState) => [...prevState, { row: r, column: c }]);
				e.target.style.backgroundColor = "rgb(137, 255, 77)";
			}
		} else {
			e.target.style.backgroundColor = "rgb(68, 68, 81)";
			let st = seats.filter((seat) => seat.row !== r || seat.column !== c);
			setSeats([...st]);
		}
	};

	useEffect(() => {
		let duplicate = "",
			notDuplicate = [];
		if (seats.length > 0 && ordered.length > 0) {
			seats.map((seat) => {
				let idx = 0; //Herew ene utga oorchlogdwol dawhatssan
				ordered.map((order) => {
					if (order.row === seat.row && order.column === seat.column) {
						duplicate = duplicate + order.row + "-" + order.column + " ";
						++idx;
					}
					return;
				});
				if (idx === 0) notDuplicate.push(seat);
				return;
			});
			setSeats([...notDuplicate]);
			if (duplicate !== "")
				enqueueSnackbar(duplicate + " Суудлууд давхцаж байна", {
					variant: "error",
				});
		}
	}, [ordered]);

	const loadOrder = () => {
		setloadingOrder(true);
		axios({
			method: "get",
			url: `${API}/schedules/${props.scheduleId}`,
		})
			.then((res) => {
				let orderdCall = [];

				res.data.data.orders.length > 0 &&
					res.data.data.orders.map((order) => orderdCall.push(...order.seats));

				//herew vldsen suudal zahailah suudlaas baga baiwal zahialga tsutslagdana
				if (row * column - orderdCall.length < totalSeat) {
					props.handleTotalPrice(0, 0);
					props.changePage(1);
				}
				setOrdered([...orderdCall]);
				setloadingOrder(false);
			})
			.catch((err) => {
				setloadingOrder(false);
				alert(err.response.data.error);
			});
	};
	useEffect(() => {
		loadOrder();
	}, []);

	return (
		<div>
			<div className={css.Hall}>
				<div className={css.left}>
					<div>
						<div className={css.Monitor}>
							<span>Дэлгэц</span>
						</div>
						<div className={css.seats}>
							{loadingOrder ? (
								<Spinner />
							) : (
								(() => {
									let r = [];
									for (let i = 0; i < row; i++) {
										let c = [];
										for (let j = 0; j < column; j++) {
											let val = i + 1 + "-" + (j + 1);
											let color = "rgb(68, 68, 81)";
											let disable = false;
											ordered.map((order) => {
												if (order.row === i + 1 && order.column === j + 1) {
													color = "#FF4848 ";
													disable = true;
												}
											});
											seats.map((seat) => {
												if (seat.row === i + 1 && seat.column === j + 1) {
													color = "rgb(137, 255, 77)";
												}
											});
											c.push(
												<button
													key={j}
													className={val}
													value={val}
													disabled={disable}
													style={{
														backgroundColor: color,
														height: row > 20 || column > 20 ? "10px" : "18px",
														width: row > 20 || column > 20 ? "10px" : "18px",
														margin: row > 20 || column > 20 ? "2px" : "5px",
													}}
													onClick={handleS}
												></button>
											);
										}
										let k = <div key={i}>{c}</div>;
										r.push(k);
									}
									return r;
								})()
							)}
						</div>
					</div>
				</div>
				<div className={css.right}>
					<div className={css.desc}>
						<div>
							<div
								className={css.circle}
								style={{ backgroundColor: "#444451" }}
							/>
							<span>Захиалах боломжтой</span>
						</div>
						<div>
							<div
								className={css.circle}
								style={{ backgroundColor: "#FF4848" }}
							/>
							<span>Захиалгатай</span>
						</div>
						<div>
							<div
								className={css.circle}
								style={{ backgroundColor: "rgb(137, 255, 77)" }}
							/>
							<span>Таны захиалсан</span>
						</div>
						<div className={css.mySeats}>
							<div>
								<div>таны захиалга</div>
								<div style={{ fontSize: "20px" }}>
									{seats.length + "-" + totalSeat}
								</div>

								{seats.length === totalSeat ? (
									<CheckBoxIcon htmlColor="green" />
								) : (
									<WarningIcon htmlColor="yellow" />
								)}
							</div>
						</div>
					</div>

					<div className={css.Footer}>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => {
								props.changePage(1);
							}}
						>
							Буцах
						</Button>

						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								seats.length !== totalSeat
									? enqueueSnackbar("Суудлаа гүйцэт сонгоно уу", {
											variant: "warning",
									  })
									: order();
							}}
						>
							Үргэлжлүүлэх
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		childSeat: state.orderReducer.childSeat,
		adultSeat: state.orderReducer.adultSeat,
		scheduleId: state.orderReducer.scheduleId,
		schedule: state.orderReducer.schedule,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (page) => dispatch(actions.changePage(page)),
		handleTotalPrice: (childSeat, adultSeat) =>
			dispatch(actions.handleTotalPrice(childSeat, adultSeat)),
		addOrderId: (orderId) => dispatch(actions.addOrderId(orderId)),
		addticketEndTime: (date) => dispatch(actions.addticketEndTime(date)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Seats);
