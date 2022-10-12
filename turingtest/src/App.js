import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Nav from "./Components/Nav";
import CallList from "./Components/CallList";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Nav />
				<Switch>
					<Route path="/" exact={true}>
						<Login />
					</Route>
					<ProtectedRoute path="/dashboard" exact={true}>
						<CallList />
					</ProtectedRoute>
					<Route path="*">
						<div className="py-5">
							<h1 className="text-center">
								404
								<br />
								PAGE NOT FOUND
							</h1>
						</div>
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
