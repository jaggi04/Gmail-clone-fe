import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom'

function Popup(props) {

  let navigate = useNavigate()
  let handleSubmit = async (values) => {
    let res = await axios.post("https://gmailcloneapp.herokuapp.com/users/sendemail",values);
    let anotheres = await axios.post("https://gmailcloneapp.herokuapp.com/users/send",values);
    props.setTrigger(false)
    formik.resetForm()
    navigate("/send")
  };

  let hour = new Date().getHours()
  let timeType;
  if(hour <= 11){
    timeType = "AM";
  }
  else {
    timeType = "PM";
  }


  if( hour > 12 )
    {
      hour = hour - 12;
    }
 
    if( hour === 0 )
    {
        hour = 12;
    } 

  // useFormik for validation
  const formik = useFormik({
    initialValues:{
      to:'',
      subject:'',
      message:'',
      time:new Date() + timeType
    },
    validationSchema:Yup.object({
      to:Yup.string().email().required("Required"), 
      subject:Yup.string().required("Required"),
      message:Yup.string().required("Required")
    }),
    onSubmit:values=>{
      handleSubmit(values)
    }
  })


  
  return (props.trigger)?(
    <div className="popup">
        <div className="popup-inner" style={{borderRadius:"10px"}}>
            <span className="close-btn btn text-white" style={{paddingBottom:"10px"}} onClick={()=> props.setTrigger(false)}><CloseIcon/></span>
            {props.children}
        <form  onSubmit={formik.handleSubmit} >
            <div>
              <input
                type="email"
                className="form-control email shadow-none p-1"
                placeholder="To"
                style={{
                  border: "none",
                  borderRadius: "0px",
                  marginLeft: "10px",
                  width: "600px",
                }}
                name="to"
                onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.to}
                />{formik.touched.to && formik.errors.to?<div style={{color:"red"}}>{formik.errors.to}</div> : null}
              <input
                type="text"
                className="form-control subject shadow-none p-1 "
                placeholder="Subject"
                style={{
                  border: "none",
                  borderRadius: "0px",
                  marginLeft: "10px",
                  width: "600px",
                }}
                name="subject"
                onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.subject}/>{formik.touched.subject && formik.errors.subject?<div style={{color:"red"}}>{formik.errors.subject}</div> : null}
              <textarea
                className="form-control message shadow-none"
                cols="0"
                rows="13"
                style={{ resize: "none", border: "none" }}
                name="message"
                onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.message}/>{formik.touched.message && formik.errors.message?<div style={{color:"red"}}>{formik.errors.message}</div> : null}
              <input type="submit"  className="btn btn-primary ml-3" value="Send"/>
            </div>
          </form>
    </div>
        </div>
  ):"";
}

export default Popup