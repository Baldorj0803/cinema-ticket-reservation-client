import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
}));
const CommentDetial = (props) => {
	const classes = useStyles();
	const name = props.data.userId.name;
	const date = props.data.writeDate;
	const comment = props.data.commentDesc;
	const person = props.you;
	let hh, mm, ss;

	if (date) {
		let d = new Date(date);
		let now = new Date();
		let msec = now - d;
		hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
		ss = Math.floor(msec / 1000);
		msec -= ss * 1000;
	}

	if (person) {
		return (
			<div style={{ justifyContent: "flex-end" }} className={css.CommentDetial}>
				<div className={css.Main} style={{ marginRight: "5px" }}>
					<div className={css.username}>{person === true ? "You" : name}</div>
					<div className={css.time}>{hh > 0 ? hh + " цаг" : mm + " мин"}</div>

					<div className={css.Com}>
						<p>{comment}</p>
					</div>
				</div>
				<Avatar className={classes.small}>{name.toString().charAt(0)}</Avatar>
			</div>
		);
	} else {
		return (
			<div className={css.CommentDetial}>
				<Avatar className={classes.small}>
					{name.toString().slice(0, 1).toUpperCase()}
				</Avatar>
				<div className={css.Main}>
					<div>
						<div className={css.username}>{person === true ? "You" : name}</div>
						<div className={css.time}>{hh > 0 ? hh + " цаг" : mm + " мин"}</div>
					</div>
					<div className={css.Com}>
						<p>{comment}</p>
					</div>
				</div>
			</div>
		);
	}
};

export default CommentDetial;
