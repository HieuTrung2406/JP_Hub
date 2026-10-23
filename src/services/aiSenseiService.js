import { supabase } from '../Lib/supabaseClient';

export const askAiSensei = async (content, mode, history = []) => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
        throw new Error('Vui lòng đăng nhập để sử dụng AI Sensei');
    }

    const { data, error } = await supabase.functions.invoke('ai-sensei', {
        body: {
            message: content,
            mode,
            history,
        },
    });

    if (error) {
        let errorMessage = error.message;

        if (error.context instanceof Response) {
            try {
                const result = await error.context.json();
                errorMessage = result.error || errorMessage;
            } catch {
                // Không đọc được response JSON
            }
        }

        throw new Error(errorMessage);
    }

    if (!data?.reply) {
        throw new Error('AI không trả về nội dung');
    }

    return data.reply;
};

// 1. Lấy danh sách chat của user đang đăng nhập
export const getChats = async () => {
    const { data, error } = await supabase
        .from('ai_chats')
        .select('*')
        .eq('is_deleted', false)
        .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const createChat = async title => {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error('Bạn chưa đăng nhập');
    }

    const { data, error } = await supabase
        .from('ai_chats')
        .insert({
            user_id: user.id,
            title: title || 'Cuộc trò chuyện mới',
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

// 3. Lấy tin nhắn của một chat
export const getChatMessages = async chatId => {
    const { data, error } = await supabase
        .from('ai_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })
        .order('id', { ascending: true });

    if (error) throw error;
    return data;
};

// 4. Lưu tin nhắn
export const saveMessage = async (chatId, role, content) => {
    const { data, error } = await supabase
        .from('ai_messages')
        .insert({
            chat_id: chatId,
            role,
            content,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

// 5. Xóa logic cuộc trò chuyện
export const deleteChat = async chatId => {
    const { error } = await supabase
        .from('ai_chats')
        .update({
            is_deleted: true,
            deleted_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq('id', chatId);

    if (error) throw error;

    return true;
};
