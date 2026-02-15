import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiShoppingBag, FiCalendar, FiDollarSign, FiStar, FiArrowRight, FiActivity } from 'react-icons/fi'
import { bookingService } from '../services/bookingService'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = React.useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalSpent: 0,
  })

  React.useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const bookings = await bookingService.getMyBookings()
      const total = bookings.data?.length || 0
      const pending = bookings.data?.filter(b => b.status === 'pending').length || 0
      const completed = bookings.data?.filter(b => b.status === 'completed').length || 0
      const spent = bookings.data?.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0

      setStats({
        totalBookings: total,
        pendingBookings: pending,
        completedBookings: completed,
        totalSpent: spent,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Overview</h1>
            <p className="text-slate-500 font-medium mt-1">Welcome back, <span className="text-blue-600 font-bold">{user?.name}</span></p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <FiActivity size={20} />
            </div>
            <div className="pr-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Status</p>
              <p className="text-xs font-bold text-slate-700">Account Active</p>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={FiShoppingBag}
            title="Total Requests"
            value={stats.totalBookings}
            trend="All time"
            color="bg-slate-900 text-white"
          />
          <StatCard
            icon={FiCalendar}
            title="Pending Actions"
            value={stats.pendingBookings}
            trend="Awaiting"
            color="bg-white text-blue-600 border border-slate-100"
          />
          <StatCard
            icon={FiStar}
            title="Completed"
            value={stats.completedBookings}
            trend="Successful"
            color="bg-white text-emerald-500 border border-slate-100"
          />
          <StatCard
            icon={FiDollarSign}
            title="Total Investment"
            value={`$${stats.totalSpent}`}
            trend="Spent"
            color="bg-white text-indigo-600 border border-slate-100"
          />
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 p-10">
          <div className="mb-8">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">Quick Actions</h2>
            <p className="text-slate-400 text-sm font-medium">Manage your services and profile</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickAction
              icon={FiShoppingBag}
              title="Book New Service"
              description="Explore our premium home services"
              link="/services"
              theme="blue"
            />
            <QuickAction
              icon={FiCalendar}
              title="Track Bookings"
              description="Check status of your requests"
              link="/bookings"
              theme="slate"
            />
            <QuickAction
              icon={FiUser}
              title="Profile Settings"
              description="Update your personal information"
              link="/profile"
              theme="indigo"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Stats Card Sub-component
const StatCard = ({ icon: Icon, title, value, trend, color }) => (
  <div className={`${color} rounded-[2rem] p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300`}>
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-2xl ${color.includes('slate-900') ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{trend}</span>
    </div>
    <h3 className={`${color.includes('white') ? 'text-slate-400' : 'text-slate-300'} text-[11px] font-black uppercase tracking-[0.2em] mb-1`}>{title}</h3>
    <p className="text-3xl font-black tracking-tight">{value}</p>
  </div>
)

// Quick Action Sub-component
const QuickAction = ({ icon: Icon, title, description, link, theme }) => {
  const themes = {
    blue: "bg-blue-50 text-blue-600",
    slate: "bg-slate-50 text-slate-900",
    indigo: "bg-indigo-50 text-indigo-600"
  }
  
  return (
    <Link
      to={link}
      className="group p-8 bg-white border border-slate-100 rounded-[2rem] hover:bg-slate-900 hover:border-slate-900 transition-all duration-500 shadow-sm"
    >
      <div className={`w-14 h-14 ${themes[theme]} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors`}>
        <Icon size={24} />
      </div>
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-black text-slate-900 group-hover:text-white text-lg transition-colors mb-1">{title}</h3>
          <p className="text-sm text-slate-400 group-hover:text-slate-400 transition-colors">{description}</p>
        </div>
        <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
          <FiArrowRight size={24} />
        </div>
      </div>
    </Link>
  )
}

export default Dashboard