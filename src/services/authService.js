import { supabase } from '../Lib/supabaseClient';

// Đăng ký tài khoản
export const registerUser = async (fullName, email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
            data: {
                full_name: fullName.trim(),
            },
        },
    });

    if (error) throw error;

    return data;
};

// Đăng nhập
export const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
    });

    if (error) throw error;

    return data;
};

// Lấy session hiện tại
export const getCurrentSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session;
};

// Đăng xuất
export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
};

//get user hiện tại
export const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
};
