const btn = {
  backgroundColor: "#4f46f8",
  borderRadius: "5px",
  cursor: "pointer",
  width: "150px",
  padding: "5px 10px 5px 10px",
  color: "white",
};
const flexAlignJustifyCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const styles = (theme: any) => ({
  body: {
    backgroundColor: "#DDD",
    width: "100%",
    height: "90%",
    overflowY: "hidden",
    ...flexAlignJustifyCenter,
    paddingTop: "250px",
    paddingBottom: "450px",
  },
  container: {
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "5px",
    width: "500px",

    ...flexAlignJustifyCenter,
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "column",

    width: "80%",
  },
  labelRow: {
    margin: "10px 0px 10px 0px",
  },
  inputRow: {
    margin: "10px 0px 10px 0px",
  },
  input: {
    height: "30px",
    width: "100%",
  },
  btn: {
    ...btn,
    ...flexAlignJustifyCenter,
  },
});
export default styles;
