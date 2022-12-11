import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import NavBar from "./Navbar";

const Layout = ({ children, pageTitle }) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <NavBar />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default Layout;
