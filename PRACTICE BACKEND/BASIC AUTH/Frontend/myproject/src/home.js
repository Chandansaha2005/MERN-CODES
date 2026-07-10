import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/fetch-detail", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((s) => {
                console.log(s, "userData");
                setData(s.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch data");
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        navigate("/login");
    };

    const handleDelete = (id) => {
        // Add delete functionality here if needed
        console.log("Delete user:", id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-50">
            {/* Header */}
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="font-montserrat text-3xl font-bold text-primary-900">Welcome User</h1>
                        <p className="font-poppins text-primary-600 text-sm mt-1">Manage your customers data</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-white font-poppins font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-secondary-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-poppins text-primary-600 text-sm font-semibold">Total Users</p>
                                <p className="font-montserrat text-4xl font-bold text-primary-900 mt-2">{data.length}</p>
                            </div>
                            <div className="text-secondary-400 text-5xl opacity-20">👥</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-primary-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-poppins text-primary-600 text-sm font-semibold">Active Today</p>
                                <p className="font-montserrat text-4xl font-bold text-primary-900 mt-2">{Math.max(0, data.length - 2)}</p>
                            </div>
                            <div className="text-primary-400 text-5xl opacity-20">✨</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-primary-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-poppins text-primary-600 text-sm font-semibold">Last Updated</p>
                                <p className="font-montserrat text-2xl font-bold text-primary-900 mt-2">Today</p>
                            </div>
                            <div className="text-primary-600 text-5xl opacity-20">📅</div>
                        </div>
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 px-6 py-6">
                        <h2 className="font-montserrat text-2xl font-bold text-white">Customer Directory</h2>
                        <p className="font-poppins text-secondary-100 text-sm mt-1">View all registered users</p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-12">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-400"></div>
                                <p className="font-poppins text-primary-600 mt-4">Loading data...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="m-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                            <p className="font-poppins text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && data.length === 0 && !error && (
                        <div className="text-center py-12">
                            <p className="font-poppins text-primary-600 text-lg">No users found</p>
                        </div>
                    )}

                    {/* Table */}
                    {!loading && data.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-primary-50 border-b-2 border-primary-200">
                                        <th className="px-6 py-4 text-left font-montserrat text-primary-900 font-bold text-sm">ID</th>
                                        <th className="px-6 py-4 text-left font-montserrat text-primary-900 font-bold text-sm">Name</th>
                                        <th className="px-6 py-4 text-left font-montserrat text-primary-900 font-bold text-sm">Email</th>
                                        <th className="px-6 py-4 text-left font-montserrat text-primary-900 font-bold text-sm">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-primary-100">
                                    {data.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className="hover:bg-primary-50 transition duration-300 ease-in-out"
                                        >
                                            <td className="px-6 py-4 font-poppins text-primary-900 text-sm font-semibold">
                                                <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-xs">
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-poppins text-primary-800 text-sm">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-300 to-secondary-500 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                    <span className="font-semibold">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-poppins text-primary-700 text-sm">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 font-poppins text-sm">
                                                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-xs font-semibold">
                                                    ✓ Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Footer Stats */}
                    <div className="bg-primary-50 px-6 py-4 border-t border-primary-200">
                        <p className="font-poppins text-primary-600 text-sm">
                            Showing <span className="font-bold text-primary-900">{data.length}</span> total users
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;