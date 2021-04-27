import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MovieHandle from "../MovieHandle";
import ScheduleHandle from "../ScheduleHandle";

const useStyles = makeStyles((theme) => ({
	paper: {
		top: "30%",
		left: "35%",
		position: "absolute",
		width: 360,
		backgroundColor: theme.palette.background.paper,
		// border: "2px solid #000",
		borderRadius: "3px",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const MyModal = (props) => {
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
					{props.model === "movie" ? (
						<MovieHandle
							loadMovies={props.loadMovies}
							alert={props.alert}
							handleClose={props.handleClose}
							method={props.method}
							movie={props.movie}
						/>
					) : (
						<ScheduleHandle
							loadschedules={props.loadschedules}
							alert={props.alert}
							handleClose={props.handleClose}
							method={props.method}
							schedule={props.schedule}
						/>
					)}
				</div>
			</Modal>
		</div>
	);
};

export default MyModal;
