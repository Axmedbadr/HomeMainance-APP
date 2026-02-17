import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity, FiShield, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
// 1. Soo dhowayso API-gaaga ama AdminService
import api from '../services/api'; 

const AdminPanel = () => {
  const { user } = useAuth();
  
  // 2. State-ka loogu talagalay xogta ka imanaysa Backend-ka
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeProviders: 0,
    pendingProviders: 0
  });
  const [loading, setLoading] = useState(true);

  // 3. useEffect si xogta looga soo rido server-ka
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        // Hubi in endpoint-kan (/admin/stats) uu ka furan yahay backend-kaaga
        const response = await api.get('/admin/stats');
        const data = response.data.data || response.data;
        
        setStats({
          totalUsers: data.totalUsers || 0,
          totalBookings: data.totalBookings || 0,
          totalRevenue: data.totalRevenue || 0,
          activeProviders: data.activeProviders || 0,
          pendingProviders: data.pendingProviders || 0
        });
      } catch (error) {
        console.error("Cillad ayaa ku dhacday soo ridista xogta Admin-ka:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchAdminStats();
    }
  }, [user]);

  // Security Check
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-red-100 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShield size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500 font-medium mb-8">Ma lahan awood aad ku gashid boggan. Admin kaliya ayaa loo ogol yahay.</p>
          <Link to="/dashboard" className="flex items-center justify-center gap-2 text-blue-600 font-bold hover:underline">
            <FiArrowLeft /> Ku laabo Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Admin Control Center</h1>
          <p className="text-slate-500 font-medium italic">Maamulka guud ee platform-ka iyo la socodka xogta.</p>
        </div>

        {/* Stats Grid - Halkan waxaan ku xirnay xogta dhabta ah (stats) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={FiUsers} title="Macaamiisha" value={stats.totalUsers.toLocaleString()} change="+12%" color="bg-blue-50 text-blue-600" />
          <StatCard icon={FiShoppingBag} title="Bookings" value={stats.totalBookings} change="+8%" color="bg-emerald-50 text-emerald-600" />
          <StatCard icon={FiDollarSign} title="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} change="+15%" color="bg-violet-50 text-violet-600" />
          <StatCard icon={FiActivity} title="Active Providers" value={stats.activeProviders} change="+5%" color="bg-amber-50 text-amber-600" />
        </div>

        {/* Main Actions Area */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                <FiUsers size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Maamulka Isticmaalaha</h2>
            </div>
            
            <div className="space-y-4">
              <AdminAction
                icon={FiShield}
                title="Hubi Codsiyada Cusub"
                description={`Waxaa jira ${stats.pendingProviders} xirfadlayaal oo sugaya ansixin`}
                link="/admin/verifications"
                badge={stats.pendingProviders > 0 ? stats.pendingProviders : null} 
              />
              <AdminAction
                icon={FiUsers}
                title="Dhammaan Isticmaalaha"
                description="Fiiri macaamiisha iyo xirfadlayaasha"
                link="/admin/users"
              />
            </div>
          </div>

          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200">
                <FiShoppingBag size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Maamulka Adeegyada</h2>
            </div>

            <div className="space-y-4">
              <AdminAction 
                icon={FiShoppingBag} 
                title="Eeg Adeegyada" 
                description="Maamul adeegyada jira ee platform-ka" 
                link="/admin/services" 
              />
              <AdminAction 
                icon={FiActivity} 
                title="Xogta Analytics" 
                description="Fiiri horumarka iyo xogta guud" 
                link="/admin/analytics" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ... Helper Components (StatCard & AdminAction) waa sidoodii hore ...

const StatCard = ({ icon: Icon, title, value, change, color }) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color}`}>
      <Icon size={28} />
    </div>
    <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{title}</h3>
    <div className="flex items-baseline gap-3">
      <p className="text-3xl font-black text-slate-900">{value}</p>
      <span className="text-xs font-bold text-emerald-600">{change}</span>
    </div>
  </div>
);

const AdminAction = ({ icon: Icon, title, description, link, badge }) => (
  <Link to={link} className="group block p-6 bg-slate-50 rounded-[2rem] hover:bg-slate-900 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
          <Icon className="text-blue-600 group-hover:text-blue-400" size={24} />
        </div>
        <div>
          <h3 className="font-black text-slate-900 group-hover:text-white transition-colors">{title}</h3>
          <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors font-medium">{description}</p>
        </div>
      </div>
      {badge && (
        <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
          {badge}
        </span>
      )}
    </div>
  </Link>
);

export default AdminPanel;