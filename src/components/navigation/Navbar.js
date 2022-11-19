import logo from "../../../design-files/TT Logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  function logout() {
    localStorage.setItem("SavedToken", null);
    localStorage.setItem("RefreshToken", null);

    navigate("/");
  }

  const token = localStorage.getItem("SavedToken");

  return (
    <>
      <nav className="navbar">
        <div>
          <img alt="turing logo" src={logo} className="navbar-logo" />
        </div>

        {token && (
          <div className="nav-links">
            <button onClick={logout} className="secondary-button">
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
