import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = () => {
    const { user, loading } = useAuth();

    // Chờ Supabase kiểm tra phiên đăng nhập
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Đang kiểm tra đăng nhập...
            </div>
        );
    }

    // Đã đăng nhập thì không cho vào Login/Register
    if (user) {
        return <Navigate to="/home" replace />;
    }

    // Chưa đăng nhập thì cho phép truy cập
    return <Outlet />;
};

export default PublicRoute;
