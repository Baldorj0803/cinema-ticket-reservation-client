import React, { useState } from "react";
import css from "./style.module.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/signupLoginActions";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
const Signup = (props) => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		againPassword: "",
		error: "",
	});

	const signup = () => {
		if (
			form.password &&
			form.againPassword &&
			form.password === form.againPassword
		) {
			props.signUp(form.username, form.email, form.password);
		} else {
			setForm({ ...form, error: "Нууц үг тохирохгүй байна" });
		}
	};
	const handleSumbit = (e) => {
		e.preventDefault();
		signup();
	};
	const handleChange = (name) => (event) => {
		setForm({ ...form, [name]: event.target.value, error: "" });
	};

	return (
		<div className={css.Signup}>
			{props.userId && <Redirect to="/" />}

			<div onSubmit={handleSumbit} className={css.login}>
				<form className={css.form}>
					<h2>Бүртгүүлэх</h2>
					<input
						type="text"
						placeholder="Нэрээ оруулна уу"
						onChange={handleChange("username")}
						required
					/>
					<input
						type="email"
						placeholder="И мэйлээ оруулна уу"
						onChange={handleChange("email")}
						required
					/>
					<input
						type="password"
						placeholder="Нууц үгээ оруулна уу"
						onChange={handleChange("password")}
						required
					/>
					<input
						type="password"
						placeholder="Нууц үгээ дахин оруулна уу"
						onChange={handleChange("againPassword")}
						required
					/>
					<input type="submit" value="Бүртгүүлэх" className={css.submit} />
					{props.error && <Alert severity="error">{props.error}</Alert>}
					{form.error && <Alert severity="error">{form.error}</Alert>}
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.signupLoginReducer.data,
		loading: state.signupLoginReducer.loading1,
		error: state.signupLoginReducer.error1,
		userId: state.signupLoginReducer.userId,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (name, email, password) =>
			dispatch(actions.signUp(name, email, password)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
