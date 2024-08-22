import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
}

export default AppRoutes;