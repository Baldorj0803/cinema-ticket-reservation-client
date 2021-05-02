import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import axios from "axios";
import { API } from "../../config";

const AddMovie = (props) => {
	const [movies, setMovies] = useState([]);
	const [halls, setHalls] = useState([]);
	const [form, setForm] = useState({
		hallId: "",
		movieId: "",
		priceChild: "",
		priceAdults: "",
		startTime: "",
		formData: "",
	});
	useEffect(() => {
		setForm({ ...form, formData: new FormData(), ...props.schedule });
		axios
			.get(`${API}/movies?limit=30&select=movName`)
			.then((res) => {
				setMovies(res.data.data);
			})
			.catch((err) => {
				console.log(err.response.data.error);
			});
		axios
			.get(`${API}/halls`)
			.then((res) => {
				setHalls(res.data.data);
			})
			.catch((err) => {
				let e = err.response.data.error;
				props.alert(e, { variant: "warning" });
			});
	}, []);

	const handleChange = (name) => (event) => {
		form.formData.set(name, event.target.value);
		setForm({ ...form, [name]: event.target.value });
	};

	const getTime = (startTime) => {
		let date = startTime.replace("T", "-");
		date = date.replace(":", "-");
		return date;
	};

	const handleSumbit = (e) => {
		e.preventDefault();

		let token = localStorage.getItem("t");

		axios
			.post(
				`${API}/schedules`,
				{
					hallId: form.hallId,
					movieId: form.movieId,
					priceChild: form.priceChild,
					priceAdults: form.priceAdults,
					startTime: getTime(form.startTime),
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				props.alert("Амжилттай", { variant: "success" });
				props.loadschedules();
				props.handleClose();
			})
			.catch((err) => {
				props.alert(err.response.data.error, { variant: "warning" });
			});
	};
	const handleSumbitPut = (e) => {
		e.preventDefault();

		let token = localStorage.getItem("t");

		axios
			.put(
				`${API}/schedules/${props.schedule._id}`,

				{
					hallId: form.hallId,
					movieId: form.movieId,
					priceChild: form.priceChild,
					priceAdults: form.priceAdults,
					startTime: getTime(form.startTime),
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				props.alert("Амжилттай", { variant: "success" });
				props.loadschedules();
				props.handleClose();
			})
			.catch((err) => {
				props.alert(err.response.data.error, { variant: "warning" });
			});
	};

	return (
		<div className={css.Form}>
			<select className={css.input} onChange={handleChange("hallId")} id="cars">
				<option value="">--Хаана--</option>
				{halls.map((hall, i) => (
					<option value={hall._id} key={i}>
						{hall.branch.branchName} - {hall.hallNumber} - {hall.hallType}
					</option>
				))}
			</select>
			<select
				className={css.input}
				onChange={handleChange("movieId")}
				id="cars"
			>
				<option value="">--Киноны нэрийг сонгоно уу--</option>
				{movies.map((movie, i) => (
					<option value={movie._id} key={i}>
						{movie.movName}
					</option>
				))}
			</select>
			<input
				className={css.input}
				type="number"
				onChange={handleChange("priceAdults")}
				placeholder="Том хүний үнэ"
				value={form.priceAdults}
			/>
			<input
				className={css.input}
				type="number"
				onChange={handleChange("priceChild")}
				placeholder="Хүүхдийн үнэ"
				value={form.priceChild}
			/>
			<input
				className={css.input}
				type="datetime-local"
				onChange={handleChange("startTime")}
				// value={form.startTime}
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
