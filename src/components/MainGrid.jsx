import React from 'react';
import { Button, Progress, Tooltip } from 'antd';
import {
    LuShuffle,
    LuFlower2,
    LuRotateCcw,
    LuVolume2,
    LuSparkles,
    LuX,
    LuCheck,
    LuChevronLeft,
    LuChevronRight,
    LuKeyboard,
    LuListChecks,
    LuBookOpen,
    LuArrowUpRight,
    LuLightbulb,
} from 'react-icons/lu';
import vi from '../locales/vi';

const MainGrid = ({
    mode,
    current,
    safeIndex,
    deck,
    selectedLevel,
    flipped,
    setFlipped,
    shuffle,
    speak,
    mark,
    previous,
    next,
    unknownWords,
    removeUnknown,
    changeMode,
    progress,
    knownCount,
    vocabulary,
}) => {
    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_315px]">
            <div className="min-w-0">
                {/* Progress heading */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="text-lg font-bold text-[#172b50]">
                            {mode === 'unknown' ? vi.mainGrid.reviewTitle : vi.mainGrid.studyTitle}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                            {vi.mainGrid.card} {current ? safeIndex + 1 : 0} / {deck.length} ·{' '}
                            {vi.mainGrid.level} {selectedLevel}
                        </div>
                    </div>

                    <button
                        onClick={shuffle}
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2 text-xs font-semibold text-[#3774ef] hover:bg-blue-50"
                    >
                        <LuShuffle size={16} /> {vi.mainGrid.shuffle}
                    </button>
                </div>

                <Progress
                    percent={deck.length ? Math.round(((safeIndex + 1) / deck.length) * 100) : 0}
                    showInfo={false}
                    strokeColor="#3778f6"
                    trailColor="#e5eaf4"
                    className="!mb-5"
                />

                {/* Flip card */}
                {current ? (
                    <div
                        role="button"
                        tabIndex={0}
                        aria-label={vi.mainGrid.flipCard}
                        onKeyDown={e => {
                            if (e.key === 'Enter') setFlipped(v => !v);
                        }}
                        onClick={() => setFlipped(v => !v)}
                        className="h-[370px] cursor-pointer [perspective:1200px] sm:h-[420px]"
                    >
                        <div
                            className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
                            style={{
                                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            }}
                        >
                            {/* Front */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[28px] border border-[#e6eafa] bg-white p-6 shadow-[0_12px_40px_rgba(33,60,110,.07)] [backface-visibility:hidden]">
                                <div className="absolute left-0 top-0 h-36 w-36 rounded-br-[100%] bg-blue-50/60" />

                                <LuFlower2
                                    className="absolute right-8 top-8 text-pink-100"
                                    size={42}
                                />

                                <LuFlower2
                                    className="absolute bottom-7 left-8 text-pink-100"
                                    size={30}
                                />

                                <div className="relative mb-8 rounded-full bg-[#edf3ff] px-4 py-1.5 text-xs font-bold text-[#3774ef]">
                                    {vi.mainGrid.frontSide}
                                </div>

                                <div className="relative mb-6 text-center text-[76px] font-bold leading-tight tracking-wider text-[#172b50] sm:text-[96px]">
                                    {current.word}
                                </div>

                                <div className="relative flex items-center gap-2 text-xs text-slate-400">
                                    <LuRotateCcw size={15} /> {vi.mainGrid.flipHint}
                                </div>

                                <div className="absolute bottom-6 right-7 text-xs font-semibold text-slate-300">
                                    {selectedLevel}
                                </div>
                            </div>

                            {/* Back */}
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[28px] border border-pink-100 bg-white p-6 shadow-[0_12px_40px_rgba(33,60,110,.07)] [backface-visibility:hidden]"
                                style={{ transform: 'rotateY(180deg)' }}
                            >
                                <div className="mb-5 rounded-full bg-pink-50 px-4 py-1.5 text-xs font-bold text-pink-500">
                                    {vi.mainGrid.backSide}
                                </div>

                                <div className="mb-2 text-4xl font-bold text-[#172b50]">
                                    {current.reading}
                                </div>

                                <div className="mb-4 text-xl font-semibold text-[#3774ef]">
                                    {current.meaning}
                                </div>

                                <Tooltip title={vi.mainGrid.listenPronunciation}>
                                    <button
                                        onClick={speak}
                                        className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3ff] text-[#3774ef] hover:bg-blue-100"
                                    >
                                        <LuVolume2 size={20} />
                                    </button>
                                </Tooltip>

                                <div className="w-full max-w-md rounded-2xl bg-[#f5f8ff] p-4 text-center">
                                    <div className="mb-1 text-sm font-semibold text-[#172b50]">
                                        {current.example}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {current.exampleMeaning}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-[370px] flex-col items-center justify-center rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm sm:h-[420px]">
                        <LuSparkles size={46} className="mb-4 text-blue-300" />

                        <h3 className="text-xl font-bold text-[#172b50]">
                            {mode === 'unknown'
                                ? vi.mainGrid.reviewCompleted
                                : vi.mainGrid.noVocabulary}
                        </h3>

                        <p className="mt-2 text-center text-sm text-slate-400">
                            {mode === 'unknown'
                                ? vi.mainGrid.continueLearning
                                : vi.mainGrid.selectAnotherLevel}
                        </p>

                        {mode === 'unknown' && (
                            <Button type="primary" onClick={() => changeMode('all')}>
                                {vi.mainGrid.learnAll}
                            </Button>
                        )}
                    </div>
                )}

                {/* Action buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:mx-auto sm:max-w-[500px]">
                    <button
                        disabled={!current}
                        onClick={() => mark(false)}
                        className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50/50 text-sm font-bold text-rose-500 transition-all hover:bg-rose-100 disabled:opacity-40"
                    >
                        <LuX size={21} /> {vi.mainGrid.unknown}
                    </button>

                    <button
                        disabled={!current}
                        onClick={() => mark(true)}
                        className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#306ff0] text-sm font-bold text-white shadow-[0_6px_16px_rgba(48,111,240,.2)] transition-all hover:bg-[#235ed3] disabled:opacity-40"
                    >
                        <LuCheck size={21} /> {vi.mainGrid.known}
                    </button>
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <button
                        onClick={previous}
                        disabled={!current}
                        className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                    >
                        <LuChevronLeft /> {vi.mainGrid.previous}
                    </button>

                    <span className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                        <LuKeyboard size={15} /> {vi.mainGrid.keyboardHint}
                    </span>

                    <button
                        onClick={next}
                        disabled={!current}
                        className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                    >
                        {vi.mainGrid.next} <LuChevronRight />
                    </button>
                </div>
            </div>

            {/* Right panel */}
            <div className="space-y-5">
                <div className="overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_6px_24px_rgba(20,40,80,.035)]">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <LuListChecks size={19} className="text-[#3774ef]" />
                            <span className="text-sm font-bold text-[#172b50]">
                                {vi.mainGrid.unknownWordsTitle}
                            </span>
                        </div>

                        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-500">
                            {unknownWords.length}
                        </span>
                    </div>

                    <div className="max-h-[380px] min-h-[210px] overflow-y-auto p-3">
                        {unknownWords.length ? (
                            <div className="space-y-1">
                                {unknownWords.map(word => (
                                    <div
                                        key={word.id}
                                        className="group flex items-center justify-between gap-2 rounded-xl px-3 py-3 hover:bg-[#f6f8ff]"
                                    >
                                        <div className="min-w-0">
                                            <div className="text-sm font-bold text-[#172b50]">
                                                {word.word}
                                                <span className="ml-2 text-[11px] font-normal text-slate-400">
                                                    {word.reading}
                                                </span>
                                            </div>

                                            <div className="mt-1 truncate text-xs text-slate-500">
                                                {word.meaning}
                                            </div>
                                        </div>

                                        <Tooltip title={vi.mainGrid.removeFromList}>
                                            <button
                                                onClick={() => removeUnknown(word.id)}
                                                className="rounded-lg p-1.5 text-slate-300 hover:bg-rose-50 hover:text-rose-500"
                                            >
                                                <LuX size={17} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
                                <LuBookOpen size={32} className="mb-3 text-blue-200" />

                                <div className="text-sm font-semibold text-slate-600">
                                    {vi.mainGrid.noUnknownWords}
                                </div>

                                <div className="mt-1 text-xs text-slate-400">
                                    {vi.mainGrid.addUnknownHint}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 pt-0">
                        <button
                            disabled={!unknownWords.length}
                            onClick={() => changeMode('unknown')}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#edf3ff] text-sm font-bold text-[#3774ef] hover:bg-[#e1ebff] disabled:opacity-40"
                        >
                            <LuRotateCcw size={17} />
                            {vi.mainGrid.reviewNow}
                            <LuArrowUpRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Learning tips */}
                <div className="rounded-[22px] bg-gradient-to-br from-[#fff4dd] to-[#fff8eb] p-5">
                    <div className="mb-3 flex items-center gap-2">
                        <LuLightbulb size={21} className="text-amber-500" />
                        <span className="text-sm font-bold text-[#172b50]">
                            {vi.mainGrid.learningTipTitle}
                        </span>
                    </div>

                    <p className="mb-0 text-xs leading-6 text-slate-600">
                        {vi.mainGrid.learningTipDescription}
                    </p>

                    <div className="mt-2 text-right text-4xl">{vi.mainGrid.learningTipEmoji}</div>
                </div>

                {/* Memory progress */}
                <div className="rounded-[22px] border border-blue-100 bg-[#f0f5ff] p-5">
                    <div className="mb-3 flex items-center gap-2">
                        <LuSparkles size={19} className="text-[#3774ef]" />
                        <span className="text-sm font-bold text-[#172b50]">
                            {vi.mainGrid.memoryStatus}
                        </span>
                    </div>

                    <Progress
                        type="circle"
                        percent={progress}
                        size={100}
                        strokeColor="#3778f6"
                        trailColor="#dce6fb"
                        className="!mx-auto !block"
                    />

                    <div className="mt-3 text-center text-xs text-slate-500">
                        {knownCount}/{vocabulary.length} {vi.mainGrid.knownWordsCount}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainGrid;
