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
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import UpdateIcon from "@material-ui/icons/Update";
import axios from "axios";
import { useSnackbar } from "notistack";
import AdminModel from "../AdminModel";
import { API } from "../../config";
import AddIcon from "@material-ui/icons/Add";

const Staff = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [staffs, setStaffs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		nextPage: null,
		prevPage: null,
		start: null,
	});
	const [page, setPage] = useState(1);
	const loadBranches = () => {
		let token = localStorage.getItem("t");

		setLoading(true);
		axios
			.get(`${API}/staffs`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setLoading(false);
				setStaffs(res.data.data);
				setPagination(res.data.pagination);
			})
			.catch((err) => {
				setLoading(false);
				setError(err.response.data.error);
			});
	};
	useEffect(() => {
		loadBranches();
	}, [page]);

	const deleteItem = (staffId) => {
		let token = localStorage.getItem("t");
		axios
			.delete(`${API}/staffs/${staffId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				loadBranches();
				enqueueSnackbar("Амжилттай устгалаа", { variant: "success" });
			})
			.catch((err) => {
				enqueueSnackbar("Алдаа гарлаа" + err.response.data.error, {
					variant: "error",
				});
			});
	};
	const [open, setOpen] = useState(false);
	const [method, setMethod] = useState(null);
	const [staff, setStaff] = useState(null);

	const handleMethod = (method, staff) => {
		setMethod(method);
		handleOpen();
		setStaff(staff);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={css.Branch}>
			<div className={css.Header}>
				<span>Ажилчидын мэдээлэл</span>
				<button onClick={() => handleMethod("POST")}>
					<AddIcon />
					<span>Ажилчин нэмэх</span>
				</button>
			</div>

			<div className={css.Table}>
				<TableContainer component={Paper}>
					<Table aria-label="simple table" size="small">
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell align="center">Овог</TableCell>
								<TableCell align="center">Нэр</TableCell>
								<TableCell align="center">Регистер</TableCell>
								<TableCell align="center">Емэйл</TableCell>
								<TableCell align="center">Албан тушаал</TableCell>
								<TableCell align="center">Салбар</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{staffs.map((staff, i) => {
								return (
									<TableRow key={staff._id}>
										<TableCell component="th" scope="row">
											{pagination.start + i}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{staff.fName}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{staff.lName}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{staff.rNum}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{staff.email}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{staff.role}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{staff.branchId !== null ? staff.branchId.branchName : ""}
										</TableCell>
										<TableCell align="center">
											<div
												style={{ height: "10px", cursor: "pointer" }}
												onClick={() => handleMethod("PUT", staff)}
											>
												<UpdateIcon fontSize="small" />
											</div>
										</TableCell>
										<TableCell align="center">
											<div
												onClick={() => deleteItem(staff._id)}
												style={{ height: "10px", cursor: "pointer" }}
											>
												<DeleteOutlineIcon fontSize="small" />
											</div>
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
			<AdminModel
				staff={staff}
				method={method}
				loadData={loadBranches}
				alert={enqueueSnackbar}
				open={open}
				handleClose={handleClose}
				model="staff"
			/>
		</div>
	);
};

export default Staff;
