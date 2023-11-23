import * as Yup from "yup";

export const addDefaultValues = {
  content: "",
};

export const schema = Yup.object().shape({
  content: Yup.string().required("Required"),
});
