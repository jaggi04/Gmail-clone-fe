import React from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../src/Components/Home";
import Emailmsg from "./Components/EmailListInnerMsg";
import Emailsent from "../src/Components/EmailSent";
import EmailSentMsg from '../src/Components/EmailSentMsg'
import StarredEmail from '../src/Components/StarredEmail'
import Login from '../src/Components/Login'
import Signup from '../src/Components/Signup'

export const gmailContext = React.createContext();

function App() {

  let [favorite,setFavorite] = React.useState([]);

  let [innerMsg,setInnerMsg] = React.useState();

  let [sentMsg,setSendMsg] = React.useState();
  return (
    <>
      <BrowserRouter>
        <gmailContext.Provider value={{favorite,setFavorite,innerMsg,setInnerMsg,sentMsg,setSendMsg}}>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mail" element={<Emailmsg />} />
          <Route path="/send" element={<Emailsent />} />
          <Route path="/innermsg" element={<EmailSentMsg/>}/>
          <Route path="/favorite" element={<StarredEmail />} />
        </Routes>
        </gmailContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
 