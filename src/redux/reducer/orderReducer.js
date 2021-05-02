const initialState = {
	loading: false,
	order: null,
	error: null,

	// movie: null,
	schedule: null,
	pageNumber: 1,
	scheduleId: null,
	totalPrice: 0,
	childSeat: 0,
	adultSeat: 0,
	// seats: [],
	// priceAdults: 0,
	// priceChild: 0,
	// row: 0,
	// column: 0,
	// orderId: null,
	// ordered: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ORDER_START":
			return {
				...state,
				loading: true,
			};
		case "ORDER_SUCCESS":
			return {
				...state,
				loading: false,
			};
		case "ORDER_ERROR":
			return {
				...state,
				loading: false,
			};
		case "ADD_SCHEDULEID_ORDER":
			return {
				...state,
				scheduleId: action.scheduleId,
			};
		case "LOAD_SCHEDULE_START":
			return {
				...state,
				loading: true,
			};
		case "LOAD_SCHEDULE_SUCCESS":
			return {
				...state,
				loading: false,
				schedule: action.schedule,
				// movie: action.schedule.movieId,
				// priceAdults: action.schedule.priceAdults,
				// priceChild: action.schedule.priceChild,
				// row: action.schedule.hallId.row,
				// column: action.schedule.hallId.column,
				// ordered: action.schedule.orders,
			};
		case "LOAD_SCHEDULE_ERROR":
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case "CHANGE_PAGE":
			return {
				...state,
				pageNumber: action.page,
			};
		case "TOTAL_PRICE":
			return {
				...state,
				totalPrice:
					action.childSeat * state.schedule.priceChild +
					action.adultSeat * state.schedule.priceAdults,
				childSeat: action.childSeat,
				adultSeat: action.adultSeat,
			};
		case "CLEAN_STATE":
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default reducer;
