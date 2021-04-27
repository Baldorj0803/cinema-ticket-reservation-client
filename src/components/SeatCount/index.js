import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useSnackbar } from "notistack";

const SeatCount = (props) => {
	const [totalPrice, settotalPrice] = useState(0);
	const [child, setChild] = useState(0);
	const [adult, setAdult] = useState(0);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	useEffect(() => {
		let tot = child * props.priceAdults + adult * props.priceChild;

		settotalPrice(tot);
	}, [child, adult]);

	return (
		<div className={css.SeatCount}>
			<div className={css.Left}>
				{props.movie && (
					<div className={css.Movie}>
						<img
							src={`http://localhost:8000/static/upload/${props.movie.photo}`}
						/>
					</div>
				)}
			</div>
			<div className={css.Right}>
				<div className={css.Top}>
					<h2 className={css.Title}>
						{props.movie === null ? "" : props.movie.movName}
					</h2>
					<div style={{ fontSize: "30px" }}>Нийт үнэ:{totalPrice}</div>
					<div style={{ fontSize: "20px" }}>Том хүн:{adult}</div>
					<div className={css.Btn}>
						<button
							className={css.Remove1}
							onClick={() =>
								setAdult((prevstate) => (prevstate > 0 ? prevstate - 1 : 0))
							}
						>
							<RemoveIcon />
						</button>
						<div>{props.priceAdults}</div>
						<button
							className={css.Add1}
							onClick={() => setAdult((prevstate) => prevstate + 1)}
						>
							<AddIcon />
						</button>
					</div>
					<div style={{ fontSize: "20px" }}>Хүүхэд:{child}</div>
					<div className={css.Btn}>
						<button
							className={css.Remove2}
							onClick={() =>
								setChild((prevstate) => (prevstate > 0 ? prevstate - 1 : 0))
							}
						>
							<RemoveIcon />
						</button>
						<div>{props.priceChild}</div>
						<button
							className={css.Add2}
							onClick={() => setChild((prevstate) => prevstate + 1)}
						>
							<AddIcon />
						</button>
					</div>
				</div>
				<div className={css.Footer}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							if (child > 0 || adult > 0) {
								props.handleTotalPrice(totalPrice, child, adult, 2);
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
		totalPrice: state.orderReducer.totalPrice,
		priceAdults: state.orderReducer.priceAdults,
		priceChild: state.orderReducer.priceChild,
		movie: state.orderReducer.movie,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (page) => dispatch(actions.changePage(page)),
		handleTotalPrice: (totalPrice, childSeat, adultSeat, page) =>
			dispatch(
				actions.handleTotalPrice(totalPrice, childSeat, adultSeat, page)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatCount);
