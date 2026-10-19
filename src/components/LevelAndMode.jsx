import React from 'react';
import { LuLayers, LuRotateCcw } from 'react-icons/lu';
import vi from '../locales/vi';

const LevelAndMode = ({
    selectedLevel,
    mode,
    vocabulary,
    unknownWords,
    changeLevel,
    changeMode,
}) => {
    return (
        <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
                <div className="mb-3 text-xs font-bold uppercase tracking-[.13em] text-slate-400">
                    {vi.levelAndMode.selectLevel}
                </div>

                <div className="flex flex-wrap gap-2">
                    {vi.levelAndMode.levels.map(level => (
                        <button
                            key={level}
                            onClick={() => changeLevel(level)}
                            className={`h-11 min-w-[65px] rounded-xl px-5 text-sm font-bold transition-all ${
                                selectedLevel === level
                                    ? 'bg-[#306ff0] text-white shadow-[0_6px_16px_rgba(48,111,240,.23)]'
                                    : 'border border-slate-100 bg-white text-slate-600 hover:border-blue-200'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => changeMode('all')}
                    className={`flex items-center gap-3 rounded-2xl px-5 py-3 text-left transition-all ${
                        mode === 'all'
                            ? 'bg-[#306ff0] text-white shadow-[0_6px_18px_rgba(48,111,240,.18)]'
                            : 'border border-slate-100 bg-white text-slate-600'
                    }`}
                >
                    <LuLayers size={21} />
                    <div>
                        <div className="text-sm font-bold">{vi.levelAndMode.learnAll}</div>
                        <div className="text-[11px] opacity-75">
                            {vocabulary.length} {vi.levelAndMode.vocabularyCount}
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => changeMode('unknown')}
                    className={`flex items-center gap-3 rounded-2xl px-5 py-3 text-left transition-all ${
                        mode === 'unknown'
                            ? 'bg-[#306ff0] text-white shadow-[0_6px_18px_rgba(48,111,240,.18)]'
                            : 'border border-slate-100 bg-white text-slate-600'
                    }`}
                >
                    <LuRotateCcw size={21} />
                    <div>
                        <div className="text-sm font-bold">{vi.levelAndMode.reviewUnknown}</div>
                        <div className="text-[11px] opacity-75">
                            {unknownWords.length} {vi.levelAndMode.unknownCount}
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LevelAndMode;
