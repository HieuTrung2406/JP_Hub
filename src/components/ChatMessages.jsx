import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { LuSparkles, LuCopy, LuThumbsUp, LuThumbsDown } from 'react-icons/lu';

import senseiAvatar from '../assets/sensei-avatar.png';
import MessageContent from './MessageContent';
import vi from '../locales/vi';

const ChatMessages = ({ messages, loading, chatEndRef }) => {
    return (
        <div className="min-h-0 flex-1 overflow-y-auto bg-[#fcfdff] px-5 py-6">
            {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <Avatar
                        src={senseiAvatar}
                        size={78}
                        className="border-4 border-white shadow-md"
                    />

                    <h2 className="mt-5 text-[22px] font-bold text-[#142b50]">
                        {vi.chatMessages.welcomeTitle}
                    </h2>

                    <p className="mt-2 max-w-[450px] text-[14px] leading-6 text-slate-500">
                        {vi.chatMessages.welcomeDescription}
                    </p>

                    <div className="mt-5 flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[13px] text-blue-600">
                        <LuSparkles />
                        {vi.chatMessages.welcomeBadge}
                    </div>
                </div>
            ) : (
                <div className="mx-auto flex max-w-[900px] flex-col gap-6">
                    {messages.map(msg => (
                        <div key={msg.id}>
                            {msg.role === 'user' ? (
                                <div className="flex justify-end gap-3">
                                    <div className="max-w-[78%] rounded-2xl rounded-tr-md bg-[#dce9ff] px-4 py-3 text-[14px] leading-7 text-[#20395e]">
                                        <div className="whitespace-pre-wrap">{msg.content}</div>

                                        <div className="mt-1 text-right text-[11px] text-slate-400">
                                            {msg.time}
                                        </div>
                                    </div>

                                    <Avatar size={34} className="shrink-0 bg-[#5688f4]">
                                        {vi.chatMessages.userAvatar}
                                    </Avatar>
                                </div>
                            ) : (
                                <div className="flex items-start gap-3">
                                    <Avatar
                                        src={senseiAvatar}
                                        size={36}
                                        className="shrink-0 border border-pink-100"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="text-[13px] font-bold text-[#152b4f]">
                                                {vi.chatMessages.assistantName}
                                            </span>

                                            <span className="text-[11px] text-slate-400">
                                                {msg.time}
                                            </span>
                                        </div>

                                        <div className="rounded-2xl border border-[#e9eef8] bg-white px-4 py-4 text-[14px] shadow-sm">
                                            <MessageContent content={msg.content} />

                                            <div className="mt-4 flex gap-3 border-t border-slate-100 pt-3 text-slate-400">
                                                <Tooltip title={vi.chatMessages.copy}>
                                                    <button className="hover:text-blue-500">
                                                        <LuCopy size={15} />
                                                    </button>
                                                </Tooltip>

                                                <Tooltip title={vi.chatMessages.helpful}>
                                                    <button className="hover:text-blue-500">
                                                        <LuThumbsUp size={15} />
                                                    </button>
                                                </Tooltip>

                                                <Tooltip title={vi.chatMessages.notHelpful}>
                                                    <button className="hover:text-red-500">
                                                        <LuThumbsDown size={15} />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex items-center gap-3">
                            <Avatar src={senseiAvatar} size={34} />

                            <div className="rounded-xl border bg-white px-4 py-3 text-[13px] text-slate-500">
                                <span className="animate-pulse">{vi.chatMessages.thinking}</span>
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>
            )}
        </div>
    );
};

export default ChatMessages;
