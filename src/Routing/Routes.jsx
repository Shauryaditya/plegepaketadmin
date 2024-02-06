import React from 'react';
import { BrowserRouter as Router, Route,Routes, useLocation } from 'react-router-dom';

// Import your components for each route
import Dashboard from '../admin-panel/Dashboard/Dashboard';
import Layout from './Layout';
import Sidebar from '../components/Sidebar';

const MainRoutes = () => {
  const PreserveLocation = ({ children }) => {
    const location = useLocation();
    return children(location);
  };

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    return(
        <Layout 
        sidebar = {<Sidebar/>}
            content = {<Element />}
        />
      )
  }



  return (
    <Router>
      <PreserveLocation>
        {(location) => (
          <Routes location={location}>
            <Route exact path="/dashboard"  element={<ProtectedRoute element={Dashboard} />} />
          </Routes>
        )}
      </PreserveLocation>
    </Router>
  );
}

export default MainRoutes;
