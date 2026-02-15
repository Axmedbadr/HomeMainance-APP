// src/pages/AdminPanel.jsx
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity, FiShield, FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const AdminPanel = () => {
  const { user } = useAuth()

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="container py-12 text-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg max-w-md mx-auto">
          <p className="text-red-700 font-medium">
            Access denied. Admin privileges required.
          </p>
          <Link 
            to="/dashboard" 
            className="mt-4 inline-block text-primary hover:text-secondary font-medium"
          >
            ← Ku laabo dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Admin Panel</h1>
        <p className="text-gray-600">Maamulka platform-ka</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={FiUsers}
          title="Macaamiisha"
          value="1,245"
          change="+12% this month"
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={FiShoppingBag}
          title="Bookings"
          value="892"
          change="+8% this month"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={FiDollarSign}
          title="Revenue"
          value="$24,560"
          change="+15% this month"
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          icon={FiActivity}
          title="Active Providers"
          value="156"
          change="+5% this month"
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiUsers className="mr-3 text-primary" size={24} />
            <span>Maamulka Isticmaalaha</span>
          </h2>
          <div className="space-y-3">
            <AdminAction
              icon={FiUsers}
              title="Eeg Isticmaalaha Weydaarsan"
              description="Fiiri macaamiisha oo dhan iyo tafsiilka"
              link="/admin/users"
            />
            <AdminAction
              icon={FiShield}
              title="Hubi Isticmaalaha"
              description="Hubi isticmaalaha cusub iyo adeegyada"
              link="/admin/verifications"
            />
            <AdminAction
              icon={FiSettings}
              title="Bedel Xukunka"
              description="Bedel xukunka platform-ka"
              link="/admin/settings"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiShoppingBag className="mr-3 text-primary" size={24} />
            <span>Maamulka Adeegyada</span>
          </h2>
          <div className="space-y-3">
            <AdminAction
              icon={FiShoppingBag}
              title="Eeg Adeegyada"
              description="Fiiri adeegyada oo dhan iyo macluumaadka"
              link="/admin/services"
            />
            <AdminAction
              icon={FiUsers}
              title="Eeg Providers"
              description="Fiiri nadheeryahan oo dhan iyo xaaladda"
              link="/admin/providers"
            />
            <AdminAction
              icon={FiActivity}
              title="Analytics"
              description="Aray analytics-ka platform-ka"
              link="/admin/analytics"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value, change, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-dark">{value}</p>
    <p className={`text-sm mt-1 ${
      change.startsWith('+') ? 'text-green-600' : 'text-red-600'
    }`}>
      {change}
    </p>
  </div>
)

const AdminAction = ({ icon: Icon, title, description, link }) => (
  <Link
    to={link}
    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
  >
    <div className="flex items-start">
      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
        <Icon className="text-primary" size={20} />
      </div>
      <div>
        <h3 className="font-semibold text-dark mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </Link>
)

export default AdminPanel