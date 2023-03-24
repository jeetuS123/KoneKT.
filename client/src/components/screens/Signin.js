import React,{useState,useContext} from 'react'
import { json, Link ,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'

const SignIn  = ()=>{
  const {state,dispatch} =useContext(UserContext);
  const navigate = useNavigate()
  
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
const PostData=()=>{
 if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
   M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
   return
}
  
  fetch("http://localhost:5000/signin",{
   method:"post",
   headers:{
       "Content-Type":"application/json"
   },
   body:JSON.stringify({
       
       password,
       email
       
   })
}).then(res=>res.json())
.then(data=>{
  console.log(data)
 if(data.error){
   M.toast({html: data.error,classes:"#c62828 red darken-3"})
}
else{
    M.toast({html:"successfully signed in",classes:"#43a047 green darken-1"})
    localStorage.setItem("jwt",data.token)
    localStorage.setItem("user",JSON.stringify(data.user))
    dispatch({type:"USER",payload:data.user})
    navigate('/')
}
})
.catch(err=>{
 console.log(err)
})
}
   return (
    <div className='mycard'>
    <div className='card auth-card input-field'>
      <h2>KoneKt</h2>
      <input
      type="text"
      placeholder='email'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <input
      type="password"
      placeholder='password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
      onClick={()=>PostData()}
      >
        signin
      </button>
      <h5>
        <Link to="/signup">doesn`t have an acount?</Link>
      </h5>
      </div>
      </div>
   )
}


export default SignIn