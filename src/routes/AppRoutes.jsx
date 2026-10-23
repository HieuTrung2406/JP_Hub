import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Home from '../Pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../components/MainLayout';
import Account from '../Pages/Account/Account';
import AiSensei from '../Pages/AiSensei/AiSensei';

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC ROUTES - chỉ dành cho người chưa login */}
            <Route element={<PublicRoute />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* PROTECTED ROUTES - yêu cầu login */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/sensei" element={<AiSensei />} />
                    <Route path="/sensei/:chatId" element={<AiSensei />} />
                </Route>
            </Route>

            {/* Trang không tồn tại */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    );
};

export default AppRoutes;
