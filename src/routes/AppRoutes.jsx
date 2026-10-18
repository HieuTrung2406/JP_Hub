import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Home from '../Pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../components/MainLayout';
import PageTest from '../Pages/PageTest/PageTest';

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC ROUTES - chỉ dành cho người chưa login */}
            <Route element={<PublicRoute />}></Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTECTED ROUTES - yêu cầu login */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/test" element={<PageTest />} />
                    <Route path="/home" element={<Home />} />
                </Route>
            </Route>

            {/* Trang không tồn tại */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
