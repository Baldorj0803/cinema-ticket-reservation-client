import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import BranchHandle from "../BranchHandle";
import StaffHandle from "../StaffHandle";
import HallHandle from "../HallHandle";

const useStyles = makeStyles((theme) => ({
	paper: {
		top: "30%",
		left: "35%",
		position: "absolute",
		width: 360,
		backgroundColor: theme.palette.background.paper,
		borderRadius: "3px",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const AdminModel = (props) => {
	const classes = useStyles();

	return (
		<div>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className={classes.paper}>
					{props.model === "branch" && (
						<BranchHandle
							loadBranches={props.loadBranches}
							alert={props.alert}
							handleClose={props.handleClose}
							method={props.method}
							branch={props.branch}
						/>
					)}
					{props.model === "staff" && (
						<StaffHandle
							loadData={props.loadData}
							alert={props.alert}
							handleClose={props.handleClose}
							method={props.method}
							staff={props.staff}
						/>
					)}
					{props.model === "hall" && (
						<HallHandle
							loadData={props.loadData}
							alert={props.alert}
							handleClose={props.handleClose}
							method={props.method}
							hall={props.hall}
						/>
					)}
				</div>
			</Modal>
		</div>
	);
};

export default AdminModel;
