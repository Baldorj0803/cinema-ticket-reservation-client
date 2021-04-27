import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const MyOrder = () => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		let token = localStorage.getItem("t");
		axios
			.get("http://localhost:8000/api/v1/orders/user?sort=date", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setOrders(res.data.data);
			})
			.catch((err) => {
				console.log(err.response.data.error);
			});
	}, []);
	return (
		<div className={css.MyOrder}>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Киноны нэр</TableCell>
							<TableCell align="center">Хэзээ</TableCell>
							<TableCell align="center">Том хүн</TableCell>
							<TableCell align="center">Хүүхэд</TableCell>
							<TableCell align="center">Нийт үнэ</TableCell>
							<TableCell align="center">Байршил</TableCell>
							<TableCell align="center">Захиалсан өдөр</TableCell>
							<TableCell align="right">Суудал</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order) => {
							let sit = "";
							order.seats.forEach((e) => {
								sit = sit + e.row + "-" + e.column + " ";
							});
							return (
								<TableRow key={order._id}>
									<TableCell component="th" scope="row">
										{order.movieName}
									</TableCell>
									<TableCell align="center">
										{order.scheduleId === null
											? ""
											: order.scheduleId.startTime
													.slice(5, 16)
													.replace("T", " ")}
									</TableCell>
									<TableCell align="center">{order.adult}</TableCell>
									<TableCell align="center">{order.child}</TableCell>
									<TableCell align="center">{order.totalPrice}</TableCell>
									<TableCell align="center">
										{order.scheduleId === null ? "" : order.scheduleId.branch}
									</TableCell>
									<TableCell align="center">
										{order.date.slice(5, 16).replace("T", " ")}
									</TableCell>
									<TableCell align="right">{sit}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default MyOrder;
