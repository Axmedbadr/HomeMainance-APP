import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiHome, FiShoppingBag, FiUser, FiUsers, 
  FiLogIn, FiLogOut, FiMenu, FiX, FiCheckSquare, FiLayout 
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
    { icon: FiShoppingBag, label: 'Services', path: '/services' },
    { icon: FiUsers, label: 'Providers', path: '/providers' },
  ]

  // Menu-ga gaarka ah ee qofka soo galay
  const authItems = [
    { icon: FiCheckSquare, label: 'Bookings', path: '/bookings' },
    { icon: FiLayout, label: 'Dashboard', path: '/dashboard' },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100 shadow-sm md:left-64 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* 1. Logo (Mobile View Focus) */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">
              <FiHome size={22} />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900 md:hidden lg:block">
              HOME<span className="text-blue-600">Maintenance</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation (Public & Private Links) */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Public Links */}
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  isActive(item.path) ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <item.icon size={14} />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Private Links (Haddii uu Login yahay) */}
            {isAuthenticated && authItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  isActive(item.path) ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <item.icon size={14} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* 3. Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border border-slate-100">
                <Link to="/login" className="px-5 py-2 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Account</span>
                  <span className="text-xs font-black text-slate-900">{user?.name?.split(' ')[0]}</span>
                </div>
                <button onClick={handleLogout} className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                  <FiLogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* 4. Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-900 bg-slate-50 rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* 5. Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4">
            {[...menuItems, ...(isAuthenticated ? authItems : [])].map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${
                  isActive(item.path) ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <Link to="/login" className="flex items-center justify-center p-4 rounded-2xl bg-slate-100 font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="flex items-center justify-center p-4 rounded-2xl bg-slate-900 text-white font-bold" onClick={() => setMobileMenuOpen(false)}>Register</Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-rose-50 text-rose-600 font-bold">
                <FiLogOut /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header