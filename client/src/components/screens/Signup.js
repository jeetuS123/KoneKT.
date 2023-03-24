import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const SignIn  = ()=>{
   const navigate = useNavigate()
   const[name,setName]=useState("")
   const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")
const PostData=()=>{
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
    return
}
   
   fetch("http://localhost:5000/signup",{
    method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,
        password,
        email
        
    })
}).then(res=>res.json())
.then(data=>{
  if(data.error){
    M.toast({html: data.error,classes:"#c62828 red darken-3"})
 }
 else{
     M.toast({html:data.message,classes:"#43a047 green darken-1"})
     navigate('/signin')
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
      placeholder='name'
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
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
        signup
      </button>

      <h5>
        <Link to="/signin">Already have an acount?</Link>
      </h5>
      </div>
      </div>
   )
}


export default SignIn