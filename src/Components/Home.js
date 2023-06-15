import React, { useEffect } from "react";
import Tabs from "../Components/Tabs";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  },[]);
  

  useEffect(() => {
    checkToken()
  })

  let checkToken = () => {
    let token = sessionStorage.getItem("token");
    if(token){
      navigate("/home");
    }
    else
    {
      navigate("/")
    }
  }

  let checkAuth = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let config = {
        headers: {
          token: token,
        },
      };
      // Post data to url
      let res = await axios.post(
        "https://gmailcloneapp.herokuapp.com/users/auth",
        {
          Purpose: "Approve",
        },
        config
      );
      if (res.data.statusCode !== 200) {
        alert("Session Ended");
        sessionStorage.clear();
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: "260px" }}>
        <div className="mt-3">
          <Tabs />
        </div>
      </div>
    </>
  );
}

export default Home;
