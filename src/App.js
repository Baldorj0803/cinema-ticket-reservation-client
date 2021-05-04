import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Comingsoon from "./pages/Comingsoon";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Menu from "./components/Menu";
import Signup from "./pages/Signup";
import { connect } from "react-redux";
import Logout from "./components/Logout";
import * as actions from "./redux/actions/signupLoginActions";
import MovieDetial from "./components/MovieDetial";
import Order from "./pages/Order";
import MyOrder from "./pages/MyOrder";
import Dashboard from "./pages/Dashboard";
import { role } from "./auth/Role";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
function App(props) {
	useEffect(() => {
		const token = localStorage.getItem("t");
		const userId = localStorage.getItem("id");
		props.autoLogin(token, userId);
	}, []);
	return (
		<div className="App">
			<div>
				<Menu />
			</div>

			<div>
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/movies" exact>
						<Movies />
					</Route>
					<Route path="/movies/:movieId">
						<MovieDetial />
					</Route>
					<Route path="/comingsoon">
						<Comingsoon />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/logout">
						<Logout />
					</Route>
					{role() === "user" && (
						<>
							<Route path="/order">
								<Order />
							</Route>
							<Route path="/my-order">
								<MyOrder />
							</Route>
						</>
					)}
					{role() === "manager" && (
						<Route path="/dashboard">
							<Dashboard />
						</Route>
					)}
					{role() === "admin" && (
						<Route path="/admin-dashboard">
							<AdminDashboard />
						</Route>
					)}
					<Redirect to="/" />
				</Switch>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.signupLoginReducer.userId,
		data: state.signupLoginReducer.data,
		role: state.signupLoginReducer.role,
		token: state.signupLoginReducer.token,
	};
};
const mapDispatchToProps = (disptach) => {
	return {
		autoLogin: (token, userId) => disptach(actions.loginSuccess(token, userId)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
