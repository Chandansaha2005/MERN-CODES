
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


function Signup(props){
    
    const [name, setName]=useState()
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        
            e.preventDefault()
            axios.post('http://localhost:3001/register',{name, email,password})
            .then(result=>{console.log(result)
              if (result.data==="Success")
              {
                navigate("/home")   
              }
              else
              {
                navigate("/register")   
              }
    })
            .catch(err=>console.log(err))
    }

    return(
        <div className="container">
  <div className="row justify-content-center">
  <div className="col-md-5">
   <div className="card">
     <h2 className="card-title text-center">Register <a href="http://opensnippets.com">open snippets</a></h2>
      <div className="card-body py-md-4">
       <form _lpchecked="1" onSubmit={handleSubmit}>
          <div className="form-group">
             <input type="text" className="form-control" id="name" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="form-group">
             <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            
                          
   <div className="form-group">
     <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
   </div>
   <div className="d-flex flex-row align-items-center justify-content-between">
   <Link to="/login">Login</Link>
                                <button className="btn btn-primary">Create Account</button>
          </div>
       </form>
     </div>
  </div>
</div>
</div>
</div>
    );
}

export default Signup;