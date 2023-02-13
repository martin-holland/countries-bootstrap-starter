import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "../auth/firebase";

const auth = getAuth(app)

const Signup = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState()


  const sendSignup = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user
      setUser(user)
    })
  }

  console.log("User: ", user)

  return (
    <div className="">
    <div className="form">
      <p>Signup
      </p>
      <form className="Signup-form">
        <input type="text" placeholder="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" required  onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={(e) => sendSignup(e)}>Signup</button>
      </form>  
    </div>
  </div>
  );
};

export { Signup };
