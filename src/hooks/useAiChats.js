import { useEffect, useState } from 'react';
import { getChatMessages, getChats } from '../services/aiSenseiService';

export const formatMessage = item => ({
    ...item,
    time: new Date(item.created_at).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
    }),
});

export const formatChat = item => ({
    ...item,
    date: new Date(item.updated_at).toLocaleDateString('vi-VN'),
    messages: [],
});

export const useAiChats = chatId => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const chatList = await getChats();

                const chatMessages = chatId ? await getChatMessages(chatId) : [];

                if (cancelled) return;

                setChats(prev =>
                    chatList.map(chat => ({
                        ...formatChat(chat),
                        messages:
                            chat.id === chatId
                                ? chatMessages.map(formatMessage)
                                : prev.find(c => c.id === chat.id)?.messages ?? [],
                    }))
                );
            } catch (err) {
                if (!cancelled) {
                    console.error('Load AI Chats Error:', err);
                    setError(err);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadData();

        return () => {
            cancelled = true;
        };
    }, [chatId]);

    const currentChat = chats.find(chat => chat.id === chatId);

    return {
        chats,
        setChats,
        messages: currentChat?.messages ?? [],
        loading,
        error,
    };
};
