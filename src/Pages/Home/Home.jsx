import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Button, Typography, Avatar, Progress, Tooltip, Empty, message } from 'antd';
import {
    LuHouse,
    LuBookOpen,
    LuGraduationCap,
    LuNotebookTabs,
    LuLibrary,
    LuInfo,
    LuChevronLeft,
    LuChevronRight,
    LuCheck,
    LuX,
    LuRotateCcw,
    LuShuffle,
    LuVolume2,
    LuLightbulb,
    LuFlower2,
    LuLayers,
    LuListChecks,
    LuArrowUpRight,
    LuPanelLeftClose,
    LuPanelLeftOpen,
    LuKeyboard,
    LuSparkles,
    LuCircleHelp,
    LuTrash2,
    LuMenu,
} from 'react-icons/lu';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const MOCK_VOCABULARY = [
    {
        id: 1,
        word: '経験',
        reading: 'けいけん',
        meaning: 'Kinh nghiệm',
        example: '日本で働いた経験があります。',
        exampleMeaning: 'Tôi có kinh nghiệm làm việc tại Nhật.',
        level: 'N3',
    },
    {
        id: 2,
        word: '確認',
        reading: 'かくにん',
        meaning: 'Xác nhận, kiểm tra',
        example: 'メールを確認してください。',
        exampleMeaning: 'Hãy kiểm tra email.',
        level: 'N3',
    },
    {
        id: 3,
        word: '約束',
        reading: 'やくそく',
        meaning: 'Lời hứa, cuộc hẹn',
        example: '友達と約束があります。',
        exampleMeaning: 'Tôi có hẹn với bạn.',
        level: 'N3',
    },
    {
        id: 4,
        word: '準備',
        reading: 'じゅんび',
        meaning: 'Chuẩn bị',
        example: '旅行の準備をしています。',
        exampleMeaning: 'Tôi đang chuẩn bị cho chuyến du lịch.',
        level: 'N3',
    },
    {
        id: 5,
        word: '問題',
        reading: 'もんだい',
        meaning: 'Vấn đề, câu hỏi',
        example: 'この問題は難しいです。',
        exampleMeaning: 'Vấn đề này khó.',
        level: 'N3',
    },
    {
        id: 6,
        word: '学校',
        reading: 'がっこう',
        meaning: 'Trường học',
        example: '毎日学校へ行きます。',
        exampleMeaning: 'Tôi đến trường mỗi ngày.',
        level: 'N5',
    },
    {
        id: 7,
        word: '先生',
        reading: 'せんせい',
        meaning: 'Giáo viên',
        example: '先生は優しいです。',
        exampleMeaning: 'Giáo viên rất tốt bụng.',
        level: 'N5',
    },
    {
        id: 8,
        word: '予定',
        reading: 'よてい',
        meaning: 'Dự định, lịch trình',
        example: '明日の予定を教えてください。',
        exampleMeaning: 'Hãy cho tôi biết lịch trình ngày mai.',
        level: 'N4',
    },
    {
        id: 9,
        word: '改善',
        reading: 'かいぜん',
        meaning: 'Cải thiện',
        example: '仕事の方法を改善します。',
        exampleMeaning: 'Tôi cải thiện phương pháp làm việc.',
        level: 'N2',
    },
    {
        id: 10,
        word: '概念',
        reading: 'がいねん',
        meaning: 'Khái niệm',
        example: 'この概念を理解するのは難しい。',
        exampleMeaning: 'Khái niệm này khó hiểu.',
        level: 'N1',
    },
];

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

const NAV_ITEMS = [
    { key: 'home', label: 'Tổng quan', icon: LuHouse },
    { key: 'flashcard', label: 'Flashcard', icon: LuLayers },
    { key: 'vocabulary', label: 'Từ vựng', icon: LuLibrary },
    { key: 'grammar', label: 'Ngữ pháp', icon: LuNotebookTabs },
    { key: 'exam', label: 'Luyện đề JLPT', icon: LuGraduationCap },
];

const shuffleArray = array => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

export default function Home() {
    const [selectedLevel, setSelectedLevel] = useState('N3');
    const [mode, setMode] = useState('all');
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [unknownIds, setUnknownIds] = useState([]);
    const [knownIds, setKnownIds] = useState([]);
    const [order, setOrder] = useState(MOCK_VOCABULARY.map(w => w.id));
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const levelWords = useMemo(
        () => MOCK_VOCABULARY.filter(w => w.level === selectedLevel),
        [selectedLevel]
    );

    const unknownWords = useMemo(
        () => levelWords.filter(w => unknownIds.includes(w.id)),
        [levelWords, unknownIds]
    );

    const deck = useMemo(() => {
        const source = mode === 'unknown' ? unknownWords : levelWords;
        return [...source].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    }, [mode, unknownWords, levelWords, order]);

    const safeIndex = Math.min(index, Math.max(0, deck.length - 1));
    const current = deck[safeIndex] || null;
    const knownCount = levelWords.filter(w => knownIds.includes(w.id)).length;
    const progress = levelWords.length ? Math.round((knownCount / levelWords.length) * 100) : 0;

    const resetCard = () => {
        setIndex(0);
        setFlipped(false);
    };

    const changeLevel = level => {
        setSelectedLevel(level);
        setMode('all');
        resetCard();
    };

    const changeMode = newMode => {
        setMode(newMode);
        resetCard();
    };

    const next = () => {
        if (!deck.length) return;
        setIndex(i => (i + 1) % deck.length);
        setFlipped(false);
    };

    const previous = () => {
        if (!deck.length) return;
        setIndex(i => (i - 1 + deck.length) % deck.length);
        setFlipped(false);
    };

    const mark = isKnown => {
        if (!current) return;
        const id = current.id;

        setKnownIds(prev => (isKnown ? [...new Set([...prev, id])] : prev.filter(x => x !== id)));

        setUnknownIds(prev => (isKnown ? prev.filter(x => x !== id) : [...new Set([...prev, id])]));

        if (mode === 'unknown' && isKnown) {
            setIndex(i => Math.min(i, Math.max(0, deck.length - 2)));
            setFlipped(false);
        } else {
            next();
        }
    };

    const removeUnknown = id => {
        setUnknownIds(prev => prev.filter(x => x !== id));
        if (mode === 'unknown') {
            setIndex(i => Math.min(i, Math.max(0, deck.length - 2)));
            setFlipped(false);
        }
    };

    const shuffle = () => {
        setOrder(prev => shuffleArray(prev));
        resetCard();
        message.success('Đã trộn thẻ!');
    };

    const speak = event => {
        event?.stopPropagation();
        if (!current || !('speechSynthesis' in window)) {
            message.warning('Trình duyệt chưa hỗ trợ phát âm.');
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(current.word);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        const onKeyDown = e => {
            if (
                e.target instanceof HTMLElement &&
                (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
                    e.target.isContentEditable)
            )
                return;

            if (e.code === 'Space') {
                e.preventDefault();
                setFlipped(v => !v);
            } else if (e.code === 'ArrowRight') {
                next();
            } else if (e.code === 'ArrowLeft') {
                previous();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    });

    const SidebarContent = () => (
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 px-5 py-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                    <LuFlower2 size={26} />
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <div className="truncate text-lg font-extrabold tracking-tight text-[#172b50]">
                            Nihongo<span className="text-[#3778f6]">Hub</span>
                        </div>
                        <div className="text-[11px] text-slate-400">日本語を楽しく学ぼう</div>
                    </div>
                )}
            </div>

            <div className="px-3">
                {!collapsed && (
                    <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">
                        Học tập
                    </div>
                )}
                <div className="space-y-1">
                    {NAV_ITEMS.map(item => {
                        const Icon = item.icon;
                        const active = item.key === 'flashcard';
                        return (
                            <button
                                key={item.key}
                                onClick={() => {
                                    setMobileMenu(false);
                                    if (!active) message.info('Tính năng sẽ phát triển sau.');
                                }}
                                className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition-all ${
                                    active
                                        ? 'bg-[#eaf1ff] font-semibold text-[#2466e8]'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                            >
                                <Icon size={19} className="shrink-0" />
                                {!collapsed && <span className="text-sm">{item.label}</span>}
                                {active && !collapsed && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-auto p-4">
                {!collapsed && (
                    <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#edf3ff] to-[#fceef6] p-4">
                        <LuSparkles className="mb-2 text-[#3976f6]" size={22} />
                        <div className="text-sm font-bold text-[#172b50]">Một từ mỗi ngày</div>
                        <p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">
                            Học đều đặn sẽ giúp bạn ghi nhớ tốt hơn!
                        </p>
                    </div>
                )}
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                    <Avatar className="!bg-[#e7edff] !text-[#3769d7]">H</Avatar>
                    {!collapsed && (
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-700">
                                Tài khoản học viên
                            </div>
                            <div className="text-xs text-slate-400">Đang học JLPT</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <Layout className="!min-h-screen !bg-[#f7f9fe]">
            {/* Desktop sidebar */}
            <Sider
                width={248}
                collapsedWidth={76}
                collapsed={collapsed}
                trigger={null}
                className="!hidden !bg-white !shadow-[4px_0_28px_rgba(25,52,100,0.035)] lg:!block"
            >
                <div className="sticky top-0 h-screen">
                    <SidebarContent />
                    <button
                        onClick={() => setCollapsed(v => !v)}
                        className="absolute -right-3 top-8 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow"
                    >
                        {collapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
                    </button>
                </div>
            </Sider>

            {/* Mobile sidebar */}
            {mobileMenu && (
                <div
                    className="fixed inset-0 z-50 bg-slate-900/30 lg:hidden"
                    onClick={() => setMobileMenu(false)}
                >
                    <div className="h-full w-[250px] bg-white" onClick={e => e.stopPropagation()}>
                        <SidebarContent />
                    </div>
                </div>
            )}

            <Content className="min-w-0">
                <div className="mx-auto max-w-[1500px] px-4 pb-12 pt-5 sm:px-7 lg:px-10">
                    {/* Top bar */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                            <button
                                onClick={() => setMobileMenu(true)}
                                className="mr-1 text-slate-600 lg:hidden"
                            >
                                <LuMenu size={23} />
                            </button>
                            <LuHouse size={14} />
                            <LuChevronRight size={13} />
                            <span>Học tập</span>
                            <LuChevronRight size={13} />
                            <span className="font-semibold text-[#376ff0]">Flashcard</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1.5 shadow-sm">
                            <Avatar size={27} className="!bg-[#e6edff] !text-[#3266d5]">
                                H
                            </Avatar>
                            <span className="text-xs font-semibold text-slate-700">Học viên</span>
                        </div>
                    </div>

                    {/* Hero */}
                    <div className="relative mb-7 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#eaf1ff] via-[#f0f4ff] to-[#ffedf4] px-6 py-8 sm:px-9">
                        <LuFlower2
                            size={110}
                            className="absolute -right-5 -top-8 text-pink-200/70"
                        />
                        <LuFlower2
                            size={52}
                            className="absolute bottom-0 right-40 text-pink-200/60"
                        />
                        <div className="relative z-10">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold text-[#3976e8]">
                                <LuSparkles /> HỌC TIẾNG NHẬT MỖI NGÀY
                            </div>
                            <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-[#172b50] sm:text-3xl">
                                JLPT Vocabulary Flashcards
                            </h1>
                            <p className="mb-0 max-w-xl text-sm leading-relaxed text-slate-500">
                                Lật thẻ, ghi nhớ từ mới và ôn lại những từ bạn chưa thuộc. Học theo
                                cách của riêng bạn!
                            </p>
                        </div>
                        <div className="pointer-events-none absolute bottom-[-28px] right-8 hidden text-[125px] opacity-20 md:block">
                            🗻
                        </div>
                    </div>

                    {/* Level and mode */}
                    <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                        <div>
                            <div className="mb-3 text-xs font-bold uppercase tracking-[.13em] text-slate-400">
                                Chọn cấp độ JLPT
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {LEVELS.map(level => (
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
                                    <div className="text-sm font-bold">Học tất cả</div>
                                    <div className="text-[11px] opacity-75">
                                        {levelWords.length} từ vựng
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
                                    <div className="text-sm font-bold">Ôn từ chưa thuộc</div>
                                    <div className="text-[11px] opacity-75">
                                        {unknownWords.length} từ cần ôn
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {[
                            {
                                label: 'Tổng từ vựng',
                                value: levelWords.length,
                                icon: LuBookOpen,
                                bg: 'bg-blue-50',
                                color: 'text-blue-600',
                            },
                            {
                                label: 'Đã thuộc',
                                value: knownCount,
                                icon: LuCheck,
                                bg: 'bg-emerald-50',
                                color: 'text-emerald-600',
                            },
                            {
                                label: 'Cần ôn lại',
                                value: unknownWords.length,
                                icon: LuRotateCcw,
                                bg: 'bg-rose-50',
                                color: 'text-rose-500',
                            },
                        ].map(stat => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_rgba(20,40,80,.025)]"
                                >
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                                    >
                                        <Icon size={21} />
                                    </div>
                                    <div>
                                        <div className="text-xl font-extrabold text-[#172b50]">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-slate-400">{stat.label}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Main grid */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_315px]">
                        <div className="min-w-0">
                            {/* Progress heading */}
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <div className="text-lg font-bold text-[#172b50]">
                                        {mode === 'unknown'
                                            ? 'Ôn tập từ chưa thuộc'
                                            : 'Bắt đầu học từ vựng'}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-400">
                                        Thẻ {current ? safeIndex + 1 : 0} / {deck.length} · Cấp độ{' '}
                                        {selectedLevel}
                                    </div>
                                </div>
                                <button
                                    onClick={shuffle}
                                    className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2 text-xs font-semibold text-[#3774ef] hover:bg-blue-50"
                                >
                                    <LuShuffle size={16} /> Trộn thẻ
                                </button>
                            </div>

                            <Progress
                                percent={
                                    deck.length
                                        ? Math.round(((safeIndex + 1) / deck.length) * 100)
                                        : 0
                                }
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
                                    aria-label="Lật flashcard"
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') setFlipped(v => !v);
                                    }}
                                    onClick={() => setFlipped(v => !v)}
                                    className="h-[370px] cursor-pointer [perspective:1200px] sm:h-[420px]"
                                >
                                    <div
                                        className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
                                        style={{
                                            transform: flipped
                                                ? 'rotateY(180deg)'
                                                : 'rotateY(0deg)',
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
                                                MẶT TRƯỚC · TIẾNG NHẬT
                                            </div>
                                            <div className="relative mb-6 text-center text-[76px] font-bold leading-tight tracking-wider text-[#172b50] sm:text-[96px]">
                                                {current.word}
                                            </div>
                                            <div className="relative flex items-center gap-2 text-xs text-slate-400">
                                                <LuRotateCcw size={15} /> Nhấn vào thẻ để lật
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
                                                MẶT SAU · Ý NGHĨA
                                            </div>
                                            <div className="mb-2 text-4xl font-bold text-[#172b50]">
                                                {current.reading}
                                            </div>
                                            <div className="mb-4 text-xl font-semibold text-[#3774ef]">
                                                {current.meaning}
                                            </div>
                                            <Tooltip title="Nghe phát âm">
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
                                            ? 'Bạn đã ôn hết từ chưa thuộc!'
                                            : 'Chưa có từ vựng'}
                                    </h3>
                                    <p className="mt-2 text-center text-sm text-slate-400">
                                        {mode === 'unknown'
                                            ? 'Hãy tiếp tục học từ mới nhé.'
                                            : 'Hãy chọn cấp độ khác.'}
                                    </p>
                                    {mode === 'unknown' && (
                                        <Button type="primary" onClick={() => changeMode('all')}>
                                            Học tất cả
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
                                    <LuX size={21} /> Chưa thuộc
                                </button>
                                <button
                                    disabled={!current}
                                    onClick={() => mark(true)}
                                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#306ff0] text-sm font-bold text-white shadow-[0_6px_16px_rgba(48,111,240,.2)] transition-all hover:bg-[#235ed3] disabled:opacity-40"
                                >
                                    <LuCheck size={21} /> Đã thuộc
                                </button>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <button
                                    onClick={previous}
                                    disabled={!current}
                                    className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                                >
                                    <LuChevronLeft /> Trước
                                </button>
                                <span className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                                    <LuKeyboard size={15} /> Space để lật · ← → chuyển thẻ
                                </span>
                                <button
                                    onClick={next}
                                    disabled={!current}
                                    className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                                >
                                    Tiếp <LuChevronRight />
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
                                            Từ chưa thuộc
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
                                                    <Tooltip title="Xóa khỏi danh sách">
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
                                                Chưa có từ cần ôn
                                            </div>
                                            <div className="mt-1 text-xs text-slate-400">
                                                Đánh dấu "Chưa thuộc" để thêm từ.
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
                                        <LuRotateCcw size={17} /> Ôn tập ngay{' '}
                                        <LuArrowUpRight size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-[22px] bg-gradient-to-br from-[#fff4dd] to-[#fff8eb] p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <LuLightbulb size={21} className="text-amber-500" />
                                    <span className="text-sm font-bold text-[#172b50]">
                                        Mẹo học nhanh
                                    </span>
                                </div>
                                <p className="mb-0 text-xs leading-6 text-slate-600">
                                    Hãy thử nhớ nghĩa trước khi lật thẻ. Những từ chưa thuộc sẽ được
                                    đưa vào danh sách ôn tập riêng.
                                </p>
                                <div className="mt-2 text-right text-4xl">🐱</div>
                            </div>

                            <div className="rounded-[22px] border border-blue-100 bg-[#f0f5ff] p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <LuSparkles size={19} className="text-[#3774ef]" />
                                    <span className="text-sm font-bold text-[#172b50]">
                                        Tình trạng ghi nhớ
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
                                    {knownCount}/{levelWords.length} từ đã thuộc
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
