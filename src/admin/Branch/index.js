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

const Branch = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [branches, setBranches] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		nextPage: null,
		prevPage: null,
		start: null,
	});
	const [page, setPage] = useState(1);
	const loadBranches = () => {
		setLoading(true);
		axios
			.get(`${API}/branches`)
			.then((res) => {
				setLoading(false);
				setBranches(res.data.data);
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

	const deleteItem = (branchId) => {
		let token = localStorage.getItem("t");
		axios
			.delete(`${API}/branches/${branchId}`, {
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
	const [branch, setBranch] = useState(null);

	const handleMethod = (method, branch) => {
		setMethod(method);
		handleOpen();
		setBranch(branch);
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
				<span>Салбаруудын мэдээлэл</span>
				<button onClick={() => handleMethod("POST")}>
					<AddIcon />
					<span>Салбар нэмэх</span>
				</button>
			</div>

			<div className={css.Table}>
				<TableContainer component={Paper}>
					<Table aria-label="simple table" size="medium">
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell>Салбарын нэр</TableCell>
								<TableCell align="center">Хаяг</TableCell>
								<TableCell align="center">Холбоо барих</TableCell>
								<TableCell align="center">Нийт танхим</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{branches.map((branch, i) => {
								return (
									<TableRow key={branch._id}>
										<TableCell component="th" scope="row">
											{pagination.start + i}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{branch.branchName}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{branch.branchAddress}
										</TableCell>
										<TableCell
											align="center"
											style={{ whiteSpace: "normal", wordWrap: "break-word" }}
										>
											{branch.branchPhoneNumber}
										</TableCell>
										<TableCell align="center">{branch.halls.length}</TableCell>
										<TableCell align="center">
											<div
												style={{ height: "10px", cursor: "pointer" }}
												onClick={() => handleMethod("PUT", branch)}
											>
												<UpdateIcon fontSize="small" />
											</div>
										</TableCell>
										<TableCell align="center">
											<div
												onClick={() => deleteItem(branch._id)}
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
				branch={branch}
				method={method}
				loadBranches={loadBranches}
				alert={enqueueSnackbar}
				open={open}
				handleClose={handleClose}
				model="branch"
			/>
		</div>
	);
};

export default Branch;
