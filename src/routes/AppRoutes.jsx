import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp"
import { routerPath } from "../constants/routerConstant";
import PrivateRoutes from "./PrivateRoutes";
import CreateUser from "../pages/CreateUser";
import { useAuth } from "../hooks/useAuth";

const AppRoutes = () => {
    const {isAuthenticated} = useAuth();
    return (
        <Routes>
            {/* Default Routes */}
            <Route path="/" element={isAuthenticated ? <CreateUser/> : <Navigate to={routerPath.LOGIN}/>}/>
            {/* Public Routes */}
            <Route path={routerPath.LOGIN} element={<Login/>}/>
            <Route path={routerPath.SIGN_UP} element={<SignUp/>}/>
            {/* Private Routes */}
            <Route path={routerPath.CREATE_USER} 
            element={
                <PrivateRoutes>
                    <CreateUser/>
                </PrivateRoutes>
            } />
            {/* Handling Fallback routes */}
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
}

export default AppRoutes;