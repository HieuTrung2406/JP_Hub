import { Avatar, Dropdown, message } from 'antd';
import {
    LuMenu,
    LuHouse,
    LuChevronRight,
    LuChevronDown,
    LuUserRound,
    LuLogOut,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import vi from '../locales/vi';
import { logoutUser } from '../services/authService';

export default function TopBar({ setMobileMenu }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            message.success(vi.topBar.logoutSuccess);
            navigate('/', { replace: true });
        } catch (error) {
            message.error(vi.topBar.logoutFailed);
        }
    };

    const menuItems = [
        {
            key: 'account',
            label: vi.topBar.accountManagement,
            icon: <LuUserRound size={16} />,
            onClick: () => navigate('/account'),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: vi.topBar.logout,
            icon: <LuLogOut size={16} />,
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <div className="mb-6 flex items-center justify-between">
            {/* BREADCRUMB */}
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

            {/* USER DROPDOWN */}
            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight" arrow>
                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1.5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
                >
                    <Avatar
                        size={27}
                        icon={<LuUserRound size={16} />}
                        className="!flex !items-center !justify-center !bg-[#e6edff] !text-[#3266d5]"
                    />

                    <span className="text-xs font-semibold text-slate-700">
                        {vi.topBar.userRole}
                    </span>

                    <LuChevronDown size={14} className="text-slate-400" />
                </button>
            </Dropdown>
        </div>
    );
}
