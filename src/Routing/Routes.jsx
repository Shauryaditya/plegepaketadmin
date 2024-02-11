import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route,Routes, useLocation,useNavigate } from 'react-router-dom';

// Import your components for each route
import Dashboard from '../admin-panel/Dashboard/Dashboard';
import Layout from './Layout';
import Sidebar from '../components/Sidebar';
import Login from '../admin-panel/auth/Login';
import Header from '../components/Header';
import Products from '../admin-panel/product-list/Products';
import AddProduct from '../admin-panel/add-product/AddProduct';
import Complience from '../admin-panel/add-complience/AddComplience';
import ProfileSetting from '../admin-panel/profile-setting/ProfileSetting';

const MainRoutes = () => {
  const PreserveLocation = ({ children }) => {
    const location = useLocation();
    return children(location);
  };

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      let storedIsLogin = localStorage.getItem("isLogin");
      if (!storedIsLogin) {
        navigate("/");
      }
      setIsLogin(storedIsLogin);
    }, [navigate]);
    return(
      isLogin && (
        <Layout 
         sidebar = {<Sidebar/>}
         header = {<Header />}
         content = {<Element />}
        />
      )
      )
  }

  return (
    <Router>
      <PreserveLocation>
        {(location) => (
          <Routes location={location}>
            <Route path='/'  element={<Login />} />
            <Route exact path="/dashboard"  element={<ProtectedRoute element={Dashboard} />} />
            <Route exact path="/product-list"  element={<ProtectedRoute element={Products} />} />
            <Route exact path="/add-product"  element={<ProtectedRoute element={AddProduct} />} />
            <Route exact path="/profile-setting"  element={<ProtectedRoute element={ProfileSetting} />} />
            <Route exact path="/add-complience"  element={<ProtectedRoute element={Complience} />} />
          </Routes>
        )}
      </PreserveLocation>
    </Router>
  );
}

export default MainRoutes;
