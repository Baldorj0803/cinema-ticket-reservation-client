import React, { Component, useState, useEffect } from "react";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import axios from "axios";
import { API } from "../../config";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";

class Ticket extends Component {
	constructor(props) {
		super(props);
		this.state = { time: { m: " ", s: " " }, seconds: 60 * 10 };
		this.timer = 0;
		this.success = false;
		this.countDown = this.countDown.bind(this);
		this.handleTicket = this.handleTicket.bind(this);
		this.loading = false;
	}
	secondsToTime(secs) {
		let divisor_for_minutes = secs % (60 * 60);
		let minutes = Math.floor(divisor_for_minutes / 60);

		let divisor_for_seconds = divisor_for_minutes % 60;
		let seconds = Math.ceil(divisor_for_seconds);

		let obj = {
			m: minutes,
			s: seconds,
		};
		return obj;
	}

	componentDidMount() {
		this.state.success = false;
		if (this.timer == 0 && this.state.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	}
	countDown() {
		let seconds = this.state.seconds - 1;
		this.setState({
			time: this.secondsToTime(seconds),
			seconds: seconds,
		});

		if (seconds == 0) {
			clearInterval(this.timer);
			this.props.enqueueSnackbar("Хугацаа дууссан тул захиалга цуцлагдлаа", {
				variant: "warning",
			});
		}
	}

	componentWillUnmount() {
		if (!this.state.success) {
			this.props.enqueueSnackbar("Захиалга цуцлагдлаа", {
				variant: "warning",
			});
			clearInterval(this.timer);
			let token = localStorage.getItem("t");
			axios
				.delete(`${API}1/orders/${this.props.orderId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log("Захиалга цуцлагдлаа");
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
	}

	handleTicket() {
		let token = localStorage.getItem("t");
		this.setState({ loading: true });
		axios
			.put(
				`${API}1/orders/${this.props.orderId}`,
				{
					scheduleId: this.props.scheduleId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				this.props.enqueueSnackbar("Амжилттай захиалагдлаа", {
					variant: "success",
				});
				this.setState({ loading: false });
				this.state.success = true;
				clearInterval(this.timer);
				this.props.history.push("/my-order");
			})
			.catch((err) => {
				this.setState({ loading: false });
				this.props.enqueueSnackbar(err.response, {
					variant: "error",
				});
			});
	}

	render() {
		const { history } = this.props;
		return (
			<div className={css.Ticket}>
				{this.props.totalPrice && (
					<span>Төлөх дүн:{this.props.totalPrice}</span>
				)}
				{this.state.loading ? (
					<div className={css.loading}>Захиалж байна</div>
				) : (
					<>
						<span>{`${this.state.time.m} : ${this.state.time.s}`}</span>
					</>
				)}

				<div>
					<Button
						variant="contained"
						variant="contained"
						color="inherit"
						onClick={() => this.props.changePage(1)}
					>
						Цуцлах
					</Button>
					<Button
						variant="contained"
						variant="contained"
						color="primary"
						onClick={this.handleTicket}
					>
						Төлбөр төлөх
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderId: state.orderReducer.orderId,
		scheduleId: state.orderReducer.scheduleId,
		totalPrice: state.orderReducer.totalPrice,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (page) => dispatch(actions.changePage(page)),
	};
};

export default withRouter(
	withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Ticket))
);
