import React from 'react';
import { LuFlower2, LuSparkles } from 'react-icons/lu';

const Hero = () => {
    return (
        <div className="relative mb-7 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#eaf1ff] via-[#f0f4ff] to-[#ffedf4] px-6 py-8 sm:px-9">
            <LuFlower2 size={110} className="absolute -right-5 -top-8 text-pink-200/70" />
            <LuFlower2 size={52} className="absolute bottom-0 right-40 text-pink-200/60" />
            <div className="relative z-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold text-[#3976e8]">
                    <LuSparkles /> HỌC TIẾNG NHẬT MỖI NGÀY
                </div>
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-[#172b50] sm:text-3xl">
                    JLPT Vocabulary Flashcards
                </h1>
                <p className="mb-0 max-w-xl text-sm leading-relaxed text-slate-500">
                    Lật thẻ, ghi nhớ từ mới và ôn lại những từ bạn chưa thuộc. Học theo cách của
                    riêng bạn!
                </p>
            </div>
            <div className="pointer-events-none absolute bottom-[-28px] right-8 hidden text-[125px] opacity-20 md:block">
                🗻
            </div>
        </div>
    );
};

export default Hero;
