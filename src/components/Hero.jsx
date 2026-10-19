import React from 'react';
import { LuSparkles } from 'react-icons/lu';
import heroBannerBg from '../assets/hero_banner.png';
import vi from '../locales/vi';

const Hero = () => {
    return (
        <div className="relative mb-7 min-h-[200px] overflow-hidden rounded-[28px] bg-gradient-to-r from-[#eaf1ff] via-[#f0f4ff] to-[#ffedf4] px-6 py-8 sm:px-9">
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] md:block">
                <img
                    src={heroBannerBg}
                    alt={vi.hero.imageAlt}
                    className="h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#f0f4ff] via-[#f0f4ff]/30 to-transparent" />
            </div>

            <div className="relative z-10 md:max-w-[65%]">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold text-[#3976e8]">
                    <LuSparkles />
                    {vi.hero.badge}
                </div>

                <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-[#172b50] sm:text-3xl">
                    {vi.hero.title}
                </h1>

                <p className="mb-0 max-w-xl text-sm leading-relaxed text-slate-500">
                    {vi.hero.description}
                </p>
            </div>
        </div>
    );
};

export default Hero;
