import React, { useState } from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import Popup from "../Components/Popup";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {Link} from 'react-router-dom'

function Sidebar(props) {
  const Plus =
    "https://www.gstatic.com/images/icons/material/colored_icons/2x/create_32dp.png";

  let [buttonPopup, setButtonPopup] = useState(false);

    
  return (
    <>
      <div className="sidebar" style={{ marginTop: "65px" }}>
        <button
          onClick={() => setButtonPopup(true)}
          className="btn ml-2 compose"
          style={{
            backgroundColor: "white",
            borderRadius: "50px",
            boxShadow: "0 0 10px grey",
            height: "50px",
            width: "150px",
          }}
        >
          <img src={Plus} alt="" style={{ width: "32px", height: "32px" }} />
          &nbsp;&nbsp;Compose
        </button>

        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <p
            className="first-msg p-3"
            style={{
              backgroundColor: "#404040",
              height: "60px",
              color: "white",
              cursor: "pointer",
            }}
          >
            new message
          </p>
        </Popup>

        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip-2">Inbox</Tooltip>}
        >
          <div
            style={{
              // background: "rgba(252, 232, 230, 255)",
              borderTopRightRadius: "50px",
              borderBottomRightRadius: "50px",
            }}
          >
            <Link to="/home" className="mt-3">
              <InboxIcon /> &nbsp;&nbsp;Inbox
            </Link>
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip-2">Starred</Tooltip>}
        >
          <div>
            <Link to="/favorite" className="hoverEffect">
              <StarIcon /> &nbsp;&nbsp;Starred
            </Link>
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip-2">Sent</Tooltip>}
        >
          <div className="hoverEffect">
            <Link to="/send">
              <SendIcon /> &nbsp;&nbsp;Sent
            </Link>
          </div>
        </OverlayTrigger>
      </div>
    </>
  );
}

export default Sidebar;
