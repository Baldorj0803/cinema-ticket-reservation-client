import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config";

export const role = () => {
	if (localStorage.getItem("t")) {
		let token = localStorage.getItem("t");

		const tokenObj = jwt.verify(token, TOKEN_SECRET);
		return tokenObj.role;
	} else {
		return false;
	}
};
