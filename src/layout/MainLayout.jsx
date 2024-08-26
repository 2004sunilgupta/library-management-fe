import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = ({children}) => {
    return (
        <div className="main-layout">
            <Header/>
            <div className="main-body py-4">
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default MainLayout;