import { Avatar } from 'antd';
import { LuMenu, LuHouse, LuChevronRight } from 'react-icons/lu';
import vi from '../locales/vi';

export default function TopBar({ setMobileMenu }) {
    return (
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

                <span>{vi.topBar.sectionTitle}</span>

                <LuChevronRight size={13} />

                <span className="font-semibold text-[#376ff0]">{vi.topBar.currentPage}</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1.5 shadow-sm">
                <Avatar size={27} className="!bg-[#e6edff] !text-[#3266d5]">
                    {vi.topBar.userAvatar}
                </Avatar>

                <span className="text-xs font-semibold text-slate-700">{vi.topBar.userRole}</span>
            </div>
        </div>
    );
}
