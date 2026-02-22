import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiHome, FiShoppingBag, FiUsers, 
  FiLogOut, FiMenu, FiX, FiCheckSquare, FiLayout, FiUser
} from 'react-icons/fi'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
  ]

  if (isAuthenticated && (user?.role === 'customer' || user?.role === 'admin')) {
    menuItems.push({ icon: FiShoppingBag, label: 'Services', path: '/services' })
  }

  if (isAuthenticated && user?.role === 'admin') {
    menuItems.push({ icon: FiUsers, label: 'Providers', path: '/providers' })
    menuItems.push({ icon: FiLayout, label: 'Dashboard', path: '/dashboard' })
    menuItems.push({ icon: FiCheckSquare, label: 'Admin Bookings', path: '/admin/bookings' })
  }

  if (isAuthenticated && user?.role === 'customer') {
    menuItems.push({ icon: FiCheckSquare, label: 'Bookings', path: '/my-bookings' })
  }

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-sky-100 transition-all duration-300 w-full">
      <div className="w-full px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="bg-sky-500 text-white p-2.5 rounded-xl shadow-lg shadow-sky-100 group-hover:scale-105 transition-all duration-500">
              <FiHome size={22} />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                 Home<span className="text-sky-500 italic">Maintenance</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">Maintenance Pro</span>
            </div>
          </Link>

          {/* Desktop Navigation - FIXED: text-[11px] and removed 'hidden' from label */}
          <nav className="hidden lg:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 mx-4">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive(item.path) 
                  ? 'bg-white text-sky-600 shadow-sm border border-slate-100' 
                  : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <item.icon size={15} className={isActive(item.path) ? 'text-sky-500' : ''} />
                {/* SAXID: Halkan ayaan ka saarnay 'hidden xl:inline' si qoraalku mar kasta u muuqdo */}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Auth & User Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {!isAuthenticated ? (
              <Link to="/register" className="bg-slate-900 text-white px-7 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] hover:bg-sky-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
                Register Now
              </Link>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest leading-none mb-1">{user?.role}</span>
                  <span className="text-[13px] font-black text-slate-900 leading-none">{user?.name?.split(' ')[0]}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100">
                  <FiUser size={20} />
                </div>
                <button 
                  onClick={handleLogout} 
                  className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                  title="Logout"
                >
                  <FiLogOut size={18} />
                </button>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2.5 text-slate-900 bg-slate-100 rounded-xl border border-slate-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2 animate-in fade-in slide-in-from-top-3">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 p-4 rounded-xl font-black text-[11px] uppercase tracking-widest ${
                  isActive(item.path) ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-50 text-slate-600 border border-slate-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
 
export default Header;