import React from 'react';
import { Button, Empty, Tooltip } from 'antd';
import { LuPlus, LuMessageCircle, LuTrash2, LuChevronRight } from 'react-icons/lu';

import vi from '../locales/vi';

const ChatHistory = ({
    chats,
    chatId,
    handleNewChat,
    handleDeleteChat,
    handleSelectChat,
    handleViewMore,
}) => {
    return (
        <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-[#e6edf8] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="text-[15px] font-bold text-[#152b4f]">{vi.chatHistory.title}</h3>

                <Button
                    type="primary"
                    icon={<LuPlus size={16} />}
                    onClick={handleNewChat}
                    className="!h-9 !rounded-lg !bg-[#3977f6] !text-[12px]"
                >
                    {vi.chatHistory.newChat}
                </Button>
            </div>

            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
                {chats.length === 0 ? (
                    <Empty
                        description={vi.chatHistory.emptyChat}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => handleSelectChat(chat.id)}
                            className={`group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                                chatId === chat.id ? 'bg-[#eaf1ff]' : 'hover:bg-[#f6f8fc]'
                            }`}
                        >
                            <LuMessageCircle size={19} className="shrink-0 text-[#526786]" />

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[12px] font-medium text-[#1d3152]">
                                    {chat.title}
                                </p>

                                <p className="mt-1 text-[11px] text-slate-400">{chat.date}</p>
                            </div>

                            <Tooltip title={vi.chatHistory.deleteChat}>
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleDeleteChat(chat.id);
                                    }}
                                    className="rounded-md p-1 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                                >
                                    <LuTrash2 size={15} />
                                </button>
                            </Tooltip>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={handleViewMore}
                className="mt-3 flex items-center justify-center gap-1 border-t border-slate-100 pt-3 text-[12px] font-medium text-[#3977f6] hover:underline"
            >
                {vi.chatHistory.viewMore}
                <LuChevronRight size={15} />
            </button>
        </div>
    );
};

export default ChatHistory;
