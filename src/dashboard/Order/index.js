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
import { API } from "../../config";
import { useSnackbar } from "notistack";
const Order = () => {
	const [orders, setOrders] = useState([]);
	const { enqueueSnackbar } = useSnackbar();
	const [pagination, setPagination] = useState({
		nextPage: null,
		prevPage: null,
		start: null,
	});
	const [page, setPage] = useState(1);
	const loadOrders = () => {
		let token = localStorage.getItem("t");
		axios
			.get(`${API}/orders?limit=10&page=${page}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setOrders(res.data.data);
				setPagination(res.data.pagination);
			})
			.catch((err) => {
				enqueueSnackbar(err.response.data.error, { variant: "error" });
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
				{pagination.prevPage ? (
					<div>Хуудас {pagination.prevPage + 1}</div>
				) : pagination.nextPage ? (
					<div>Хуудас {pagination.nextPage - 1}</div>
				) : (
					""
				)}
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
