import React, { useState, useRef, useEffect } from 'react';
import { message } from 'antd';
import { LuBookOpen, LuFileQuestion, LuPencil, LuMessagesSquare } from 'react-icons/lu';

// Thay bằng đường dẫn ảnh trong project của bạn
import ChatInput from '../../components/ChatInput';
import StudyModes from '../../components/StudyModes';
import ChatHistory from '../../components/ChatHistory';
import ChatMessages from '../../components/ChatMessages';
import {
    askAiSensei,
    createChat,
    deleteChat,
    getChatMessages,
    saveMessage,
} from '../../services/aiSenseiService';
import { useNavigate, useParams } from 'react-router-dom';
import { useAiChats, formatChat, formatMessage } from '../../hooks/useAiChats';
// import senseiBanner from '../../assets/images/sensei-banner.png';

const AiSensei = () => {
    const navigate = useNavigate();
    const { chatId } = useParams();
    const { chats, setChats, messages, loading: loadingChats, error } = useAiChats(chatId);
    const [input, setInput] = useState('');
    const [activeMode, setActiveMode] = useState('grammar');
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);
    const timerRef = useRef(null);

    const modes = [
        {
            key: 'grammar',
            title: 'Giải thích ngữ pháp',
            description: 'Hỏi về cách dùng, so sánh ngữ pháp...',
            icon: <LuBookOpen size={24} />,
            color: '#3977f6',
            bg: '#eff5ff',
            prompt: 'Giải thích giúp tôi ngữ pháp ～わりに kèm ví dụ.',
        },
        {
            key: 'jlpt',
            title: 'Giải bài JLPT',
            description: 'Phân tích đáp án, giải thích chi tiết...',
            icon: <LuFileQuestion size={24} />,
            color: '#a276f5',
            bg: '#f6f0ff',
            prompt: 'Hãy giải thích câu hỏi JLPT sau:\n',
        },
        {
            key: 'correct',
            title: 'Sửa câu tiếng Nhật',
            description: 'Kiểm tra và sửa lỗi diễn đạt tự nhiên...',
            icon: <LuPencil size={24} />,
            color: '#3985f6',
            bg: '#eff6ff',
            prompt: 'Hãy sửa câu tiếng Nhật sau và giải thích lỗi:\n',
        },
        {
            key: 'kaiwa',
            title: 'Luyện hội thoại',
            description: 'Đóng vai tình huống thực tế...',
            icon: <LuMessagesSquare size={24} />,
            color: '#3f7af5',
            bg: '#eff5ff',
            prompt: 'Hãy đóng vai người phỏng vấn IT Nhật Bản.',
        },
    ];

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, chatId]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleSelectMode = mode => {
        setActiveMode(mode.key);
        setInput(mode.prompt);
    };

    const handleNewChat = () => {
        navigate('/sensei');
        setInput('');
    };

    const handleViewMore = () => {
        message.info('Đang hiển thị toàn bộ lịch sử mẫu');
    };

    const handleDeleteChat = async id => {
        try {
            await deleteChat(id);

            setChats(prev => prev.filter(chat => chat.id !== id));

            if (chatId === id) {
                navigate('/sensei', { replace: true });
            }

            message.success('Đã xóa cuộc trò chuyện');
        } catch (error) {
            message.error('Không thể xóa cuộc trò chuyện');
        }
    };

    //chọn chay bất kì
    const handleSelectChat = id => {
        navigate(`/sensei/${id}`);
        setInput('');
    };

    const handleSend = async () => {
        const content = input.trim();

        if (!content || loading || loadingChats) return;

        let currentChatId = chatId;
        const mode = activeMode;

        setLoading(true);
        setInput('');

        try {
            // 1. Tạo chat mới nếu chưa có chatId
            if (!currentChatId) {
                const newChat = await createChat(content.slice(0, 40));

                currentChatId = newChat.id;

                setChats(prev => [formatChat(newChat), ...prev]);

                navigate(`/sensei/${currentChatId}`, {
                    replace: true,
                });
            }

            // 2. Lấy lịch sử chat từ Supabase
            const oldMessages = await getChatMessages(currentChatId);

            const history = oldMessages.map(item => ({
                role: item.role,
                content: item.content,
            }));

            // 3. Lưu tin nhắn user vào Supabase
            const userMessage = await saveMessage(currentChatId, 'user', content);

            // 4. Hiển thị tin nhắn user
            setChats(prev =>
                prev.map(chat =>
                    chat.id === currentChatId
                        ? {
                              ...chat,
                              messages: [
                                  ...oldMessages.map(formatMessage),
                                  formatMessage(userMessage),
                              ],
                          }
                        : chat
                )
            );

            // 5. Gọi Groq AI
            const reply = await askAiSensei(content, mode, history);

            // 6. Lưu phản hồi AI vào Supabase
            const aiMessage = await saveMessage(currentChatId, 'assistant', reply);

            // 7. Hiển thị phản hồi AI
            setChats(prev =>
                prev.map(chat =>
                    chat.id === currentChatId
                        ? {
                              ...chat,
                              messages: [...chat.messages, formatMessage(aiMessage)],
                          }
                        : chat
                )
            );
        } catch (error) {
            console.error('AI Sensei Error:', error);
            message.error(error.message || 'Không thể gửi tin nhắn');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-90px)] min-h-[650px] gap-4 bg-[#f7faff] ">
            {/* MAIN CHAT */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#e6edf8] bg-white shadow-sm">
                {/* CHAT MESSAGES */}
                <ChatMessages messages={messages} loading={loading} chatEndRef={chatEndRef} />

                {/* CHAT INPUT */}
                <ChatInput
                    input={input}
                    setInput={setInput}
                    loading={loading}
                    handleSend={handleSend}
                />
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="flex w-[340px] shrink-0 flex-col gap-4 overflow-hidden">
                {/* STUDY MODES */}
                <StudyModes
                    modes={modes}
                    activeMode={activeMode}
                    handleSelectMode={handleSelectMode}
                />

                {/* CHAT HISTORY */}
                <ChatHistory
                    chats={chats}
                    activeChatId={chatId}
                    handleNewChat={handleNewChat}
                    handleDeleteChat={handleDeleteChat}
                    handleSelectChat={handleSelectChat}
                    handleViewMore={handleViewMore}
                />
            </div>
        </div>
    );
};

export default AiSensei;
