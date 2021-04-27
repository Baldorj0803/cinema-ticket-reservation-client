import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
// import css from "./style.module.css";
import axios from "axios";

import "./style.css";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { orange } from "@material-ui/core/colors";

const Home = (props) => {
	const [data1, setData1] = useState({
		loading: false,
		error: "",
		movies: [],
	});
	const [data2, setData2] = useState({
		loading: false,
		error: "",
		movies: [],
	});

	const config = {
		className: "center",
		centerMode: true,
		dots: true,
		infinite: true,
		speed: 500,
		// slidesToShow: data1.movies.length < 3 ? data1.movies.length : 3,
		// slidesToScroll: data1.movies.length < 4 ? 0 : 1,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerPadding: "100px",
		appendDots: (dots) => (
			<div
				style={{
					borderRadius: "10px",
					padding: "10px",
				}}
			>
				<ul> {dots} </ul>
			</div>
		),
		customPaging: (i) => (
			<div
				style={{
					marginTop: "20px",
					marginLeft: "10px",
					marginRight: "10px",
					borderRadius: "30px",
					width: "30px",
					height: "30px",
					color: "blue",
					border: "none",
					backgroundColor: "rgba(255, 255, 255, .5)",
				}}
			></div>
		),
	};

	const [settings, setSettings] = useState(config);
	useEffect(() => {
		setData1((prevState) => {
			return { ...prevState, loading: true };
		});
		setData2((prevState) => {
			return { ...prevState, loading: true };
		});
		axios({
			method: "get",
			url: `http://localhost:8000/api/v1/movies/playing?limit=4&page=1`,
		})
			.then((res) => {
				setData1((prevState) => {
					return {
						movies: res.data.data,
						loading: false,
					};
				});
			})
			.catch((err) => {
				setData1((prevState) => {
					return {
						...prevState,
						error: err.response.data.error,
						loading: false,
					};
				});
			});
		axios({
			method: "get",
			url: `http://localhost:8000/api/v1/movies/coming-soon?limit=4&page=1`,
		})
			.then((res) => {
				setData2((prevState) => {
					return {
						...prevState,
						movies: res.data.data,
						loading: false,
					};
				});
			})
			.catch((err) => {
				setData2((prevState) => {
					return {
						...prevState,
						error: err.response.data.error,
						loading: false,
					};
				});
			});
	}, []);
	return (
		<div className="Home">
			<div className="Home1">
				<h2 style={{ color: "white" }}>Одоо дэлгэцнээ гарч буй</h2>
				{data1.error && <div>{data1.error}</div>}
				<div>
					<div className="App">
						<Slider {...settings}>
							{data1.movies.length > 0 &&
								data1.movies.map((movie) => {
									return <Card key={movie._id} movie={movie} />;
								})}
						</Slider>
					</div>
				</div>
			</div>
			<div className="Home2">
				<h2>Удахгүй дэлгэцнээ гарах</h2>
				{data2.error && <div>{data2.error}</div>}
				<div>
					{data2.movies.length > 0 &&
						data2.movies.map((movie, i) => {
							return <Card key={i} movie={movie.movie} />;
						})}
				</div>
			</div>
		</div>
	);
};

export default Home;
// import React, { useState, useEffect } from "react";
// import "./style.css";
// import Slider from "react-slick";
// import axios from "axios";
// import Card from "../../components/Card";
// import css from "./style.module.css";

// // Import css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Home() {
// 	const [data1, setData1] = useState({
// 		loading: false,
// 		error: "",
// 		movies: [],
// 	});
// 	useEffect(() => {
// 		setData1((prevState) => {
// 			return { ...prevState, loading: true };
// 		});

// 		axios({
// 			method: "get",
// 			url: `http://localhost:8000/api/v1/movies/playing?limit=4&page=1`,
// 		})
// 			.then((res) => {
// 				setData1((prevState) => {
// 					return {
// 						...prevState,
// 						movies: res.data.data,
// 						loading: false,
// 					};
// 				});
// 			})
// 			.catch((err) => {
// 				setData1((prevState) => {
// 					return {
// 						...prevState,
// 						error: err.response.data.error,
// 						loading: false,
// 					};
// 				});
// 			});
// 	}, []);
// 	const config = {
// 		dots: true,
// 		infinite: true,
// 		speed: 500,
// 		slidesToShow: 3,
// 		slidesToScroll: 1,
// 	};

// 	const [settings, setSettings] = useState(config);

// 	const image =
// 		"https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg";

// 	const products = [
// 		{
// 			img: image,
// 			title: "Dolore magna",
// 			text: "Lorem ipsum dolor sit amet elit.",
// 		},
// 		{
// 			img: image,
// 			title: "Eget est lorem",
// 			text: "Lorem Ipsum adipiscing elit ipsum.",
// 		},
// 		{
// 			img: image,
// 			title: "Tempus imperdiet",
// 			text: "Orci porta non pulvinar neque laoreet.",
// 		},
// 		{
// 			img: image,
// 			title: "Mattis rhoncus",
// 			text: "Bibendum neque egestas congue quisque.",
// 		},
// 	];

// 	const onChangeCenterMode = (e) => {
// 		if (e.target.checked) {
// 			setSettings({
// 				...config,
// 				centerMode: true,
// 				centerPadding: "50px",
// 			});
// 		} else {
// 			setSettings(config);
// 		}
// 	};

// 	return (
// 		<div className="App">
// 			<h3>
// 				Carousel Slider in React -{" "}
// 				<a href="https://www.cluemediator.com" target="_blank">
// 					Clue Mediator
// 				</a>
// 			</h3>

// 			<label className="cb-centermode">
// 				<input
// 					type="checkbox"
// 					checked={settings.centerMode}
// 					onChange={onChangeCenterMode}
// 				/>
// 				<span>Enable Center Mode</span>
// 			</label>

// 			<Slider {...settings}>
// 				{data1.movies.length > 0 &&
// 					data1.movies.map((movie) => {
// 						return <Card key={movie._id} movie={movie} />;
// 					})}
// 			</Slider>
// 		</div>
// 	);
// }

// export default Home;
