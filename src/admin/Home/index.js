import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { useSnackbar } from "notistack";
import axios from "axios";
import { API } from "../../config";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MovieIcon from "@material-ui/icons/Movie";
import GroupIcon from "@material-ui/icons/Group";
import TodayIcon from "@material-ui/icons/Today";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
const HomeDashboard = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [data, setdata] = useState([]);
	const [loading, setloading] = useState(false);

	useEffect(() => {
		setloading(true);
		let token = localStorage.getItem("t");
		axios
			.get(`${API}/statistic/admin`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setloading(false);
				setdata(res.data.data);
			})
			.catch((err) => {
				setloading(false);
				enqueueSnackbar("Алдаа гарлаа" + err.response.data.error, {
					variant: "error",
				});
			});
	}, []);

	return (
		<div className={css.Home}>
			<div className={css.HeadContent}>
				<div className={css.Item}>
					<div className={css.head}>
						<div className={css.Icon} style={{ backgroundColor: "orange" }}>
							<LocationCityIcon htmlColor="white" fontSize="large" />
						</div>
						<div className={css.info}>
							<p>Нийт салбар</p>
							{loading ? (
								<div className={css.load} />
							) : (
								<span>{data["totalBranch"]}</span>
							)}
						</div>
					</div>
					<div className={css.Footer}>
						<LocationCityIcon htmlColor="orange" fontSize="small" />
						<span>Салбарууд</span>
					</div>
				</div>
				<div className={css.Item}>
					<div className={css.head}>
						<div className={css.Icon} style={{ backgroundColor: "#28B30F" }}>
							<LabelImportantIcon htmlColor="white" fontSize="large" />
						</div>
						<div className={css.info}>
							<p>Нийт танхим</p>
							{loading ? (
								<div className={css.load} />
							) : (
								<span>{data["totalHall"]}</span>
							)}
						</div>
					</div>
					<div className={css.Footer}>
						<LabelImportantIcon htmlColor="#28B30F" fontSize="small" />
						<span>Танхимууд</span>
					</div>
				</div>
				<div className={css.Item}>
					<div className={css.head}>
						<div className={css.Icon} style={{ backgroundColor: "#26D5C7" }}>
							<GroupIcon htmlColor="white" fontSize="large" />
						</div>
						<div className={css.info}>
							<p>Нийт Ажилтан</p>
							{loading ? (
								<div className={css.load} />
							) : (
								<span>{data["totalStaff"]}</span>
							)}
						</div>
					</div>
					<div className={css.Footer}>
						<GroupIcon htmlColor="#26D5C7" fontSize="small" />
						<span>Ажилчид</span>
					</div>
				</div>

				<div className={css.Item}>
					<div className={css.head}>
						<div className={css.Icon} style={{ backgroundColor: "#FF542E" }}>
							<MovieIcon htmlColor="white" fontSize="large" />
						</div>
						<div className={css.info}>
							<p>Нийт кино</p>
							{loading ? (
								<div className={css.load} />
							) : (
								<span>{data["totalMovie"]}</span>
							)}
						</div>
					</div>
					<div className={css.Footer}>
						<MovieIcon htmlColor="#FF542E" fontSize="small" />
						<span>Кинонууд</span>
					</div>
				</div>
			</div>
			<div className={css.SecondContent}>
				<div className={css.headItem}>
					<div className={css.Item2} style={{ backgroundColor: "orange" }}>
						<div className={css.Icon2}>
							<TodayIcon htmlColor="orange" />
						</div>
						<div className={css.Title2}>
							<span>Хуваарь</span>
						</div>
						<div className={css.Value}>
							{loading ? (
								<div className={css.load} />
							) : (
								<span>{data["totalSchedule"]}</span>
							)}
						</div>
					</div>
					<div className={css.Item2} style={{ backgroundColor: "#28B30F" }}>
						<div className={css.Icon2}>
							<GroupIcon htmlColor="#28B30F" />
						</div>
						<div className={css.Title2}>
							<span>Хэрэглэгчид</span>
						</div>
						<div className={css.Value}>
							{loading ? (
								<div className={css.load} />
							) : (
								<span>{data["totalUser"]}</span>
							)}
						</div>
					</div>
				</div>

				<div className={css.footItem}>
					<div className={css.Item2} style={{ backgroundColor: "#26D5C7" }}>
						<div className={css.Icon2}>
							<EventSeatIcon htmlColor="#26D5C7" />
						</div>
						<div className={css.Title2}>
							<span>Захиалгын тоо</span>
						</div>
						<div className={css.Value}>
							{loading ? (
								<div className={css.load} />
							) : (
								<span>{data["totalOrder"]}</span>
							)}
						</div>
					</div>
					<div className={css.Item2} style={{ backgroundColor: "#FF542E" }}>
						<div className={css.Icon2}>
							<AttachMoneyIcon htmlColor="#FF542E" />
						</div>
						<div className={css.Title2}>
							<span>Захиалгын үнэ</span>
						</div>
						<div className={css.Value}>
							{loading ? (
								<div className={css.load} />
							) : (
								<span>{data["totalPrice"]}</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeDashboard;
