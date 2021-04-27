const initialState = {
	loading: false,
	loading1: false,
	data: [],
	role: "",
	error: "",
	error1: "",
	userId: "",
	token: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SIGNUP_START":
			return {
				...state,
				loading1: true,
			};
		case "SIGNUP_SUCCESS":
			return {
				...state,
				// data: action.data,
				// role: action.role,
				token: action.token,
				userId: action.userId,
				loading1: false,
			};
		case "SIGNUP_ERROR":
			return {
				...state,
				error1: action.error1,
				loading1: false,
			};
		case "LOGIN_START":
			return {
				...state,
				loading: true,
			};
		case "LOGIN_SUCCESS":
			return {
				...state,
				token: action.token,
				userId: action.userId,
				loading: false,
				// data: action.data,
				// userId: action.data.data._id,
			};

		case "LOGIN_ERROR":
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case "LOGOUT":
			return {
				...state,
				token: null,
				userId: null,
				role: null,
				data: null,
				error: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;
