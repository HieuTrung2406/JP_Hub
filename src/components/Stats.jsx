import React from 'react';
import { LuBookOpen, LuCheck, LuRotateCcw } from 'react-icons/lu';
import vi from '../locales/vi';

const Stats = ({ vocabulary, knownCount, unknownWords }) => {
    return (
        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {/* Total Vocabulary */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(20,40,80,.025)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <LuBookOpen size={21} />
                </div>

                <div>
                    <div className="text-xl font-extrabold text-[#172b50]">{vocabulary.length}</div>
                    <div className="text-xs text-slate-400">{vi.stats.totalVocabulary}</div>
                </div>
            </div>

            {/* Known Words */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(20,40,80,.025)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <LuCheck size={21} />
                </div>

                <div>
                    <div className="text-xl font-extrabold text-[#172b50]">{knownCount}</div>
                    <div className="text-xs text-slate-400">{vi.stats.knownWords}</div>
                </div>
            </div>

            {/* Unknown Words */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(20,40,80,.025)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                    <LuRotateCcw size={21} />
                </div>

                <div>
                    <div className="text-xl font-extrabold text-[#172b50]">
                        {unknownWords.length}
                    </div>
                    <div className="text-xs text-slate-400">{vi.stats.unknownWords}</div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
