import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PeopleIcon from "@material-ui/icons/People";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import Movie from "../../dashboard/Movie";
import Schedule from "../../dashboard/Schedule";
import Order from "../../dashboard/Order";
import axios from "axios";
import { API } from "../../config";
import { HOST } from "../../config";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import ManagerHomeDashboard from "../../dashboard/Home";

const Dashboard = (props) => {
	const [page, setPage] = useState(1);
	const [manager, setManager] = useState({});

	useEffect(() => {
		let token = localStorage.getItem("t");
		let userId = localStorage.getItem("id");
		axios
			.get(`${API}/staffs/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setManager(res.data.data);
			})
			.catch((err) => {
				alert(err.response.data.data);
			});
	}, []);

	return (
		<div className={css.Main}>
			<div className={css.Dashboard}>
				<div className={css.Left}>
					<div>
						<div className={css.head}>
							<Avatar
								alt="Remy Sharp"
								src={manager ? `${HOST}static/upload/${manager.photo}` : "none"}
							/>
							<span>Нэр:{manager.fName}</span>
						</div>

						<div className={css.menuItem} onClick={() => setPage(1)}>
							<div
								style={{
									backgroundColor: page === 1 ? "#D65DB1" : "white",
									color: page === 1 ? "white" : "black",
								}}
							>
								<LocationCityIcon htmlColor={page === 1 ? "white" : "black"} />
								<span>Үзвэр</span>
							</div>
						</div>
						<div className={css.menuItem} onClick={() => setPage(2)}>
							<div
								style={{
									backgroundColor: page === 2 ? "#D65DB1" : "white",
									color: page === 2 ? "white" : "black",
								}}
							>
								<LabelImportantIcon
									htmlColor={page === 2 ? "white" : "black"}
								/>
								<span>Хуваарь</span>
							</div>
						</div>
						<div className={css.menuItem} onClick={() => setPage(3)}>
							<div
								style={{
									backgroundColor: page === 3 ? "#D65DB1" : "white",
									color: page === 3 ? "white" : "black",
								}}
							>
								<PeopleIcon htmlColor={page === 3 ? "white" : "black"} />
								<span>Захиалга</span>
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
								<span>Захиалгын мэдээлэл</span>
							</div>
						</div>
					</div>
					<div className={css.logout}>
						<Link
							style={{
								textDecoration: "none",
								display: "flex",
								alignItems: "center",
							}}
							to="/logout"
						>
							<span style={{ marginRight: "10px" }}>Гарах</span>
							<ExitToAppIcon htmlColor="#D65DB1" />
						</Link>
					</div>
				</div>
				<div className={css.Right}>
					{page === 1 && <Movie />}
					{page === 2 && <Schedule />}
					{page === 3 && <Order />}
					{page === 4 && <ManagerHomeDashboard />}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
