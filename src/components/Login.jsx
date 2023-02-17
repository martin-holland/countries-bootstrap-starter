import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../auth/firebase";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return;
        if(user) navigate("/countries");
    },[user, loading])

    return (
    <div>
        <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder = "Email"
        />
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder = "Password"
        />
        <Button onClick={() => logInWithEmailAndPassword(email, password)}>Login</Button>
        <div>Don't have an account? {" "}
            <Link to="/register">Register</Link>
        </div>
    </div>
    )
}

export { Login };

