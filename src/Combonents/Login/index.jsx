import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Registration from "./Registration";
import { useState } from "react";
import './login.css';
function Index() {
    
    const [currentform,setCorentform]=useState("login")
    const toggileForm=(formName)=>{
     setCorentform(formName)
     
    };
     return (
       
       <div className="App">
       
   {currentform ==='login' ? <Login onFormSwitch={toggileForm}/> : <Registration onFormSwitch={toggileForm}/>}
       
       </div>
     
     );
}

export default Index