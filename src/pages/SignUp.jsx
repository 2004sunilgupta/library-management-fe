import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useEffect } from "react";
import { routerPath } from "../constants/routerConstant";

const SignUp = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        if(authService.isLoggedIn()) {
            navigate(routerPath.CREATE_USER);
        }
    }, []);

    return (
        <div className="page-signup">
            <div className="container">
                <h1>SignUp Page</h1>
            </div>
        </div>
    );
}

export default SignUp;