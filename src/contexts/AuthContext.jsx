import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../Lib/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        // Kiểm tra phiên đăng nhập khi ứng dụng khởi động
        const checkSession = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error) throw error;

                if (active) {
                    setUser(data.user);
                }
            } catch {
                if (active) {
                    setUser(null);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        checkSession();

        // Lắng nghe Login, Logout và thay đổi Session
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (!active) return;

            if (event === 'SIGNED_OUT') {
                setUser(null);
                setLoading(false);
            } else if (event === 'SIGNED_IN' && session?.user) {
                setUser(session.user);
                setLoading(false);
            } else if (event === 'USER_UPDATED' && session?.user) {
                setUser(session.user);
            }
        });

        return () => {
            active = false;
            subscription.unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth phải được sử dụng trong AuthProvider');
    }

    return context;
};
