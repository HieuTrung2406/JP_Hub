import React from 'react';
import { Button, Input } from 'antd';
import { LuSend } from 'react-icons/lu';

const ChatInput = ({ input, setInput, loading, handleSend }) => {
    return (
        <div className="shrink-0 border-t border-[#e8eef8] bg-white p-4">
            <div className="flex w-full items-end gap-3 rounded-xl border border-[#dfe8f6] bg-white p-2 shadow-sm">
                {/* TEXT INPUT */}
                <div className="flex min-w-0 flex-1 items-center">
                    <Input.TextArea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Nhập câu hỏi tiếng Nhật của bạn..."
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        variant="borderless"
                        className="!min-h-[42px] !w-full !resize-none !px-3 !py-[10px] !text-[14px] !leading-[22px]"
                        onPressEnter={e => {
                            if (!e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                </div>

                {/* SEND BUTTON */}
                <Button
                    type="primary"
                    loading={loading}
                    disabled={!input.trim()}
                    onClick={handleSend}
                    icon={<LuSend size={17} />}
                    className="!flex !h-[42px] !w-[46px] !shrink-0 !items-center !justify-center !rounded-lg !border-none !bg-[#3977f6] !p-0"
                />
            </div>
        </div>
    );
};

export default ChatInput;
