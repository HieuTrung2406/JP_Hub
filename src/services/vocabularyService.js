import { supabase } from '../Lib/supabaseClient';

// Lấy danh sách từ vựng theo cấp độ
export const getVocabularyByLevel = async level => {
    const { data, error } = await supabase
        .from('vocabulary')
        .select(
            `
            id,
            word,
            reading,
            meaning_vi,
            example_jp,
            example_vi,
            jlpt_level
        `
        )
        .eq('jlpt_level', level)
        .order('id', { ascending: true });

    if (error) throw error;

    return data ?? [];
};

// Lấy trạng thái học của user
export const getVocabularyProgress = async () => {
    const { data, error } = await supabase
        .from('user_vocabulary_progress')
        .select('vocabulary_id, status');

    if (error) throw error;

    return data ?? [];
};

// Lưu trạng thái đã thuộc / chưa thuộc
export const saveVocabularyProgress = async (vocabularyId, status) => {
    const { error } = await supabase.from('user_vocabulary_progress').upsert(
        {
            vocabulary_id: vocabularyId,
            status,
            updated_at: new Date().toISOString(),
        },
        {
            onConflict: 'user_id,vocabulary_id',
        }
    );

    if (error) throw error;
};

// Xóa từ khỏi danh sách chưa thuộc
export const deleteVocabularyProgress = async (userId, vocabularyId) => {
    const { error } = await supabase
        .from('user_vocabulary_progress')
        .delete()
        .eq('user_id', userId)
        .eq('vocabulary_id', vocabularyId);

    if (error) throw error;
};
