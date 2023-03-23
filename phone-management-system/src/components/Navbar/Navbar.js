import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "modules/auth/_redux/authActions";
import { Button } from "components/Button/Button";
import TTLogo from "assets/design-files/TT Logo.png";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = useSelector((state) => state.auth, shallowEqual);

  return (
    <div className="bg-white mx-auto w-full shadow-md">
      <div className="p-5 flex items-center justify-between">
        <img src={TTLogo} alt="logo" className="w-[250px]" />
        {access_token ? (
          <Button
            text="Logout"
            onClickHandler={() =>
              dispatch(
                logout(
                  () => navigate("/"),
                  () => {}
                )
              )
            }
          />
        ) : null}
      </div>
    </div>
  );
};
