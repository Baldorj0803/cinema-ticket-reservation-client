import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import axios from "axios";
import { API } from "../../config";

const AddMovie = (props) => {
	const [branches, setBranches] = useState([]);
	const [form, setForm] = useState({
		fName: "",
		lName: "",
		rNum: "",
		email: "",
		branchId: "",
		password: "",
		role: "",
		formData: "",
	});
	useEffect(() => {
		setForm({ ...form, formData: new FormData(), ...props.staff });

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
		setForm({ ...form, [name]: event.target.value });
	};

	const handleSumbit = (e) => {
		e.preventDefault();

		let token = localStorage.getItem("t");

		axios
			.post(
				`${API}/staffs`,
				{
					fName: form.fName,
					lName: form.lName,
					rNum: form.rNum,
					email: form.email,
					branchId: form.branchId,
					password: form.password,
					role: form.role,
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
				`${API}/staffs/${props.staff._id}`,

				{
					fName: form.fName,
					lName: form.lName,
					rNum: form.rNum,
					email: form.email,
					branchId: form.branchId,
					role: form.role,
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
				onChange={handleChange("fName")}
				placeholder="Овогоо оруулна уу"
				value={form.fName}
			/>
			<input
				className={css.input}
				type="text"
				onChange={handleChange("lName")}
				placeholder="Нэрээ оруулна уу"
				value={form.lName}
			/>
			<input
				className={css.input}
				type="text"
				onChange={handleChange("rNum")}
				placeholder="Регистерээ оруулна уу"
				value={form.rNum}
			/>
			<input
				className={css.input}
				type="email"
				onChange={handleChange("email")}
				placeholder="Имэйл ээ оруулна уу"
				value={form.email}
			/>
			<input
				className={css.input}
				type="text"
				onChange={handleChange("password")}
				placeholder="Нууц үг ээ оруулна уу"
				value={form.password}
			/>

			<select className={css.input} onChange={handleChange("role")} id="cars">
				<option value="">--Албан тушаал--</option>

				<option value={"manager"}>Менежер</option>
			</select>
			<select
				className={css.input}
				onChange={handleChange("branchId")}
				id="cars"
			>
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

export default AddMovie;
