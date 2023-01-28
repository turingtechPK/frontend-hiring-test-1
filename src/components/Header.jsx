import {useRouter} from "next/router";

export default function Header({ loginPage }) {
    const router = useRouter();

    const logoutUser = () => {
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
        router.push("/login");
    }
    return (
        <>
            <nav className="app-header">
                <img src="TT-Logo.png" width="313px" height="37px" alt="logo not found"/>
                {!loginPage && <button className="blueBtn" onClick={logoutUser}> Logout </button>}
            </nav>
        </>
    );
}