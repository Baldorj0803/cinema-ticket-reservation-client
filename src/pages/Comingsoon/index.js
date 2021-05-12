import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import css from "./style.module.css";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Button } from "@material-ui/core";
import { API } from "../../config";
const Comingsoon = () => {
	const [page, setPage] = useState(1);
	const [item, setItem] = useState([]);
	const [month, setMonth] = useState(0);
	const [data, setData] = useState({
		loading: false,
		error: "",
		pagination: "",
	});

	const loadMovies = (m) => {
		let query = `${API}/movies/coming-soon?`;
		if (m !== null && m !== 0) {
			query = query + `limit=10&page=1&month=${month}`;
		} else {
			query = query + `limit=4&page=${page}`;
		}
		axios({
			method: "get",
			url: query,
		})
			.then((res) => {
				if (m !== null || page === 1) {
					setItem([...res.data.data]);
				} else {
					setItem([...item, ...res.data.data]);
				}
				setData((prevState) => {
					return {
						...prevState,
						loading: false,
						pagination: res.data.pagination,
					};
				});
			})
			.catch((err) => {
				setData((prevState) => {
					return {
						...prevState,
						error: err,
						loading: false,
					};
				});
			});
	};

	useEffect(() => {
		setData((prevState) => {
			return {
				...prevState,
				loading: true,
			};
		});
		loadMovies(null);
	}, [page]);

	useEffect(() => {
		loadMovies(month);
	}, [month]);

	const category = () => {
		let month = new Date().getMonth() + 1;
		var rows = [];
		for (var i = 0; i < 12; i++) {
			let m = month + i;
			if (month + i > 12) {
				m = m - 12;
			}
			rows.push(
				<button
					className={css.category}
					key={i}
					value={m}
					onClick={() => setMonth(m)}
				>
					{m} сар
				</button>
			);
		}
		return rows;
	};
	return (
		<div className={css.Movie}>
			<div className={css.Category}>
				<button
					className={css.category}
					onClick={() => {
						page === 1 ? loadMovies(null) : setPage(1);
					}}
				>
					Бүх
				</button>
				{category()}
			</div>
			<div>
				{item.map((movie, i) => {
					return <Card key={i} movie={movie.movie} />;
				})}
				{item.length === 0 && (
					<span style={{ marginTop: "20px" }}>Үр дүн олдсонгүй</span>
				)}
			</div>
			<div>{data.loading && <Spinner />}</div>

			{data.pagination.nextPage && (
				<Button
					variant="outlined"
					color="primary"
					size="small"
					onClick={() => setPage((prevPage) => prevPage + 1)}
				>
					{data.loading ? <span>Уншиж байна</span> : <span>Цааш үзэх</span>}
				</Button>
			)}
		</div>
	);
};
export default Comingsoon;
