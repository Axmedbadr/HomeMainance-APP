import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FiHome, FiShoppingBag, FiUsers, 
  FiLogOut, FiMenu, FiX, FiCheckSquare, FiLayout 
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

  // --- LOGIC-GA KALA SAARISTA NAVIGATION-KA ---
  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
  ]

  if (isAuthenticated && (user?.role === 'customer' || user?.role === 'admin')) {
    menuItems.push({ icon: FiShoppingBag, label: 'Services', path: '/services' })
  }

  if (isAuthenticated && user?.role === 'admin') {
    menuItems.push({ icon: FiUsers, label: 'Providers', path: '/providers' })
    menuItems.push({ icon: FiLayout, label: 'Dashboard', path: '/dashboard' })
  }

  if (isAuthenticated && user?.role === 'customer') {
    menuItems.push({ icon: FiCheckSquare, label: 'Bookings', path: '/bookings' })
  }

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg group-hover:rotate-6 transition-transform">
              <FiHome size={22} />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900">
              HOME<span className="text-blue-600">Maintenance</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
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
          </nav>

          {/* Auth Buttons: Kaliya REGISTER ayaa muuqda hadda */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                <Link to="/register" className="bg-slate-900 text-white px-8 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
                  Register Now
                </Link>
              </div>
            ) : (
              /* Marka uu qofku soo galo (Authenticated) */
              <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{user?.role}</span>
                  <span className="text-xs font-black text-slate-900">{user?.name?.split(' ')[0]}</span>
                </div>
                <button onClick={handleLogout} className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                  <FiLogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-900 bg-slate-50 rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile View */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-6 space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm ${
                  isActive(item.path) ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className="pt-4 border-t border-slate-100">
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