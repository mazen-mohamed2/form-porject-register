import { Outlet, Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ unprotectedPaths = [] }) => {
  // Check if 'isLoggedIn' item exists in localStorage to determine if the user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
  const location = useLocation(); 

  // Check if the current path is in the list of unprotected paths
  const isUnprotectedRoute = unprotectedPaths.includes(location.pathname);

  // If the user is logged in or the current path is unprotected, render the Outlet (children routes)
  // Otherwise, redirect to the login page
  return isLoggedIn || isUnprotectedRoute ? <Outlet /> : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  unprotectedPaths: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
