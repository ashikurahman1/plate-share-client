import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { FaHamburger, FaHandHoldingHeart, FaUsers, FaArrowUp } from 'react-icons/fa';

const DashboardOverview = () => {
  const { user, dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    myFoods: 0,
    myRequests: 0,
    availableFoods: 0,
    totalUsers: 0,
    totalRequests: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [myFoods, myReqs, availables] = await Promise.all([
          axiosSecure.get(`/foods?email=${user?.email}`),
          axiosSecure.get(`/my-requests?email=${user?.email}`),
          axiosSecure.get('/foods/availables')
        ]);
        
        let extraStats = {};
        if (dbUser?.role === 'admin') {
          // Future: Add real admin stats endpoints
          // For now, using placeholders or simplified logic
          extraStats = { totalUsers: 142, totalRequests: 58 }; 
        }

        setStats({
          myFoods: myFoods.data.length,
          myRequests: myReqs.data.length,
          availableFoods: availables.data.length,
          ...extraStats
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (user?.email) fetchStats();
  }, [user, axiosSecure, dbUser]);

  const data = [
    { name: 'Jan', shared: 4, req: 2 },
    { name: 'Feb', shared: 7, req: 5 },
    { name: 'Mar', shared: 5, req: 8 },
    { name: 'Apr', shared: 9, req: 4 },
    { name: 'May', shared: stats.myFoods, req: stats.myRequests },
  ];

  const cards = dbUser?.role === 'admin' ? [
    { title: 'Global Platform Foods', value: stats.availableFoods, icon: <FaHamburger />, trend: 'Healthy', color: 'from-blue-500 to-blue-600' },
    { title: 'Total Community Users', value: stats.totalUsers, icon: <FaUsers />, trend: '+14%', color: 'from-emerald-500 to-emerald-600' },
    { title: 'Total Processed Req', value: stats.totalRequests, icon: <FaHandHoldingHeart />, trend: 'Active', color: 'from-amber-500 to-amber-600' },
  ] : [
    { title: 'My Shared Foods', value: stats.myFoods, icon: <FaHamburger />, trend: '+12%', color: 'from-blue-500 to-blue-600' },
    { title: 'My Requests', value: stats.myRequests, icon: <FaHandHoldingHeart />, trend: '+5%', color: 'from-emerald-500 to-emerald-600' },
    { title: 'Active Items', value: stats.availableFoods, icon: <FaUsers />, trend: 'Live', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic">Dashboard <span className="text-primary tracking-tighter">Overview</span></h1>
          <p className="text-base-content/60 font-medium">Welcome back, {user?.displayName}!</p>
        </div>
        <div className="bg-base-100 px-6 py-3 rounded-2xl shadow-sm border border-base-300 font-bold text-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${card.color} text-white shadow-xl relative overflow-hidden group`}>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
               <span className="text-9xl">{card.icon}</span>
            </div>
            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">{card.title}</p>
                <h2 className="text-5xl font-black">{card.value}</h2>
                <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold">
                  <FaArrowUp /> {card.trend}
                </div>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-base-100 p-8 rounded-[3rem] shadow-xl border border-base-200">
          <h3 className="text-xl font-black mb-8 italic">Sharing Activity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorShared" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="shared" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorShared)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-base-100 p-8 rounded-[3rem] shadow-xl border border-base-200">
          <h3 className="text-xl font-black mb-8 italic">Request Volume</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="req" fill="#f59e0b" radius={[10, 10, 10, 10]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#f59e0b' : '#fde68a'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
