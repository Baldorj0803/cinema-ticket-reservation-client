import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { useSnackbar } from "notistack";
import axios from "axios";
import { API } from "../../config";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const ManagerHomeDashboard = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [data, setdata] = useState([]);
	useEffect(() => {
		let token = localStorage.getItem("t");
		axios
			.get(`${API}/statistic/manager`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setdata(res.data.data.schedules);
			})
			.catch((err) => {
				enqueueSnackbar("Алдаа гарлаа" + err.response.data.error, {
					variant: "error",
				});
			});
	}, []);

	return (
		<div className={css.Order}>
			<div className={css.Header}>
				<span>Захиалгын мэдээлэл</span>
			</div>

			<div className={css.Table}>
				<TableContainer component={Paper}>
					<Table aria-label="simple table" size="medium">
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell align="center">Өдөр</TableCell>
								<TableCell align="center">Хуваарийн тоо</TableCell>
								<TableCell align="center">Захиалсан суудлын тоо</TableCell>
								<TableCell align="center">Орлого</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((schedule, i) => {
								return (
									<TableRow key={schedule._id}>
										<TableCell component="th" scope="row">
											{i + 1}
										</TableCell>
										<TableCell align="center">
											{schedule.startTime
												.toString()
												.slice(0, 16)
												.replace("T", "  ")}
										</TableCell>
										<TableCell align="center">
											{schedule.totalSchedule}
										</TableCell>
										<TableCell align="center">{schedule.totalOrder}</TableCell>
										<TableCell align="center">{schedule.totalAmount}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default ManagerHomeDashboard;
