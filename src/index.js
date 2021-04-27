import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import signupLoginReducer from "./redux/reducer/signupLoginReducer";
import orderReducer from "./redux/reducer/orderReducer";
import { SnackbarProvider } from "notistack";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
	signupLoginReducer,
	orderReducer,
});

const middlewares = [thunk];

const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
