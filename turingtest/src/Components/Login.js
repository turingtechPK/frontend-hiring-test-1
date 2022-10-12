import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
require("dotenv").config();
const { REACT_APP_API_URL } = process.env;
const Login = () => {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setpassword] = useState("");
	const [error, setError] = useState("");

	function handleSubmit() {
		setError("");
		if (username == "" && password == "") {
			setError("Please Fill out both fields");
		} else {
			console.log(username, password);
			let obj = {
				username: username,
				password: password,
			};
			console.log(REACT_APP_API_URL);
			axios
				.post(`${REACT_APP_API_URL}/auth/login`, obj)
				.then((resp) => {
					console.log("resp", resp);
					localStorage.setItem("auth-token", resp.data.access_token);
					localStorage.setItem("refresh-token", resp.data.refresh_token);
					localStorage.setItem("time-authed", new Date());
					history.push("/dashboard");
				})
				.catch((error) => {
					setError("Incorrect username or password.");
					console.log("error", error);
				});
		}
	}

	return (
		<div>
			<div className="container mt-5">
				<div className="row mt-5">
					<div className="col-md-6 offset-md-3">
						<div className="card my-5 bg-white border rounded-0">
							<div className="card-body cardbody-color p-lg-5">
								<div className="mb-3">
									<label htmlFor="Username">
										<span className="text-danger">*</span>
										User Name
									</label>
									<input
										type="text"
										className="form-control rounded-0 my-3"
										id="Username"
										aria-describedby="emailHelp"
										placeholder="User Name"
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="password">
										<span className="text-danger">*</span>
										Password
									</label>
									<input
										type="password"
										className="form-control rounded-0 my-3"
										id="password"
										placeholder="password"
										onChange={(e) => setpassword(e.target.value)}
									/>
								</div>
								<div>
									<button
										type="submit"
										className="btn btn-primary rounded-1 px-5 mb-5"
										onClick={() => handleSubmit()}
									>
										Login
									</button>
								</div>
							</div>
							{error ? (
								<>
									<div>
										<h1 className="text-center">{error}</h1>
									</div>
								</>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
