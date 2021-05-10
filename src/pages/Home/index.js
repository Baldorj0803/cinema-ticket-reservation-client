import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import { API } from "../../config";
import "./style.css";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "none", background: "red" }}
			onClick={onClick}
		/>
	);
}
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
		slidesToShow: 3,
		slidesToScroll: 1,
		centerPadding: "100px",
		nextArrow: <SampleNextArrow />,
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

	const [settings] = useState(config);
	useEffect(() => {
		setData1((prevState) => {
			return { ...prevState, loading: true };
		});
		setData2((prevState) => {
			return { ...prevState, loading: true };
		});
		axios({
			method: "get",
			url: `${API}/movies/playing?limit=4&page=1`,
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
			url: `${API}/movies/coming-soon?limit=4&page=1`,
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
