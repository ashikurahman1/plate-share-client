import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaUsers, FaHamburger, FaShieldAlt } from 'react-icons/fa';

const AdminManage = () => {
    const [foods, setFoods] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('foods');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [foodsRes, usersRes] = await Promise.all([
                    axiosSecure.get('/foods'),
                    axiosSecure.get('/users')
                ]);
                setFoods(foodsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [axiosSecure]);

    const handleDeleteFood = async (id) => {
        Swal.fire({
            title: 'Delete from platform?',
            text: "Admins can remove any item violating community guidelines.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff4d4d',
            confirmButtonText: 'Yes, remove it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/foods/${id}`);
                    setFoods(foods.filter(f => f._id !== id));
                    Swal.fire('Removed!', 'The item has been deleted from the platform.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Action failed', 'error');
                }
            }
        });
    };

    const handleDeleteUser = async (id, email) => {
        if (email === 'admin@test.com') {
            return Swal.fire('Action Forbidden', 'Main admin account cannot be deleted.', 'error');
        }

        Swal.fire({
            title: 'Remove User?',
            text: "This will permanently delete the user account from the database.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff4d4d',
            confirmButtonText: 'Yes, delete user!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/users/${id}`);
                    setUsers(users.filter(u => u._id !== id));
                    Swal.fire('Deleted!', 'User has been removed from the platform.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Action failed', 'error');
                }
            }
        });
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="animate-fade-in space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black italic mb-2">Admin <span className="text-accent italic">Moderation Hub .</span></h1>
                    <p className="text-base-content/60 font-medium">Monitoring platform-wide activity and community compliance.</p>
                </div>
                
                {/* Tabs */}
                <div className="flex bg-base-200 p-1 rounded-2xl">
                    <button 
                        onClick={() => setActiveTab('foods')}
                        className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === 'foods' ? 'bg-white text-primary shadow-sm' : 'text-base-content/50 hover:text-base-content'}`}
                    >
                        <FaHamburger size={14} /> Foods ({foods.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === 'users' ? 'bg-white text-primary shadow-sm' : 'text-base-content/50 hover:text-base-content'}`}
                    >
                        <FaUsers size={14} /> Users ({users.length})
                    </button>
                </div>
            </div>

            {activeTab === 'foods' ? (
                <div className="bg-base-100 rounded-[3rem] shadow-xl border border-base-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-lg w-full">
                            <thead>
                                <tr className="bg-base-200/50 text-base-content/40 font-black uppercase text-[10px] tracking-[0.2em]">
                                    <th className="pl-10">Food & Donor</th>
                                    <th>Status</th>
                                    <th>Donor Email</th>
                                    <th className="pr-10 text-right">Moderation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((food) => (
                                    <tr key={food._id} className="hover:bg-base-100 transition-colors">
                                        <td className="pl-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 rounded-xl">
                                                        <img src={food.food_img_thumb} alt="" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-black text-lg italic">{food.food_name}</p>
                                                    <p className="text-[10px] font-bold opacity-40">by {food.donor_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm font-black rounded-lg ${food.food_status === 'Available' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                                                {food.food_status}
                                            </span>
                                        </td>
                                        <td className="text-sm font-medium opacity-60">
                                            {food.donor_email}
                                        </td>
                                        <td className="pr-10 text-right">
                                            <button 
                                                onClick={() => handleDeleteFood(food._id)}
                                                className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-colors text-error"
                                            >
                                                <FaTrashAlt size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-base-100 rounded-[3rem] shadow-xl border border-base-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-lg w-full">
                            <thead>
                                <tr className="bg-base-200/50 text-base-content/40 font-black uppercase text-[10px] tracking-[0.2em]">
                                    <th className="pl-10">User Info</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th className="pr-10 text-right">Moderation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-base-100 transition-colors">
                                        <td className="pl-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 rounded-xl">
                                                        <img src={u.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'} alt="" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-black text-lg italic">{u.name || 'Anonymous'}</p>
                                                    <p className="text-[10px] font-bold opacity-40">since {new Date(u.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-sm font-medium opacity-60">
                                            {u.email}
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm font-black rounded-lg flex items-center gap-1 w-fit ${u.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                                                {u.role === 'admin' && <FaShieldAlt size={10} />}
                                                {u.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="pr-10 text-right">
                                            <button 
                                                onClick={() => handleDeleteUser(u._id, u.email)}
                                                className={`btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-colors text-error ${u.email === 'admin@test.com' ? 'btn-disabled opacity-20' : ''}`}
                                            >
                                                <FaTrashAlt size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManage;
