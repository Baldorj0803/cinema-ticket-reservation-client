import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../Spinner";
import Button from "@material-ui/core/Button";
const Seats = (props) => {
	let seats = [];
	const [ordered, setOrdered] = useState([]);

	const [loading, setloading] = useState(false);
	const [loadingOrder, setloadingOrder] = useState(false);

	const totalSeat = props.childSeat + props.adultSeat;

	const order = () => {
		if (seats.length !== totalSeat || seats.length === 0) {
			alert("Суудалаа гүйцэт сонгоно уу" + seats.length + "-" + totalSeat);
		} else {
			let token = localStorage.getItem("t");
			setloading(true);
			axios
				.post(
					"http://localhost:8000/api/v1/orders",
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
					props.addOrderId(res.data.data._id);
					setloading(false);
					props.changePage(3);
				})
				.catch((err) => {
					// setError(err.response);
					alert(err.response.data.error);
					console.log(err.response.data.error);
					setloading(false);
					seats = [];
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
				alert("Дахин сонгох боломжгүй" + seats.length + "-" + totalSeat);
			} else {
				seats.push({ row: r, column: c });
				e.target.style.backgroundColor = "rgb(137, 255, 77)";
			}
		} else {
			e.target.style.backgroundColor = "rgb(68, 68, 81)";
			seats = seats.filter((seat) => seat.row !== r || seat.column !== c);
		}
		// console.log(val.value);
		console.log(seats);
	};
	const loadOrder = () => {
		setloadingOrder(true);
		axios({
			method: "get",
			url: `http://localhost:8000/api/v1/schedules/${props.scheduleId}`,
		})
			.then((res) => {
				{
					res.data.data.orders.length > 0 &&
						res.data.data.orders.map((order) =>
							setOrdered((prevState) => [...prevState, ...order.seats])
						);
				}
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
			{/* <div>{error && <div style={{ color: "red" }}>{error}</div>}</div> */}
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
									for (let i = 0; i < props.row; i++) {
										let c = [];
										for (let j = 0; j < props.column; j++) {
											let val = i + 1 + "-" + (j + 1);
											let color = "#444451";
											let disable = false;
											ordered.map((order) => {
												if (order.row === i + 1 && order.column === j + 1) {
													color = "#FF4848 ";
													disable = true;
												}
											});
											c.push(
												<button
													key={j}
													className={val}
													value={val}
													disabled={disable}
													style={{ backgroundColor: color }}
													// onClick={() => handleSeat(j, i)}
													onClick={handleS}
												/>
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
					</div>

					<div className={css.Footer}>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => {
								props.handleTotalPrice(0, 0, 0, 1);
							}}
						>
							Буцах
						</Button>

						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								seats.length !== totalSeat
									? alert("Суудалаа гүйцэт сонгоно уу")
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
		row: state.orderReducer.row,
		column: state.orderReducer.column,
		childSeat: state.orderReducer.childSeat,
		adultSeat: state.orderReducer.adultSeat,
		scheduleId: state.orderReducer.scheduleId,
		ordered: state.orderReducer.ordered,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (page) => dispatch(actions.changePage(page)),
		handleTotalPrice: (totalPrice, childSeat, adultSeat, page) =>
			dispatch(
				actions.handleTotalPrice(totalPrice, childSeat, adultSeat, page)
			),
		addOrderId: (orderId) => {
			dispatch(actions.addOrderId(orderId));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Seats);
