const initialState = {
	loading: false,
	order: null,
	error: null,
	schedule: null,
	pageNumber: 1,
	scheduleId: null,
	totalPrice: 0,
	childSeat: 0,
	adultSeat: 0,
	orderId: null,
	ticketEndTime: null,
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
		case "ADD_ORDERID":
			return {
				...state,
				orderId: action.orderId,
			};
		case "CLEAN_STATE":
			return {
				...initialState,
			};
		case "TICKET_END_TIME":
			return {
				...state,
				ticketEndTime: action.ticketEndTime,
			};
		default:
			return state;
	}
};

export default reducer;
