import React,{useEffect, useState} from 'react';
import "../context/Firebase"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate, Link} from "react-router-dom";
import { getDatabase, ref ,update } from "firebase/database";

const Login = () => {

  const auth=getAuth();
  const navigate=useNavigate();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [loader,setLoader]=useState(false);
  const [error,setError]=useState("");

  const userId=localStorage.getItem("uid")
useEffect(()=>{
  if(localStorage.getItem("status")==="1"){
    navigate("/Home");

    window.addEventListener("load", (event) => {
      event.preventDefault();
      const db = getDatabase();
      update(ref(db, 'user/'+userId+''), {
        status:"online"
      });
    });
  }
})
  const signinUser = async (e) => {
    e.preventDefault()
    setLoader(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoader(false);
          const user = userCredential.user.uid;
          localStorage.setItem("status","1");
          localStorage.setItem("uid",user);
         navigate("/Home")
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          console.log(errorCode, errorMessage);
          setLoader(false);
      });
  }




  return (
    <div class="container mt-5 p-5">
        <h1>Welcome</h1><br></br>
      <form onSubmit={signinUser}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email"
     value={email}
     onChange={e => setEmail(e.target.value)}
    class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email'/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" 
     value={password}
     onChange={e => setPassword(e.target.value)}
    class="form-control" id="exampleInputPassword1" placeholder='Enter Password'/>
  </div><br></br>
  <button type="submit" class="btn btn-dark w-100">
    {
      loader===true?
      <div class="spinner-border text-light" role="status">
    </div>:
     <span>Login</span>
    } 

</button>
<center style={{color :`red`}}>{error}</center>
  <hr></hr>
  Don't have an account yet ? <Link to="./Register" class="text-decoration-none">Sign up</Link>

</form>
<div class="fixed-bottom mb-5">
  <center><a href="https://github.com/ParthMi"><img style={{width:"40px"}} src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" /></a></center>
</div>
    </div>
  )
}

export default Login
