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
