const btn = {
  backgroundColor: "#4f46f8",
  borderRadius: "2px",
  cursor: "pointer",
  width: "70px",
  padding: "5px 10px 5px 10px",
  color: "white",
};
const flexAlignJustifyCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const styles = (theme: any) => ({
  container: {
    display: "block",
    maxHeight: "650px !important",
    overflowY: "scroll !important",
  },

  capitalize: {
    textTransform: "capitalize",
  },
  table: {
    border: "1px solid #d1dae5",
  },
  darkRow: {
    backgroundColor: "#f4f4f9",

    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
    "& *": {
      fontWeight: "800 !important",
    },
  },
  paginationContainer: {
    ...flexAlignJustifyCenter,
    marginTop: "30px",
  },
  paginationToast: {
    ...flexAlignJustifyCenter,
    marginTop: "5px",
  },
  archived: {
    backgroundColor: "#edfbfa",
    color: "#2dd2c3",
    padding: "2px 5px 2px 5px",
    borderRadius: "2px",
    ...flexAlignJustifyCenter,
  },
  unArchive: {
    backgroundColor: "#eeeeee",
    color: "#959595",
    padding: "2px 5px 2px 5px",
    borderRadius: "2px",
    ...flexAlignJustifyCenter,
  },
  blueText: {
    color: "#2d5ce7",
  },
  redText: {
    color: "#d13b4c",
  },
  greenText: {
    color: "#4dafa4",
  },
  durationContainer: {
    ...flexAlignJustifyCenter,
    flexDirection: "column",
  },
  btn: {
    ...btn,
    ...flexAlignJustifyCenter,
  },
});
export default styles;
