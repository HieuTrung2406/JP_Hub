import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Button, Input, Tooltip, Empty, message } from 'antd';
import {
    LuBookOpen,
    LuFileQuestion,
    LuPencil,
    LuMessagesSquare,
    LuMessageCircle,
    LuPlus,
    LuSend,
    LuBot,
    LuCopy,
    LuThumbsUp,
    LuThumbsDown,
    LuEllipsisVertical,
    LuTrash2,
    LuSparkles,
    LuChevronRight,
} from 'react-icons/lu';

// Thay bằng đường dẫn ảnh trong project của bạn
import senseiAvatar from '../../assets/sensei-avatar.png';
import ChatInput from '../../components/ChatInput';
import StudyModes from '../../components/StudyModes';
import ChatHistory from '../../components/ChatHistory';
import ChatMessages from '../../components/ChatMessages';
import { askAiSensei } from '../../services/aiSenseiService';
// import senseiBanner from '../../assets/images/sensei-banner.png';

const AiSensei = () => {
    const [input, setInput] = useState('');
    const [activeMode, setActiveMode] = useState('grammar');
    const [loading, setLoading] = useState(false);
    const [activeChatId, setActiveChatId] = useState(1);

    const [chats, setChats] = useState([]);

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

    const currentChat = chats.find(chat => chat.id === activeChatId);
    const messages = currentChat?.messages || [];

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, activeChatId]);

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
        const newChat = {
            id: Date.now(),
            title: 'Cuộc trò chuyện mới',
            date: 'Vừa xong',
            mode: activeMode,
            messages: [],
        };

        setChats(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
        setInput('');
    };

    const handleViewMore = () => {
        message.info('Đang hiển thị toàn bộ lịch sử mẫu');
    };

    const handleDeleteChat = id => {
        const remaining = chats.filter(chat => chat.id !== id);
        setChats(remaining);

        if (activeChatId === id) {
            setActiveChatId(remaining[0]?.id || null);
        }

        message.success('Đã xóa cuộc trò chuyện');
    };

    //chọn chay bất kì
    const handleSelectChat = id => {
        setActiveChatId(id);
        setInput('');
    };

    const handleSend = async () => {
        const content = input.trim();

        if (!content || loading) return;

        const chatId = activeChatId ?? crypto.randomUUID();

        const existingChat = chats.find(chat => chat.id === chatId);

        const history = (existingChat?.messages ?? []).map(item => ({
            role: item.role,
            content: item.content,
        }));

        const userMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            time: new Date().toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        // 1. Hiển thị tin nhắn user ngay lập tức
        setChats(prev => {
            const exists = prev.some(chat => chat.id === chatId);

            if (!exists) {
                return [
                    {
                        id: chatId,
                        title: content.slice(0, 40),
                        date: 'Vừa xong',
                        mode: activeMode,
                        messages: [userMessage],
                    },
                    ...prev,
                ];
            }

            return prev.map(chat =>
                chat.id === chatId
                    ? {
                          ...chat,
                          title: chat.messages.length === 0 ? content.slice(0, 40) : chat.title,
                          messages: [...chat.messages, userMessage],
                      }
                    : chat
            );
        });

        setActiveChatId(chatId);
        setInput('');
        setLoading(true);

        try {
            // 2. Gửi request đến Supabase Edge Function
            const reply = await askAiSensei(content, activeMode, history);

            // 3. Tạo tin nhắn AI
            const aiMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: reply,
                time: new Date().toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            };

            // 4. Hiển thị câu trả lời AI
            setChats(prev =>
                prev.map(chat =>
                    chat.id === chatId
                        ? {
                              ...chat,
                              messages: [...chat.messages, aiMessage],
                          }
                        : chat
                )
            );
        } catch (error) {
            console.error('AI Sensei Error:', error);
            message.error(error.message || 'Không thể kết nối AI Sensei');
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
                {/* CHAT HISTORY */}
                <ChatHistory
                    chats={chats}
                    activeChatId={activeChatId}
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
