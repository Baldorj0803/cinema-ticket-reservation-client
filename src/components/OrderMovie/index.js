import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/orderAction";
import Button from "@material-ui/core/Button";
import { HOST } from "../../config";

const OrderMovie = (props) => {
	return (
		<div>
			{props.movie && (
				<div className={css.OrderMovie}>
					<div className={css.Left}>
						<img src={`${HOST}/static/upload/${props.movie.photo}`} />
					</div>
					<div className={css.Right}>
						<h2>{props.movie.movName}</h2>
						<div>Зохиолч: {props.movie.movAuthor}</div>
						<div>Үргэлжлэх хугацаа: {props.movie.duration}</div>
						<div>Зохиолч: {props.movie.duration}</div>
					</div>
				</div>
			)}
			<div className={css.Footer}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => props.changePage(2)}
				>
					Үргэлжлүүлэх
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		movie: state.orderReducer.movie,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (page) => dispatch(actions.changePage(page)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderMovie);
