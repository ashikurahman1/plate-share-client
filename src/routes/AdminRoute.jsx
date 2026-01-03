import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader/Loader';

const AdminRoute = ({ children }) => {
    const { user, dbUser, loading } = useAuth();
    const location = useLocation();

    if (loading || (user && !dbUser)) {
        return <Loader />;
    }

    if (user && dbUser?.role === 'admin') {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
