import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {gmailContext} from '../App'
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavDropdown } from "react-bootstrap";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";


function EmailSent() {

  let context = React.useContext(gmailContext)
  let navigate = useNavigate();
  let [data, setData] = useState([]);

  let getData = async () => {
    let res = await axios.get("https://gmailcloneapp.herokuapp.com/users/allsendmsglist");
    setData(res.data.data.reverse());
  };

  useEffect(() => {
    getData();
  },[]);


  let deleteurl = "https://gmailcloneapp.herokuapp.com/users/sendmsgdelete/"

  let deleteData = async(id,e) => {
    try {
      let del =await  axios.delete(deleteurl + id)
      if(del.status === 200){
        getData()
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  function selects() {
    var ele = document.getElementsByName("chk");
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type === "checkbox") ele[i].checked = !ele[i].checked;
    }
  }
  
  return <>   
    <Header />
      <Sidebar />
   <div className="mt-2" style={{ marginLeft: "270px" }}>
    <div className="d-flex">
    <input
          type="checkbox"
          style={{
            height: "20px",
            width: "20px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
          onClick={selects}
        ></input>
        <RefreshIcon
          style={{
            height: "25px",
            width: "25px",
            marginLeft: "20px",
            marginBottom: "20px",
            color: "grey",
            cursor: "pointer",
          }}
        />
        <NavDropdown
          align="start"
          style={{
            height: "25px",
            width: "25px",
            marginLeft: "10px",
            marginTop: "-10px",
          }}
          title={
            <MoreVertIcon style={{ textDecoration: "none", color: "grey" }} />
          }
          id="navbarScrollingDropdown"
          className="dropdown-toogle"
        >
          <NavDropdown.Item>Mark All as Read</NavDropdown.Item>
        </NavDropdown>
    </div>
      {data.map((e, i) => {
        return (
          <div key={i} >
            <div>
              <div className="email">
                <div className="left_part">
                  <input
                    type="checkbox"
                    name="chk"
                    style={{ height: "20px", width: "20px" }}
                  ></input>
                  <button
                    className="btn shadow-none"
                    onClick={()=> {
                      context.favorite.push(e);
                    }}  
                    
                  >
                    <StarBorderIcon />
                  </button>

                  <h4
                    className="pt-2 pl-4"
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      context.sentMsg = e;
                      navigate("/innermsg");
                    }}
                  >
                    {e.to}
                  </h4>
                </div>

                <div className="middle_part" onClick={() => {
                      context.sentMsg = e;
                      navigate("/innermsg");
                }}>
                  <div className="msg">
                    <p className="pt-3">
                      <b>{e.subject}&nbsp;-&nbsp;</b>
                      {e.message}
                    </p>
                  </div>
                </div>

                <div className="right_part pt-3">
                  <p  style={{ color: "black", fontWeight: "bold",width: "400px"}}>{e.time}</p>
                  <DeleteIcon onClick={()=>deleteData(e._id)}
                    style={{ marginBottom: "20px", marginLeft: "20px",color:"grey" }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </>

}

export default EmailSent;
