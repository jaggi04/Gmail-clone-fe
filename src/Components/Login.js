import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";


function Login() {
  let navigate = useNavigate();

  let handleSubmit = async (values) => {
    let res = await axios.post("https://gmailcloneapp.herokuapp.com/users/login", values);

    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("firstName", res.data.firstName);
      navigate("/home");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short")
        .required("No Password Provided"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="login">
      <div className="login-content" style={{ marginTop: "150px" }}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div
            className="login"
            style={{
              height: "600px",
              width: "550px",
              backgroundColor: "#ffffff",
              border: "2px solid #dbdde1",
              color: "black",
              borderRadius: "15px",
            }}
          >
            <h3 className="text-center pt-4">
              &nbsp;
              <span style={{ textDecoration: "none", color: "black" }}>
                <img
                  style={{ height: "100px", width: "150px" }}
                  src="https://cdn.vox-cdn.com/thumbor/8tLchaDMIEDNzUD3mYQ7v1ZQL84=/0x0:2012x1341/920x613/filters:focal(0x0:2012x1341):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg"
                  alt="Gmail"
                />
              </span>
            </h3>
            <h5 className="text-center">Sign in</h5>
            <p className="text-center">to continue to Gmail</p>
            <input
              className="form-control form-group shadow-none gmail_icon "
              id="email"
              style={{ margin: "0 auto", width: "70%", height: "10%" }}
              type="email"
              name="email"
              placeholder="Email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red", marginLeft: "85px" }}>
                {formik.errors.email}
              </div>
            ) : null}
            <br></br>
            <input
              className="form-control form-group shadow-none password_icon"
              id="password"
              style={{ margin: "0 auto", width: "70%", height: "10%" }}
              type="password"
              name="password"
              placeholder="Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red", marginLeft: "85px" }}>
                {formik.errors.password}
              </div>
            ) : null}
            <br></br>
            <Link
              to="/signup"
              className="text-decoration-none btn"
              style={{ color: "#3c87eb", fontSize: "18px", marginLeft: "70px" }}
            >
              Create account
            </Link>
            <input
              className="btn-primary float-right form-group form-control shadow-none"
              style={{ marginRight: "83px", width: "20%", height: "7%" }}
              type="submit"
              value="Login"
            ></input>
            <br></br>
            <div className="new text-center" style={{ marginTop: "10px" }}>
              <br></br>
              <span>Demo Credentials</span>
              <br></br>
              <span className="text-dark">Email:user@gmail.com</span>{" "}
              &nbsp;&nbsp;
              <spanp className="text-dark">Password:user@123</spanp>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;