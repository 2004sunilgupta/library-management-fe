import { useNavigate } from "react-router-dom"
import { authService } from "../services/authService";
import { routerPath } from "../constants/routerConstant";

const Logout = () => {
    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
        navigate(routerPath.LOGIN);
    }
    return (
        <button type="button" onClick={onLogout}>Logout</button>
    );
}

export default Logout;