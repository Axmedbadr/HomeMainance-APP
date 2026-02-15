import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiCheck, FiX, FiActivity } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be valid'),
  address: z.string().optional(),
})

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  })

  React.useEffect(() => {
    reset({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    })
  }, [user, reset])

  const onSubmit = async (data) => {
    try {
      console.log('Update profile:', data)
      updateUser({ ...user, ...data })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Loading Account</p>
      </div>
    )
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#0a0f1d] pt-16 pb-32 px-6">
        <div className="container mx-auto max-w-4xl text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-500/30">
              {user.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight mb-2">{user.name}</h1>
              <p className="text-white/50 font-medium">Manage your personal information and security settings.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 max-w-4xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          
          {/* Section Header */}
          <div className="p-8 md:p-10 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Personal Profile</h2>
              <p className="text-slate-400 text-sm font-medium">Basic info, for a better experience.</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-slate-50 text-slate-900 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <FiEdit2 size={14} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="p-8 md:p-12">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Full Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        {...register('name')}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-red-500' : 'focus:ring-blue-600'}`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 font-bold ml-2">{errors.name.message}</p>}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Phone Number</label>
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        {...register('phone')}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 transition-all ${errors.phone ? 'ring-2 ring-red-500' : 'focus:ring-blue-600'}`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 font-bold ml-2">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-2 opacity-60">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Email Address (Locked)</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-slate-100 border-none rounded-2xl font-bold cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Current Address</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      {...register('address')}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <><FiActivity className="animate-spin" /> Saving...</> : <><FiCheck /> Save Changes</>}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      reset()
                    }}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <FiX /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid md:grid-cols-2 gap-y-10 gap-x-12">
                <InfoRow icon={FiUser} label="Full Name" value={user.name} color="blue" />
                <InfoRow icon={FiMail} label="Email Address" value={user.email} color="indigo" />
                <InfoRow icon={FiPhone} label="Phone Number" value={user.phone || 'Not provided'} color="emerald" />
                <InfoRow icon={FiMapPin} label="Home Address" value={user.address || 'Not provided'} color="amber" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const InfoRow = ({ icon: Icon, label, value, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600'
  }
  
  return (
    <div className="flex items-center gap-6 group">
      <div className={`w-14 h-14 ${colors[color]} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-lg font-black text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  )
}

export default ProfilePage