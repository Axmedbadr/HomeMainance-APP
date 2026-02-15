import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiHome, FiShoppingBag, FiCalendar, FiUser, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi'

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard', role: ['user', 'provider', 'admin'] },
    { icon: FiShoppingBag, label: 'Services', path: '/services', role: ['user', 'provider', 'admin'] },
    { icon: FiCalendar, label: 'Bookings', path: '/bookings', role: ['user', 'provider', 'admin'] },
    { icon: FiUsers, label: 'Providers', path: '/providers', role: ['user', 'admin'] },
    { icon: FiUser, label: 'Profile', path: '/profile', role: ['user', 'provider', 'admin'] },
    { icon: FiSettings, label: 'Admin Panel', path: '/admin', role: ['admin'] },
  ]

  return (
    <>
      {/* Overlay: z-40 */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" onClick={onClose}></div>
      )}

      {/* Sidebar: z-50 */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 shadow-2xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-all duration-300 ease-in-out`}>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white rounded-lg p-2 shadow-lg shadow-blue-200">
              <FiHome size={24} />
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tight">Home Maintenance</span>
          </div>
        </div>
        
        <nav className="p-4 flex flex-col h-[calc(100vh-100px)]">
          <div className="space-y-1 flex-1">
            {menuItems
              .filter(item => user?.role && item.role.includes(user.role))
              .map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link key={item.path} to={item.path} onClick={onClose}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-bold ${
                      isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
          </div>
          
          <div className="mt-auto pt-6 border-t">
            <div className="px-4 py-3 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-900 text-sm truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{user?.role}</p>
                </div>
              </div>
            </div>
            
            <button onClick={logout} className="flex items-center space-x-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm">
              <FiLogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar