import { ConfigProvider } from 'antd';
import { antdTheme } from './config/theme';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <ConfigProvider theme={antdTheme}>
            <BrowserRouter>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
