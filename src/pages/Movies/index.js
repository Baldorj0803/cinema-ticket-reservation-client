import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import css from "./style.module.css";
import axios from "axios";
import Spinner from "../../components/Spinner";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

const Movies = (props) => {
	const [page, setPage] = useState(1);
	const [item, setItem] = useState([]);
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState("");
	const [data, setData] = useState({
		loading: false,
		error: "",
		pagination: "",
	});

	const [checked, setChecked] = useState([]);

	const handleCategory = (value) => {
		let c = [];
		c.push(value);
		setChecked([...c]);
	};
	useEffect(() => {
		console.log(checked);
		loadMovies("category");
	}, [checked]);

	const loadMovies = (type) => {
		let query = `http://localhost:8000/api/v1/movies/playing`;

		if (type === "search" && search) {
			query = query + "?limit=20&page=1&search=" + search;
		} else if (type === "category" && checked.length > 0) {
			let category = "category=";
			checked.map((ch) => (category = category + ch + " "));
			query = query + "?limit=20&page=1&" + category;
		} else {
			query = query + `?limit=4&page=${page}`;
		}

		setData((prevState) => {
			return {
				...prevState,
				loading: true,
			};
		});

		axios({
			method: "get",
			url: query,
		})
			.then((res) => {
				console.log("type", type, "page", page);
				type === "search" || type === "category" || page === 1
					? setItem(res.data.data)
					: setItem([...item, ...res.data.data]);

				setData((prevState) => {
					return {
						...prevState,
						loading: false,
						pagination: res.data.pagination,
					};
				});
			})
			.catch((err) => {
				setData((prevPage) => {
					return {
						...prevPage,
						error: err,
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
		loadCategories();
	}, []);

	useEffect(() => {
		setData((prevState) => {
			return {
				...prevState,
				loading: true,
			};
		});

		loadMovies(null);
	}, [page]);

	const handleChange = (event) => {
		setSearch(event.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (search) {
			loadMovies("search");
		} else {
			setSearch("");
			page === 1 ? loadMovies() : setPage(1);
		}
	};

	return (
		<div className={css.Movies}>
			<div className={css.Search}>
				<input onChange={(e) => handleChange(e)} placeholder="Хайлт хийх ..." />
				<div onClick={handleSubmit}>
					<SearchIcon />
				</div>
			</div>
			<div className={css.Cat}>
				<div className={css.Category}>
					{categories.length > 0 && (
						<button
							className={css.category}
							onClick={() => {
								page === 1 ? loadMovies() : setPage(1);
							}}
						>
							Бүх
						</button>
					)}
					{categories.map((data) => {
						return (
							<button
								className={css.category}
								key={data._id}
								value={data._id}
								onClick={(e) => handleCategory(e.target.value)}
							>
								{data.name}
							</button>
						);
					})}
				</div>
			</div>
			<div className={css.Movie}>
				<div>
					{item.length > 0 &&
						item.map((movie, i) => {
							return <Card key={i} movie={movie} />;
						})}
				</div>
				{!data.loading && item.length === 0 && (
					<div style={{ marginTop: "20px" }}>Үр дүн олдсонгүй</div>
				)}
				{data.loading && <Spinner />}

				{data.pagination.nextPage && (
					<Button
						variant="outlined"
						color="primary"
						size="small"
						onClick={() => {
							setPage((prevPage) => 1 + prevPage);
						}}
					>
						{data.loading ? <span>Уншиж байна</span> : <span>Цааш үзэх</span>}
					</Button>
				)}
			</div>
		</div>
	);
};

export default Movies;
