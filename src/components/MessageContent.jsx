import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageContent = ({ content }) => {
    return (
        <div className="min-w-0 break-words text-[14px] leading-7 text-slate-700">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="mb-4 mt-5 text-xl font-bold text-slate-900">{children}</h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="mb-3 mt-5 border-b border-blue-100 pb-2 text-lg font-bold text-[#2563eb]">
                            {children}
                        </h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="mb-2 mt-4 text-[15px] font-bold text-[#1e40af]">
                            {children}
                        </h3>
                    ),

                    p: ({ children }) => <p className="mb-3 leading-7 last:mb-0">{children}</p>,

                    strong: ({ children }) => (
                        <strong className="font-semibold text-slate-900">{children}</strong>
                    ),

                    ul: ({ children }) => (
                        <ul className="mb-3 list-disc space-y-1 pl-6">{children}</ul>
                    ),

                    ol: ({ children }) => (
                        <ol className="mb-3 list-decimal space-y-1 pl-6">{children}</ol>
                    ),

                    li: ({ children }) => <li className="leading-7">{children}</li>,

                    blockquote: ({ children }) => (
                        <blockquote className="my-3 rounded-r-lg border-l-4 border-blue-400 bg-blue-50 px-4 py-3 [&>p]:mb-0">
                            {children}
                        </blockquote>
                    ),

                    hr: () => <hr className="my-5 border-slate-200" />,

                    table: ({ children }) => (
                        <div className="my-4 w-full overflow-x-auto rounded-xl border border-slate-200">
                            <table className="w-full min-w-[400px] border-collapse text-left text-[13px]">
                                {children}
                            </table>
                        </div>
                    ),

                    thead: ({ children }) => (
                        <thead className="bg-blue-50 text-slate-800">{children}</thead>
                    ),

                    th: ({ children }) => (
                        <th className="border-b border-slate-200 px-3 py-2 font-semibold">
                            {children}
                        </th>
                    ),

                    td: ({ children }) => (
                        <td className="border-b border-slate-100 px-3 py-2 align-top">
                            {children}
                        </td>
                    ),

                    pre: ({ children }) => (
                        <pre className="my-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-white">
                            {children}
                        </pre>
                    ),

                    code: ({ children, className }) => (
                        <code
                            className={
                                className ||
                                'rounded bg-slate-100 px-1 py-0.5 font-mono text-[13px] text-pink-600'
                            }
                        >
                            {children}
                        </code>
                    ),
                }}
            >
                {content || ''}
            </ReactMarkdown>
        </div>
    );
};

export default MessageContent;
