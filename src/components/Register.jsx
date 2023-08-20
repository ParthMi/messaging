import React,{useState,useEffect} from 'react';
import "../context/Firebase"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {getDatabase,ref,set} from "firebase/database";
import {useNavigate,Link} from "react-router-dom";

const Register = () => {
  const navigate=useNavigate();
  const auth=getAuth();
  const db=getDatabase();
  
  const [email,setEmail]=useState();
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [error,setError]=useState("");
  const [loader,setLoader]=useState(false);

  useEffect(()=>{
    if(localStorage.getItem("status")==="1"){
      navigate("/Home");
    }
  })

  const putuser=(user)=>{
  set(ref(db,"user/"+user.uid),{
        uid:user.uid,
        username:username,
        email:email,
        status:"offline"
      });
      navigate("/")
    }
    const signupUser = async (e) => {
      e.preventDefault()
      setLoader(true)
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoader(false);
            const user = userCredential.user.uid;
            console.log(user);
            putuser(userCredential.user)
           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.log(errorCode, errorMessage);
 
        });
 
   
    }

  return (
    <div>
        <div class="container mt-5 p-5">
        <h1>Hello !</h1><br></br>
      <form onSubmit={signupUser}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" 
    value={email}
    onChange={e => setEmail(e.target.value)}
    class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter email' required/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>

    <input 
    value={password}
    onChange={e => setPassword(e.target.value)}
    type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter password' required/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Enter username</label>
    <input 
    value={username}
    onChange={e => setUsername(e.target.value)}
    type="text" class="form-control" id="exampleInputPassword" placeholder='Enter username' required/>
  </div>
  <button type="submit" class="btn btn-dark w-100">
    {
      loader===true?
      <div class="spinner-border text-light" role="status">
    </div>:
     <span>Sign up</span>
    } 

</button>

  <center style={{color :`red`}}>{error}</center>
  <hr></hr>
  Already have an account ? <Link to="/" class="text-decoration-none">Login</Link>

</form>
    </div>
    <div class="fixed-bottom mb-5">
  <center><a href="https://github.com/ParthMi"><img style={{width:"40px"}} src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" /></a></center>
</div>
    </div>
  )
}

export default Register
