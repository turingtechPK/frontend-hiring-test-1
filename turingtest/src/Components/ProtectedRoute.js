import { Route, Redirect } from "react-router-dom";
export default function ProtectedRoute({ children, ...rest }) {
	let auth = localStorage.getItem("auth-token");
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}
