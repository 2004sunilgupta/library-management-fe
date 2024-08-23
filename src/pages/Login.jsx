import { useState } from "react";
import { authService } from "../services/authService";
import { Navigate } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";

const Login = () => {

    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');
    const [error, setError] = useState('');
    

    // const handleOnChange = (e) => {
    //     const {value, type} = e.target.value;
    //     if(type === 'email') {
    //         setEmail(value);
    //     }
    //     if(type === 'password') {
    //         setPassword(value);
    //     }
    // }

    const handleLogin = async () => {
        try {
            const res = await authService.login(email, passowrd);
            debugger
            console.log(res);
            Navigate(routerPath.LOGIN);
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div className="page-login">
            <div className="container">
                <h1>Login Page</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <br/>
                <input type="password" value={passowrd} onChange={(e) => setPassword(e.target.value)} required/> 
                <br/>
                {error && <p>{error}</p>}
                <button type="button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;