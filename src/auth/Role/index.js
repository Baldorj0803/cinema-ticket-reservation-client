import jwt from "jsonwebtoken";

export const role = () => {
	if (localStorage.getItem("t")) {
		let token = localStorage.getItem("t");

		const tokenObj = jwt.verify(token, "17B1NUM0342CINEMATICKETRESERVATION");
		return tokenObj.role;
	} else {
		return false;
	}
};
