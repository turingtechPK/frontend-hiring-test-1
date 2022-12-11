import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { LOGIN_URL } from "../../constants/pageUrls";

const PrivateRoute = ({ isAuthed, component }) => {
  if (!isAuthed) {
    return <Navigate to={`/${LOGIN_URL}`} replace />;
  }

  return component;
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  isAuthed: PropTypes.bool.isRequired,
};

export default PrivateRoute;
