import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import axios from "axios";
import { API } from "../../config";

const HallHandle = (props) => {
	const [branches, setBranches] = useState([]);
	const [form, setForm] = useState({
		hallNumber: "",
		hallType: "",
		row: "",
		column: "",
		branch: "",
	});
	useEffect(() => {
		setForm({ ...form, formData: new FormData(), ...props.hall });

		axios
			.get(`${API}/branches`)
			.then((res) => {
				setBranches(res.data.data);
			})
			.catch((err) => {
				props.alert(err.response.data.error, { variant: "warning" });
			});
	}, []);

	const handleChange = (name) => (event) => {
		form.formData.set(name, event.target.value);
		setForm({ ...form, [name]: event.target.value });
	};

	const handleSumbit = (e) => {
		e.preventDefault();

		let token = localStorage.getItem("t");

		axios
			.post(
				`${API}/halls`,
				{
					hallNumber: form.hallNumber,
					hallType: form.hallType,
					row: form.row,
					column: form.column,
					branch: form.branch,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				props.alert("Амжилттай", { variant: "success" });
				props.loadData();
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
				`${API}/halls/${props.hall._id}`,

				{
					hallNumber: form.hallNumber,
					hallType: form.hallType,
					row: form.row,
					column: form.column,
					branch: form.branch,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				props.alert("Амжилттай", { variant: "success" });
				props.loadData();
				props.handleClose();
			})
			.catch((err) => {
				props.alert(err.response.data.error, { variant: "warning" });
			});
	};

	return (
		<div className={css.Form}>
			<input
				className={css.input}
				type="text"
				onChange={handleChange("hallNumber")}
				placeholder="Танхимын дугаар оруулна уу"
				value={form.hallNumber}
			/>
			<select
				className={css.input}
				onChange={handleChange("hallType")}
				id="cars"
			>
				<option value="">--Танхимын төрөл--</option>

				<option value={"vip"}>vip</option>
				<option value={"simple"}>simple</option>
				<option value={"3D"}>3D</option>
			</select>
			<input
				className={css.input}
				type="number"
				onChange={handleChange("row")}
				placeholder="Эгнээний дугаарыг оруулна уу"
				value={form.row}
			/>
			<input
				className={css.input}
				type="number"
				onChange={handleChange("column")}
				placeholder="Баганын дугаарыг оруулна уу"
				value={form.column}
			/>

			<div className={css.input}>Нийт суудал: {form.row * form.column}</div>

			<select className={css.input} onChange={handleChange("branch")} id="cars">
				<option value="">--Салбар--</option>
				{branches.map((branch, i) => (
					<option value={branch._id} key={i}>
						{branch.branchName}
					</option>
				))}
			</select>

			{props.method === "POST" ? (
				<button onClick={handleSumbit}>Нэмэх</button>
			) : (
				<button onClick={handleSumbitPut}>Өөрчлөх</button>
			)}
		</div>
	);
};

export default HallHandle;
