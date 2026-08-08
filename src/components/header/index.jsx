import { Link, useNavigate } from "react-router"
import logo from "../../assets/images/temp-logo.png"
import { FiCamera } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu, AiOutlineArrowRight } from 'react-icons/ai'
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext"
import Button from "../Button"
import { navigateSmooth } from "../../utils/helperFunctions"

const navigationLinks = [
    {
        path: '/events',
        label: 'Events',
        icon: null
    },
    {
        path: '/portfolio',
        label: 'Members',
        icon: null
    },
    {
        path: '/blogs',
        label: 'Blogs',
        icon: null
    },
    {
        path: '/photo-reels',
        label: 'Photo Reel',
        icon: <FiCamera size={18} />,
        isButton: true,
        variant: 'outline'
    },
    {
        path: '/club-member',
        label: 'Club Member',
        icon: <FaRegUser size={16} />,
        isButton: true,
        variant: 'secondary'
    }
]

export default function Header() {
    const [nav, setNav] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
    const { theme } = useTheme()
    const navigate = useNavigate()
    const profileButtonRef = useRef(null)
    const profileMenuRef = useRef(null)

    const handleNav = () => {
        setNav(!nav)
    }

    const handleNavigation = (path) => {
        handleNav()
        navigateSmooth(navigate, path)
    }

    // Open confirmation modal instead of immediately logging out
    const handleLogout = () => {
        setShowLogoutConfirm(true)
    }

    // Perform actual logout when user confirms
    const performLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        setProfileOpen(false)
        setShowLogoutConfirm(false)
        navigate('/login')
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileOpen &&
                profileMenuRef.current &&
                profileButtonRef.current &&
                !profileMenuRef.current.contains(event.target) &&
                !profileButtonRef.current.contains(event.target)
            ) {
                setProfileOpen(false)
            }
        }

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setProfileOpen(false)
                setShowLogoutConfirm(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEsc)
        }
    }, [profileOpen])

    return (
        <>
            <header className="z-10 fixed top-0 left-0 right-0 h-[70px] bg-white/80 backdrop-blur-xl border-b border-gray-200 flex justify-between items-center px-container-px md:px-container-px-md">
                <Link to="/" onClick={() => navigateSmooth(navigate, '/', 'header')}>
                    <img
                        src={logo}
                        alt="Photography Club NITK"
                        className={`w-[50px] ${theme === 'light' ? 'invert' : ''}`}
                    />
                </Link>
                <div className="hidden md:flex items-center justify-center gap-8 text-sm tracking-wide">
                    {navigationLinks.slice(0, -1).map((link) => (
                        link.isButton ? (
                            <Link key={link.path} to={link.path} onClick={() => navigateSmooth(navigate, link.path, 'header')}>
                                <Button variant={link.variant} size="sm" icon={link.icon}>
                                    {link.label}
                                </Button>
                            </Link>
                        ) : (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                onClick={() => navigateSmooth(navigate, link.path, 'header')}
                                className="hover:text-red-500 transition-colors"
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                </div>
                <div onClick={handleNav} className='block md:hidden'>
                    <AiOutlineMenu size={20} />
                </div>
                <div className="relative hidden md:block">
                    <button
                        ref={profileButtonRef}
                        type="button"
                        onClick={() => setProfileOpen((open) => !open)}
                        aria-haspopup="menu"
                        aria-expanded={profileOpen}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-300 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                        <FaRegUser size={18} />
                    </button>

                    <div
                        ref={profileMenuRef}
                        className={`absolute right-0 mt-3 w-48 origin-top-right rounded-2xl border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out ${
                            profileOpen
                                ? 'opacity-100 translate-y-2 scale-100 pointer-events-auto'
                                : 'opacity-0 translate-y-0 scale-95 pointer-events-none'
                        }`}
                    >
                        <div className="flex flex-col py-2">
                            <Link
                                to="/club-member"
                                onClick={() => setProfileOpen(false)}
                                className="px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                My Profile
                            </Link>
                            <Link
                                to="/settings"
                                onClick={() => setProfileOpen(false)}
                                className="px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Settings
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center justify-between"
                            >
                                <span>Logout</span>
                                <AiOutlineArrowRight size={20} className="text-red-600" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`fixed ease-in duration-200 ${nav ? "z-20 left-0 top-0 w-[70%] h-screen bg-white/95 backdrop-blur-xl" : "left-[-100%]"}`}>
                <div className="px-container-px py-8 flex flex-col h-full">
                    <div className="flex justify-between items-center">
                        <img
                            src={logo}
                            alt="Photography Club NITK"
                            className={`w-[40px] ${theme === 'light' ? 'invert' : ''}`}
                        />
                        <div onClick={handleNav} className="cursor-pointer">
                            <AiOutlineClose size={20} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mt-12'>
                        {navigationLinks.map((link, index) => (
                            <div key={link.path}>
                                <Link 
                                    onClick={() => handleNavigation(link.path)}
                                    to={link.path} 
                                    className="hover:text-red-500 transition-colors"
                                >
                                    {link.icon ? (
                                        <div className="flex items-center gap-2">
                                            {link.icon}
                                            <span>{link.label}</span>
                                        </div>
                                    ) : (
                                        link.label
                                    )}
                                </Link>
                                {[2, 3].includes(index) && <hr className="border-gray-100" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
                {showLogoutConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setShowLogoutConfirm(false)} />
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="logout-title"
                            className="relative bg-white rounded-xl shadow-lg max-w-sm w-full p-6 z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 id="logout-title" className="text-lg font-medium text-gray-900">Confirm logout</h3>
                            <p className="mt-2 text-sm text-gray-600">Are you sure you want to log out?</p>
                            <div className="mt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={performLogout}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}