import axios from "axios";
import { API } from "../../config";

export const signUp = (name, email, password) => {
	return function (dispatch) {
		dispatch(signupStart());

		const data = {
			name,
			email,
			password,
		};

		const headers = {
			"Content-type": "application/json",
			Accept: "application/json",
		};
		axios
			.post(`${API}/users`, data, { headers })
			.then((res) => {
				//locas storage ruuu hadgalah
				const token = res.data.token;
				const userId = res.data.data._id;
				localStorage.setItem("t", token);
				localStorage.setItem("id", userId);
				dispatch(signupSuccess(token, userId));
			})
			.catch((err) => {
				dispatch(signupError(err.response.data.error));
			});
	};
};
export const signupStart = () => {
	return {
		type: "SIGNUP_START",
	};
};
export const signupSuccess = (token, userId) => {
	return {
		type: "SIGNUP_SUCCESS",
		token,
		userId,
	};
};
export const signupError = (error) => {
	return {
		type: "SIGNUP_ERROR",
		error1: error,
	};
};
export const login = (email, password) => {
	return function (dispatch) {
		dispatch(loginStart());

		const data = {
			email,
			password,
		};

		const headers = {
			"Content-type": "application/json",
			Accept: "application/json",
		};
		axios
			.post(`${API}/login`, data, { headers })
			.then((res) => {
				//locas storage ruuu hadgalah
				const token = res.data.token;
				const userId = res.data.data._id;
				localStorage.setItem("t", token);
				localStorage.setItem("id", userId);
				localStorage.setItem("user", res.data.data);
				dispatch(loginSuccess(token, userId));
			})
			.catch((err) => {
				dispatch(loginError(err.response.data.error));
			});
	};
};
export const loginStart = () => {
	return {
		type: "LOGIN_START",
	};
};
export const loginSuccess = (token, userId) => {
	// let role = data.data.role;
	// delete data.data["password"];
	// delete data.data["role"];

	return {
		type: "LOGIN_SUCCESS",
		// data,
		// role,
		token,
		userId,
	};
};
export const loginError = (error) => {
	return {
		type: "LOGIN_ERROR",
		error,
	};
};

export const logout = () => {
	localStorage.removeItem("t");
	localStorage.removeItem("id");
	return {
		type: "LOGOUT",
	};
};
