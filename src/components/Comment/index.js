import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import axios from "axios";
import CommentDetial from "../CommentDetial";
import { API } from "../../config";
import { useSnackbar } from "notistack";
const Comment = (props) => {
	const { enqueueSnackbar } = useSnackbar();
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [pagination, setpagination] = useState({
		end: null,
		pageCount: null,
		start: null,
		total: null,
		nextPage: null,
		prevPage: null,
	});
	const { movieId } = props;

	const handleChange = (e) => {
		setComment(e.target.value);
	};

	const deleteComment = (commentId) => {
		let token = localStorage.getItem("t");
		axios
			.delete(`${API}/comments/${commentId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				let result = comments.filter((comment) => comment._id !== commentId);
				setComments([...result]);
				enqueueSnackbar("Амжилттай устгалаа", { variant: "success" });
			})
			.catch((err) => {
				alert(err.response.data.data);
			});
	};

	const loadComment = () => {
		setLoading(true);
		axios
			.get(`${API}/comments/movie/${movieId}?limit=5&page=${page}`)
			.then((res) => {
				setComments((prevState) => [...prevState, ...res.data.data]);
				setpagination(res.data.pagination);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.response);
				setLoading(false);
			});
	};

	useEffect(() => {
		loadComment();
	}, [page]);

	const handleSubmit = (e) => {
		e.preventDefault();

		let token = localStorage.getItem("t");

		axios
			.post(
				`${API}/comments`,
				{
					movieId: movieId,
					commentDesc: comment,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setComment("");
				setComments((prevState) => [res.data.data, ...prevState]);
			})
			.catch((err) => {
				enqueueSnackbar(err.response.data.error, { variant: "error" });
			});
	};

	let userId = localStorage.getItem("id");
	return (
		<div className={css.Comment}>
			<div className={css.MyComment}>
				<input value={comment} onChange={handleChange} />
				<button onClick={handleSubmit}>Илгээх</button>
			</div>
			<div className={css.CommentMain}>
				<div className={css.Comments}>
					{comments.length > 0 &&
						comments.map((comment, i) => {
							let person = false;
							if (comment.userId._id === userId) person = true;
							return (
								<CommentDetial
									you={person}
									key={i}
									data={comment}
									deleteComment={deleteComment}
								/>
							);
						})}
				</div>
				<div className={css.Button}>
					{pagination.nextPage &&
						(loading ? (
							<div className={css.loader} />
						) : (
							<button onClick={() => setPage(page + 1)}>Цааш үзэх</button>
						))}
				</div>
			</div>
		</div>
	);
};

export default Comment;
