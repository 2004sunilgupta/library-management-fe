import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";
import FormInput from "../components/FormInput";
import { validateEmail } from "../utils/validation";

const Login = () => {

    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');
    const [error, setError] = useState({
        emailErr: '',
        passwordErr: '',
        errMsg: ''
    });
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
        } catch (err) {
            console.log(err.message);
            setError({...error, errMsg: "Email or Password didn't matched"});
        }
    }

    const handleEmailBlur = (value) => {
        if (!value) {
            setError({...error, emailErr: 'Please enter vemail'});
            return;
        };
        if(!validateEmail(email)) {
            setError({...error, emailErr: 'Please enter valid email'});
        } else {
            setError({...error, emailErr: ''});
        }
    }

    const handlePasswordBlur = (value) => {
        if (!value) {
            setError({...error, passwordErr: 'Please enter password'});
        } else {
            setError({...error, passwordErr: ''});
        }
    }
    
    const handleDisabled = () => {
        return error.emailErr.length || error.passwordErr.length || error.errMsg.length;
    }


    return (
        <div className="page-login">
            <div className="container">
                <h1>Login Page</h1>
                <FormInput type="email" label={'Email'} value={email} handleChange={(e) => setEmail(e.target.value)} required={true}
                validationMessage={error.emailErr} handleOnBlur={()=> handleEmailBlur(email)}/>
                <FormInput type="password" label={'Password'} value={passowrd} handleChange={(e) => setPassword(e.target.value)} required={true}
                validationMessage={error.passwordErr} handleOnBlur={()=> handlePasswordBlur(passowrd)}/>
                {error.errMsg && <p className="text-danger">{error.errMsg}</p>}
                <button type="button" onClick={handleLogin} className="btn btn-success" disabled={error.emailErr.length || error.passwordErr.length || error.errMsg.length}>Login</button>
            </div>
        </div>
    );
}

export default Login;