/*eslint-disable */
import TTLogo from "../Assets/TT Logo.png";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
const Nav = () => {
	const location = useLocation();
	const [isLogged, setisLogged] = useState(false);
	const history = useHistory();
	function logout() {
		localStorage.clear();
		history.push("/");
		setisLogged(false);
	}
	useEffect(() => {
		console.log("pathname", location.pathname);
		if (location.pathname == "/dashboard") {
			setisLogged(true);
		}
	}, [location]);

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-transparent border mx-5 px-5 mt-2">
				<a className="navbar-brand">
					<img src={TTLogo} alt="TT" height="40px" />
				</a>
				<div className="navbar-nav ms-auto">
					<>
						{isLogged ? (
							<>
								<a
									className="nav-item nav-link active btn btn-primary btn-lg px-5 text-white rounded-1"
									onClick={() => {
										logout();
									}}
								>
									Log out
								</a>
							</>
						) : null}
					</>
				</div>
			</nav>
		</>
	);
};

export default Nav;
