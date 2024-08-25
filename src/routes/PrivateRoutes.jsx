import { useNavigate } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";
import { authService } from "../services/authService";
import MainLayout from "../layout/MainLayout";

const PrivateRoutes = ({children, path}) => {
    const navigate = useNavigate();
    if (!authService.isLoggedIn()) {
        navigate(routerPath.LOGIN);
    }
    return <MainLayout children={children}/>;
}

export default PrivateRoutes;