import axios from "axios";
require("dotenv").config();
const { REACT_APP_API_URL } = process.env;
export default async function getAuthToken() {
	//time nikalna abhi ka
	// local storage wala time nikalna
	// match krna agr local wala time abhi waly time sy chota hai toh dubara token refresh krna

	// end mai access token return krna
	let timeNow = new Date();
	let logintime = new Date(localStorage.getItem("time-authed"));
	var seconds = (timeNow.getTime() - logintime.getTime()) / 1000;
	var minutes = Math.floor(seconds / 60);
	let old_auth_token = localStorage.getItem("auth-token");
	let refresh_token = localStorage.getItem("refresh-token");
	console.log(minutes);

	if (minutes > 10) {
		let resp = await axios.post(
			`${REACT_APP_API_URL}/auth/refresh-token`,
			{ refresh_token },
			{
				headers: {
					Authorization: `Bearer ${old_auth_token}`,
				},
			}
		);
		console.log("resp", resp);
		localStorage.setItem("auth-token", resp.data.access_token);
		localStorage.setItem("refresh-token", resp.data.refresh_token);
		localStorage.setItem("time-authed", new Date());
		return resp.data.access_token;
	} else {
		return old_auth_token;
	}
}
