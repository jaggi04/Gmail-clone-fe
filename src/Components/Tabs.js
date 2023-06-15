import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavDropdown } from "react-bootstrap";
import { gmailContext } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  let navigate = useNavigate();

  let context = React.useContext(gmailContext);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let jump = () => {
    navigate("/mail");
  };

  let [primary, setPrimary] = React.useState([]);
  let [social, setSocial] = React.useState([]);
  let [promotion, setPromotion] = React.useState([]);

  let getData = async () => {
    let res = await axios.get("https://gmailcloneapp.herokuapp.com/users/primary");
    let sres = await axios.get("https://gmailcloneapp.herokuapp.com/users/social");
    let pres = await axios.get("https://gmailcloneapp.herokuapp.com/users/promotion");
    setPrimary(res.data.data.reverse());
    setSocial(sres.data.data.reverse());
    setPromotion(pres.data.data.reverse());
  };

  React.useEffect(() => {
    getData();
  }, []);

  function selects() {
    var ele = document.getElementsByName("chk");
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type === "checkbox") ele[i].checked = !ele[i].checked;
    }
  }

  let deleteurl = "https://gmailcloneapp.herokuapp.com/users/inboxdelete/";

  let deleteData = async (id, e) => {
    try {
      let del = await axios.delete(deleteurl + id);
      if (del.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  let refresh = () => {
    getData();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="d-flex">
        <input
          type="checkbox"
          style={{
            height: "20px",
            width: "20px",
            marginLeft: "35px",
            cursor: "pointer",
          }}
          onClick={selects}
        ></input>
        <RefreshIcon
          onClick={() => refresh()}
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

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Primary" {...a11yProps(0)} />
          <Tab label="Social" {...a11yProps(1)} />
          <Tab label="Promotion" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {primary.map((e, i) => {
          return (
            <div key={i}>
              <div className="email">
                <div className="left_part">
                  <input
                    type="checkbox"
                    name="chk"
                    style={{ height: "20px", width: "20px" }}
                  ></input>
                  <button
                    className="btn shadow-none"
                    onClick={() => {
                      context.favorite.push(e);
                    }}
                  >
                    <StarBorderIcon />
                  </button>

                  <p
                    className="pt-3 pl-4"
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                    onClick={() => {
                      context.innerMsg = e;
                      navigate("/mail");
                    }}
                  >
                    {e.to}
                  </p>
                </div>

                <div
                  className="middle_part"
                  onClick={() => {
                    context.innerMsg = e;
                    navigate("/mail");
                  }}
                >
                  <div className="msg">
                    <p className="pt-3">
                      <b>{e.subject}&nbsp;-&nbsp;</b>
                      {e.message}
                    </p>
                  </div>
                </div>

                <div className="right_part pt-3">
                  <p style={{ color: "black", fontWeight: "bold" }}>2:30 PM</p>
                  <DeleteIcon
                    onClick={() => deleteData(e._id)}
                    style={{
                      marginBottom: "20px",
                      marginLeft: "20px",
                      color: "grey",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {social.map((e, i) => {
          return (
            <div key={i}>
              <div className="email">
                <div className="left_part">
                  <input
                    type="checkbox"
                    style={{ height: "20px", width: "20px" }}
                  ></input>
                  <button
                    className="btn shadow-none"
                    onClick={() => {
                      context.favorite.push(e);
                    }}
                  >
                    <StarBorderIcon />
                  </button>

                  <p
                    className="pt-3 pl-4"
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                    onClick={() => {
                      context.innerMsg = e;
                      navigate("/mail");
                    }}
                  >
                    {e.to}
                  </p>
                </div>

                <div className="middle_part" onClick={() => jump()}>
                  <div className="msg">
                    <p className="pt-3">
                      <b>{e.subject}&nbsp;-&nbsp;</b>
                      {e.message}
                    </p>
                  </div>
                </div>

                <div className="right_part pt-3">
                  <p style={{ color: "black", fontWeight: "bold" }}>2:30 PM</p>
                  <DeleteIcon
                    onClick={() => deleteData(e._id)}
                    style={{
                      marginBottom: "20px",
                      marginLeft: "20px",
                      color: "grey",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {promotion.map((e, i) => {
          return (
            <div key={i}>
              <div className="email">
                <div className="left_part">
                  <input
                    type="checkbox"
                    style={{ height: "20px", width: "20px" }}
                  ></input>
                  <button
                    className="btn shadow-none"
                    onClick={() => {
                      context.favorite.push(e);
                    }}
                  >
                    <StarBorderIcon />
                  </button>

                  <p
                    className="pt-3 pl-4"
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                    onClick={() => {
                      context.innerMsg = e;
                      navigate("/mail");
                    }}
                  >
                    {e.to}
                  </p>
                </div>

                <div
                  className="middle_part"
                  onClick={() => {
                    context.innerMsg = e;
                    navigate("/mail");
                  }}
                >
                  <div className="msg">
                    <p className="pt-3">
                      <b>{e.subject}&nbsp;-&nbsp;</b>
                      {e.message}
                    </p>
                  </div>
                </div>

                <div className="right_part pt-3">
                  <p style={{ color: "black", fontWeight: "bold" }}>2:30 PM</p>
                  <DeleteIcon
                    onClick={() => deleteData(e._id)}
                    style={{
                      marginBottom: "20px",
                      marginLeft: "20px",
                      color: "grey",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </TabPanel>
    </Box>
  );
}
