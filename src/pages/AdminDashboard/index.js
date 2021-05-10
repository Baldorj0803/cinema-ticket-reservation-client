import React, { useState } from "react";
import css from "./style.module.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PeopleIcon from "@material-ui/icons/People";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import HomeDashboard from "../../admin/Home";
import Branch from "../../admin/Branch";
import Staff from "../../admin/Staff";
import Hall from "../../admin/Hall";

const AdminDashboard = () => {
	const [page, setPage] = useState(1);

	return (
		<div className={css.Main}>
			<div className={css.Dashboard}>
				<div className={css.Left}>
					<div className={css.head}>
						<span>Админ хэсэг</span>
					</div>
					<div className={css.menuItem} onClick={() => setPage(1)}>
						<div
							style={{
								backgroundColor: page === 1 ? "#D65DB1" : "white",
								color: page === 1 ? "white" : "black",
							}}
						>
							<DashboardIcon htmlColor={page === 1 ? "white" : "black"} />
							<span>Dashboard</span>
						</div>
					</div>
					<div className={css.menuItem} onClick={() => setPage(2)}>
						<div
							style={{
								backgroundColor: page === 2 ? "#D65DB1" : "white",
								color: page === 2 ? "white" : "black",
							}}
						>
							<LocationCityIcon htmlColor={page === 2 ? "white" : "black"} />
							<span>Салбар</span>
						</div>
					</div>
					<div className={css.menuItem} onClick={() => setPage(3)}>
						<div
							style={{
								backgroundColor: page === 3 ? "#D65DB1" : "white",
								color: page === 3 ? "white" : "black",
							}}
						>
							<LabelImportantIcon htmlColor={page === 3 ? "white" : "black"} />
							<span>Танхим</span>
						</div>
					</div>
					<div className={css.menuItem} onClick={() => setPage(4)}>
						<div
							style={{
								backgroundColor: page === 4 ? "#D65DB1" : "white",
								color: page === 4 ? "white" : "black",
							}}
						>
							<PeopleIcon htmlColor={page === 4 ? "white" : "black"} />
							<span>Ажилтан</span>
						</div>
					</div>
				</div>
				<div className={css.Right}>
					{page === 1 && <HomeDashboard />}
					{page === 2 && <Branch />}
					{page === 3 && <Hall />}
					{page === 4 && <Staff />}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
