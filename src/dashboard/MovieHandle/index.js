import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import axios from "axios";
import { API } from "../../config";

const AddMovie = (props) => {
	const [categories, setCategories] = useState([]);
	const [form, setForm] = useState({
		movName: "",
		movAuthor: "",
		duration: "",
		createdDate: "",
		ageLimit: "",
		movDesc: "",
		movGenre: [],
		photo: "",
		formData: "",
	});
	useEffect(() => {
		setForm({ ...form, formData: new FormData(), ...props.movie });
		axios
			.get(`${API}/categories`)
			.then((res) => {
				setCategories(res.data.data);
			})
			.catch((err) => {
				console.log(err.response.data.error);
			});
	}, []);

	const handleChange = (name) => (event) => {
		const value = name === "photo" ? event.target.files[0] : event.target.value;
		form.formData.set(name, value);
		setForm({ ...form, [name]: value });
	};

	const handleSumbit = (e) => {
		e.preventDefault();
		// console.log(form);
		let token = localStorage.getItem("t");

		axios
			.post(`${API}/movies`, form.formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "multipart/form-data",
				},
			})
			.then((res) => {
				props.alert("Амжилттай", { variant: "success" });
				props.loadMovies();
				props.handleClose();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleSumbitPut = (e) => {
		e.preventDefault();
		let token = localStorage.getItem("t");

		console.log("pud duudpaa");

		axios
			.put(`${API}/movies/${props.movie._id}`, form.formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res.data);
				props.alert("Амжилттай", { variant: "success" });
				props.loadMovies();
				props.handleClose();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={css.Form}>
			<input
				className={css.input}
				value={form.movName}
				onChange={handleChange("movName")}
				placeholder="Киноны нэр"
			/>
			<input
				className={css.input}
				onChange={handleChange("movAuthor")}
				placeholder="Киноны зохиолч"
				value={form.movAuthor}
			/>
			<input
				className={css.input}
				type="number"
				value={form.duration}
				onChange={handleChange("duration")}
				placeholder="Үргэлжлэх хугацаа"
			/>
			<input
				className={css.input}
				type="number"
				onChange={handleChange("createdDate")}
				placeholder="Бүтээсэн он"
				value={form.createdDate}
			/>
			<input
				className={css.input}
				type="number"
				onChange={handleChange("ageLimit")}
				placeholder="Насны хязгаар"
				value={form.ageLimit}
			/>
			<input
				className={css.input}
				type="text"
				onChange={handleChange("movDesc")}
				placeholder="Тайлбар"
				value={form.movDesc}
			/>
			{/* <input onChange={handleChange("genre")} placeholder="Төрөл" /> */}
			<select
				className={css.input}
				onChange={handleChange("movGenre")}
				id="cars"
			>
				{categories.map((cat, i) => (
					<option value={cat._id} key={i}>
						{cat.name}
					</option>
				))}
			</select>
			<input
				className={css.input}
				name="photo"
				type="file"
				accept="image/*"
				onChange={handleChange("photo")}
				placeholder="Зураг"
			/>
			{props.method === "POST" ? (
				<button onClick={handleSumbit}>Нэмэх</button>
			) : (
				<button onClick={handleSumbitPut}>Өөрчлөх</button>
			)}
		</div>
	);
};

export default AddMovie;
