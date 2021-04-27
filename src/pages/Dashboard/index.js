import React, { useState } from "react";
import css from "./style.module.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Movie from "../../dashboard/Movie";
import Schedule from "../../dashboard/Schedule";
import Order from "../../dashboard/Order";
const Dashboard = () => {
	const [page, setPage] = useState(1);
	return (
		<div className={css.Main}>
			<div className={css.Dashboard}>
				<div className={css.Left}>
					<div
						style={{ backgroundColor: page === 1 ? "#d6dbdf" : "#aeb6bf" }}
						onClick={() => setPage(1)}
					>
						<span>Үзвэр</span>
						<KeyboardArrowRightIcon />
					</div>
					<div
						style={{ backgroundColor: page === 2 ? "#d6dbdf" : "#aeb6bf" }}
						onClick={() => setPage(2)}
					>
						<span>Хуваарь</span>
						<KeyboardArrowRightIcon />
					</div>
					<div
						style={{ backgroundColor: page === 3 ? "#d6dbdf" : "#aeb6bf" }}
						onClick={() => setPage(3)}
					>
						<span>Захиалга</span>
						<KeyboardArrowRightIcon />
					</div>
				</div>
				<div className={css.Right}>
					{page === 1 && <Movie />}
					{page === 2 && <Schedule />}
					{page === 3 && <Order />}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
