import React, { Component } from "react";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import axios from "axios";
import { API } from "../../config";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
class Ticket extends Component {
	constructor(props) {
		super(props);
		let a = (new Date(this.props.ticketEndTime) - new Date()) / 1000;
		this.state = { time: { m: " ", s: " " }, seconds: a };
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
		this.setState({ success: false });
		if (this.timer === 0 && this.state.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	}
	countDown() {
		let seconds = this.state.seconds - 1;
		this.setState({
			time: this.secondsToTime(seconds),
			seconds: seconds,
		});

		if (seconds <= 1) {
			clearInterval(this.timer);
			this.props.enqueueSnackbar("Хугацаа дууссан тул захиалга цуцлагдлаа", {
				variant: "warning",
			});
			this.props.changePage(1);
		}
	}

	componentWillUnmount() {
		this.props.addticketEndTime(null);
		if (!this.state.success) {
			this.props.enqueueSnackbar("Захиалга цуцлагдлаа", {
				variant: "warning",
			});
			clearInterval(this.timer);
			let token = localStorage.getItem("t");
			axios
				.delete(`${API}/orders/${this.props.orderId}`, {
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
				`${API}/orders/${this.props.orderId}`,
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
		let ddd = new Date(this.props.ticketEndTime);

		return (
			<>
				<span className={css.Timer}>
					{`${this.state.time.m} : ${this.state.time.s}`}
				</span>
				<div className={css.Ticket}>
					{this.props.totalPrice && (
						<span>Төлөх дүн:{this.props.totalPrice}</span>
					)}

					{this.state.loading ? (
						<div className={css.loading}>Захиалж байна</div>
					) : (
						<>
							<Alert severity="warning">
								Та {ddd.toString().slice(16, 25)} цагаас өмнө төлбөрөө төлнө үү
							</Alert>
						</>
					)}
					<div className={css.Footer}>
						<Button
							variant="contained"
							color="inherit"
							onClick={() => this.props.changePage(1)}
						>
							Цуцлах
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={this.handleTicket}
						>
							Төлбөр төлөх
						</Button>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderId: state.orderReducer.orderId,
		scheduleId: state.orderReducer.scheduleId,
		totalPrice: state.orderReducer.totalPrice,
		ticketEndTime: state.orderReducer.ticketEndTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (page) => dispatch(actions.changePage(page)),
		addticketEndTime: (date) => dispatch(actions.addticketEndTime(date)),
	};
};

export default withRouter(
	withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Ticket))
);
