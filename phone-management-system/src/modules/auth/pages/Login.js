import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../_redux/authActions";
import { Button } from "components/Button/Button";
import { Formik } from "formik";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useSelector((state) => state.auth, shallowEqual);

  return (
    <div className="mx-[25%] my-16 h-[400px] w-[800px] bg-white border border-gray-200 rounded-lg shadow-sm">
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required!";
          }
          if (!values.password) {
            errors.password = "Required!";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            login(
              values,
              () => {
                navigate("/calls");
              },
              (error) => {
                console.log(error);
              }
            )
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="p-10 mt-1">
                <h1 className="text-2xl font-semibold mb-5">Login</h1>
                <div className="mb-2">
                  <label>
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="abc@xyz.cpm"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className="border h-10 my-1 transition pl-2 rounded-md w-full md:text-base text-sm font-normal bg-transparent mt-1 block bg-white border-slate-300 placeholder-slate-400
           focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  />
                  <span className="text-red-500">
                    {errors.username && touched.username && errors.username}
                  </span>
                </div>

                <div className="mb-2">
                  <label>
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="******"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="border h-10 my-1 transition pl-2 rounded-md w-full md:text-base text-sm font-normal bg-transparent mt-1 block bg-white border-slate-300 placeholder-slate-400
           focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  />
                  <span className="text-red-500">
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>

                <br />
                <Button
                  variant="primary"
                  text="Login"
                  type="submit"
                  disabled={actionLoading}
                  isLoading={actionLoading}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
