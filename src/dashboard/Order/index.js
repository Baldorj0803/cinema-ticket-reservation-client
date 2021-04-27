import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";

const Order = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		nextPage: null,
		prevPage: null,
		start: null,
	});
	const [page, setPage] = useState(1);
	const loadOrders = () => {
		setLoading(true);
		let token = localStorage.getItem("t");
		axios
			.get(`http://localhost:8000/api/v1/orders?limit=10&page=${page}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data.data);
				setLoading(false);
				setOrders(res.data.data);
				setPagination(res.data.pagination);
			})
			.catch((err) => {
				setLoading(false);
				setError(err.response.data.error);
			});
	};
	useEffect(() => {
		loadOrders();
	}, [page]);

	return (
		<div className={css.Order}>
			<div className={css.Header}>
				<span>Захиалгын мэдээлэл</span>
			</div>

			<div className={css.Table}>
				<TableContainer component={Paper}>
					<Table aria-label="simple table" size="small">
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell>Киноны нэр</TableCell>
								<TableCell align="center">Хүний тоо</TableCell>
								<TableCell align="center">Нийт үнэ</TableCell>
								<TableCell align="center">Төлөв</TableCell>
								<TableCell align="center">Хэрэглэгч</TableCell>
								<TableCell align="center">Захиалсан огноо</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((order, i) => {
								return (
									<TableRow key={order._id}>
										<TableCell component="th" scope="row">
											{pagination.start + i}
										</TableCell>
										<TableCell align="center">{order.movieName}</TableCell>
										<TableCell align="center">
											{order.adult + order.child}
										</TableCell>
										<TableCell align="center">{order.totalPrice}</TableCell>
										<TableCell align="center">
											{order.status ? `Амжилттай` : `Хүлээгдэж буй`}
										</TableCell>
										<TableCell align="center">{order.userId.name}</TableCell>
										<TableCell align="center">
											{order.date.slice(5, 16)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<div className={css.Footer}>
				{pagination.prevPage && (
					<button onClick={() => setPage((prevPage) => prevPage - 1)}>
						Өмнөх
					</button>
				)}
				{pagination.nextPage && (
					<button onClick={() => setPage((prevPage) => prevPage + 1)}>
						Дараах
					</button>
				)}
			</div>
		</div>
	);
};

export default Order;
