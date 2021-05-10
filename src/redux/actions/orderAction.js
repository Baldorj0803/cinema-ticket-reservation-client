import axios from "axios";
import { API } from "../../config";

export const addScheduleId = (scheduleId) => {
	return {
		type: "ADD_SCHEDULEID_ORDER",
		scheduleId,
	};
};

export const loadSchedule = (id) => {
	return function (dispatch) {
		dispatch(loadScheduleStart());

		axios({
			method: "get",
			url: `${API}/schedules/${id}`,
		})
			.then((res) => {
				console.log("tatsan schedule", res.data.data);
				dispatch(loadScheduleSuccess(res.data.data));
			})
			.catch((err) => {
				dispatch(loadScheduleError(err.response.data.error));
			});
	};
};

export const loadScheduleStart = () => {
	return {
		type: "LOAD_SCHEDULE_START",
	};
};

export const loadScheduleSuccess = (schedule) => {
	return {
		type: "LOAD_SCHEDULE_SUCCESS",
		schedule,
	};
};
export const loadScheduleError = (error) => {
	return {
		type: "LOAD_SCHEDULE_ERROR",
		error,
	};
};

export const changePage = (page) => {
	return {
		type: "CHANGE_PAGE",
		page,
	};
};
export const handleTotalPrice = (childSeat, adultSeat) => {
	return {
		type: "TOTAL_PRICE",
		childSeat,
		adultSeat,
	};
};

export const cleanState = () => {
	return {
		type: "CLEAN_STATE",
	};
};

export const addOrderId = (orderId) => {
	return {
		type: "ADD_ORDERID",
		orderId,
	};
};
export const addticketEndTime = (ticketEndTime) => {
	return {
		type: "TICKET_END_TIME",
		ticketEndTime,
	};
};
