import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { routerPath } from "../constants/routerConstant";

const PrivateRoutes = ({children}) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to={routerPath.LOGIN}/>
}

export default PrivateRoutes;