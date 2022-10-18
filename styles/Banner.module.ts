const btn = {
  backgroundColor: "#4f46f8",
  borderRadius: "2px",
  cursor: "pointer",
  width: "150px",
  padding: "5px 10px 5px 10px",
  color: "white",
  textDecoration: "none",
};
const flexAlignJustifyCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const styles = (theme: any) => ({
  container: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",

    alignItems: "center",
    borderBottom: "2px solid #DDD",
  },
  logo: {
    marginLeft: "100px",
  },
  SignoutContainer: {
    marginRight: "100px",
  },
  btn: {
    ...btn,
    ...flexAlignJustifyCenter,
  },
});
export default styles;
