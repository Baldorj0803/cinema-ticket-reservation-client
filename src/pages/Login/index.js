import React, { useState } from "react";
import css from "./style.module.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/signupLoginActions";
import { Redirect } from "react-router";
import Alert from "@material-ui/lab/Alert";
const Login = (props) => {
	const [form, setForm] = useState({ email: "", password: "" });

	const handleSumbit = (e) => {
		e.preventDefault();
		props.login(form.email, form.password);
	};

	const handleChange = (name) => (event) => {
		setForm({ ...form, [name]: event.target.value });
	};

	return (
		<div className={css.Login}>
			{props.userId && <Redirect to="/" />}

			<div onSubmit={handleSumbit} className={css.login}>
				<form className={css.form}>
					<h2>Нэвтрэх</h2>
					<input
						type="email"
						placeholder="И мэйлээ оруулна уу"
						onChange={handleChange("email")}
						value={form.email}
						required
					/>
					<input
						type="password"
						placeholder="Нууц үгээ оруулна уу"
						onChange={handleChange("password")}
						value={form.password}
						required
					/>
					<input type="submit" value="Нэвтрэх" className={css.submit} />
					{props.error && <Alert severity="error">{props.error}</Alert>}
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.signupLoginReducer.data,
		loading: state.signupLoginReducer.loading,
		error: state.signupLoginReducer.error,
		userId: state.signupLoginReducer.userId,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(actions.login(email, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
