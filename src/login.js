import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { SetRole, SetUser } from "./reducers/user/UserActions";

function Login() {
  const navigate = useNavigate();
  const [User, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const callUserComponent = (event) => {
    setUserName(event.target.value);
    // console.log("user", userName);
  };

  const callPassComponent = (event) => {
    setPassword(event.target.value);
    // console.log("pass", password);
  };

  dispatch(SetUser(User));
  const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:2000/userlogin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const checkUser = async () => {
    try {
      setLoading(true);
      const response = await api.post("", { User, Password });
      console.log("response", response);
      dispatch(SetRole(response.data.role));
      if (response.data.message === "User Logged-in Successfully.") {
        navigate("/dashboard");
      } else {
        alert("Incorrect ID or Password");
      }
      setLoading(false);
    } catch (e) {
      setPassword("");
      console.log(e);
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <img src={logo} style={{ width: "300px" }} alt="logo" />
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-6"
        action=""
      >
        <label className="font-semibold text-xs" for="usernameField">
          Nuance ID
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          onChange={(event) => callUserComponent(event)}
        />
        <label className="font-semibold text-xs mt-3" for="passwordField">
          Password
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          onChange={(event) => callPassComponent(event)}
        />
        <a
         
          style={{ cursor: "pointer" }}
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          onClick={checkUser}
        >
          Login
        </a>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => {
          console.log("test98");
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Login;
