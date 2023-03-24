import React,{useEffect,useState,useContext} from 'react'


const Profile  = ()=>{
    
   return (
      <div style={{maxWidth:"550px",margin:"0px auto"}} >
        <div style={{
                display:'flex',
                justifyContent:'space-around',
                margin:"18px 0px",
                borderBottom:"1px solid gray",

               }}>
            <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                   />
            </div>
            <div>
                   <h4>jitendra Kumar</h4>
                   <h5>jtnskkk</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>4 posts</h6>
                       <h6>5 followers</h6>
                       <h6>6 following</h6>
                    </div>
            </div>
        </div>
        <div className="gallery">
        <img  className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                   />
        <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                   />
         <img className="item" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                   />       
           </div>
      </div>
   )
}


export default Profile