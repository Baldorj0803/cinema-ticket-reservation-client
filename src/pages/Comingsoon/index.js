import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import css from "./style.module.css";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Button } from "@material-ui/core";
const Comingsoon = () => {
	const [page, setPage] = useState(1);
	const [item, setItem] = useState([]);
	const [categories, setCategories] = useState([]);
	const [data, setData] = useState({
		loading: false,
		error: "",
		pagination: "",
	});

	const loadMovies = () => {
		axios({
			method: "get",
			url: `http://localhost:8000/api/v1/movies/coming-soon?limit=4&page=${page}`,
		})
			.then((res) => {
				setItem([...item, ...res.data.data]);
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
	const loadCategories = () => {
		axios({
			method: "get",
			url: `http://localhost:8000/api/v1/categories`,
		})
			.then((res) => {
				setCategories(res.data.data);
			})
			.catch((err) => {
				alert(err.response.data.error);
			});
	};

	useEffect(() => {
		setData((prevState) => {
			return {
				...prevState,
				loading: true,
			};
		});
		loadCategories();
		loadMovies();
	}, [page]);

	return (
		<div className={css.Movie}>
			<div>
				{item.map((movie, i) => {
					return <Card key={i} movie={movie.movie} />;
				})}
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
