import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";

const Login = () => {

    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (authService.isLoggedIn()) {
            navigate(routerPath.CREATE_USER);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const res = await authService.login(email, passowrd);
            console.log(res);
            navigate(routerPath.CREATE_USER);
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div className="page-login">
            <div className="container">
                <h1>Login Page</h1>
                <div className="form-group mb-3">
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group mb-3">
                    <input type="password" className="form-control" value={passowrd} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p>{error}</p>}
                <button type="button" onClick={handleLogin} className="btn btn-success">Login</button>
            </div>
        </div>
    );
}

export default Login;