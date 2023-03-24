import React,{useContext} from "react";
import {Link,useNavigate} from 'react-router-dom'
import { UserContext } from "../App";
const Navbar=()=>{
    const {state,dispatch}=useContext(UserContext);
    const navigate=useNavigate();
    const renderList=()=>{
      if(state){
        return[
        <li><Link to="/profile">profile</Link></li>,
        <li><Link to="/creatPost">creat-post</Link></li>,
        <li>
        <button className="btn #d50000 red accent-4" 
          onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            navigate('/signin')
          }}
      >
        logout
      </button>
        </li>
        ]
      }
      else{
        return[
        <li><Link to="/signin">signin</Link></li>,
        <li><Link to="/signup">signup</Link></li>
        ]
      }
    }
    return(
    <nav>
    <div className="nav-wrapper white">
      <Link to={(state)?"/":"/signin"} className="brand-logo left">KoneKt</Link>
      <ul id="nav-mobile" className="right ">
        {renderList()}
      </ul>
      </div>
    </nav>
        
    );
}

export default Navbar