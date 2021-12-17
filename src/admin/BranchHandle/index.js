import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import axios from "axios";
import { API } from "../../config";
 
 
const BranchHandle = (props) => {
	const [form, setForm] = useState({
		branchName: "",
		branchAddress: "",
		branchPhoneNumber: "",
		formData: "",
	});  
	
	
	

	const handleChange = (name) => (event) => {
		setForm({ ...form, [name]: event.target.value });
	};
	useEffect(() => {
		setForm({ ...form, formData: new FormData(), ...props.branch });
	}, []);

	const handleSumbit = (e) => {
		e.preventDefault();

		let token = localStorage.getItem("t");

		axios
			.post(
				`${API}/branches`,
				{
					branchName: form.branchName,
					branchAddress: form.branchAddress,
					branchPhoneNumber: form.branchPhoneNumber,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				props.alert("Амжилттай", { variant: "success" });
				props.loadBranches();
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
				`${API}/branches/${props.branch._id}`,

				{
					branchName: form.branchName,
					branchAddress: form.branchAddress,
					branchPhoneNumber: form.branchPhoneNumber,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				props.alert("Амжилттай", { variant: "success" });
				props.loadBranches();
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
				onChange={handleChange("branchName")}
				placeholder="Салбарын нэрийг оруулна уу"
				value={form.branchName}
			/>
			<input
				className={css.input}
				type="text"
				onChange={handleChange("branchAddress")}
				placeholder="Салбарын хаягийг оруулна уу"
				value={form.branchAddress}
			/>
			<input
				className={css.input}
				type="number"
				onChange={handleChange("branchPhoneNumber")}
				placeholder="Холбоо барих утасны дугаар"
				value={form.branchPhoneNumber}
			/>

			{props.method === "POST" ? (
				<button onClick={handleSumbit}>Нэмэх</button>
			) : (
				<button onClick={handleSumbitPut}>Өөрчлөх</button>
			)}
		</div>
	);
};

export default BranchHandle;
