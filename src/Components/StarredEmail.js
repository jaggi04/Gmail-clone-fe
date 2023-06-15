import React from 'react'
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import {gmailContext} from '../App'
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
function StarredEmail() {

  let context = React.useContext(gmailContext)

  console.log(context.favorite)
  let navigate = useNavigate();
  

  let removeFavorite = (e) => {
    if(context?.favorite){
      context?.favorite?.splice(context?.favorite?.indexOf(e),1)
      context?.setFavorite(context?.favorite)
    }
  }

  
  return<> 
  <Header />
      <Sidebar />
  <div className="mt-2" style={{ marginLeft: "270px" }}>
    <div>
      {context?.favorite?.map((e,i)=>{
        return <div key={i}>
              <div className="email">
                <div className="left_part">
                  <input
                    type="checkbox"
                    style={{ height: "20px", width: "20px" }}
                  ></input>
                  <button
                    className="btn shadow-none"
                    onClick={()=> removeFavorite(e)}
                  >
                    <StarBorderIcon/>
                  </button>

                  <h4
                    className="pt-2 pl-4"
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      context.innerMsg = e;
                    navigate("/mail");
                    }}
                  >
                    {e.to}
                  </h4>
                </div>

                <div className="middle_part" onClick={() => {
                      context.innerMsg = e;
                    navigate("/mail");
                    }}>
                  <div className="msg">
                    <p className="pt-3">
                      <b>{e.subject}&nbsp;-&nbsp;</b>
                      {e.message}
                    </p>
                  </div>
                </div>
                <div className="right_part pt-3">
                  <p style={{ color: "black", fontWeight: "bold" }}>2:30 PM</p>
                </div>
              </div>
        </div>
      })}
    </div>
  </div>
  </>
}

export default StarredEmail