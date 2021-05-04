import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { useSnackbar } from "notistack";
import axios from "axios";
import { API } from "../../config";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MovieIcon from "@material-ui/icons/Movie";
import GroupIcon from "@material-ui/icons/Group";
const HomeDashboard = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [data, setdata] = useState([]);

	useEffect(() => {
		let token = localStorage.getItem("t");
		axios
			.get(`${API}/statistic/admin`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setdata(res.data.data);
			})
			.catch((err) => {
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
							<span>{data["totalBranch"]}</span>
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
							<span>{data["totalHall"]}</span>
						</div>
					</div>
					<div className={css.Footer}>
						<LabelImportantIcon htmlColor="#28B30F" fontSize="small" />
						<span>Танхимууд</span>
					</div>
				</div>
				<div className={css.Item}>
					<div className={css.head}>
						<div className={css.Icon} style={{ backgroundColor: "#FF542E" }}>
							<MovieIcon htmlColor="white" fontSize="large" />
						</div>
						<div className={css.info}>
							<p>Нийт кино</p>
							<span>{data["totalMovie"]}</span>
						</div>
					</div>
					<div className={css.Footer}>
						<MovieIcon htmlColor="#FF542E" fontSize="small" />
						<span>Кинонууд</span>
					</div>
				</div>
				<div className={css.Item}>
					<div className={css.head}>
						<div className={css.Icon} style={{ backgroundColor: "#26D5C7" }}>
							<GroupIcon htmlColor="white" fontSize="large" />
						</div>
						<div className={css.info}>
							<p>Нийт Ажилтан</p>
							<span>{data["totalStaff"]}</span>
						</div>
					</div>
					<div className={css.Footer}>
						<GroupIcon htmlColor="#26D5C7" fontSize="small" />
						<span>Ажилчид</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeDashboard;
