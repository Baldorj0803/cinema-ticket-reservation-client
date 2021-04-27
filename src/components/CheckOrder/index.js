import React from "react";
import css from "./style.module.css";
import * as actions from "../../redux/actions/orderAction";
import { connect } from "react-redux";

const CheckOrder = (props) => {
	return (
		<div>
			<h3>Та имэйл ээ оруулна уу</h3>
			<div>
				<input placeholder="Та имэйлээ оруулна уу" />
			</div>
			<div className={css.Footer}>
				<button
					onClick={() => {
						props.changePage(3);
					}}
				>
					Буцах
				</button>
				<button
					onClick={() => {
						props.changePage(5);
					}}
				>
					Үргэлжлүүлэх
				</button>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePage: (page) => dispatch(actions.changePage(page)),
	};
};

export default connect(null, mapDispatchToProps)(CheckOrder);
