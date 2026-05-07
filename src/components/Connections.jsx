import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () =>
{
    const dispatch = useDispatch();

    // Selecting connections from Redux store
    // Ensure the key 'connections' matches your store.js configuration
    const connections = useSelector((state) => state.connections);

    const fetchConnection = async () =>
    {
        try
        {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });
            // Updating Redux Store
            dispatch(addConnection(res.data.data));
            console.log(res.data.data);
        } catch (err)
        {
            console.error("Fetch Error:", err.message);
        }
    };

    useEffect(() =>
    {
        // Only fetch if we don't have connections to avoid unnecessary API calls
        if (!connections || connections.length === 0)
        {
            fetchConnection();
        }
    }, []);

    // 1. Initial Loading State
    if (!connections)
    {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-dots loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-100 pb-8">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                            Network
                        </h1>
                        <p className="text-slate-500 mt-3 text-lg font-medium">
                            You have <span className="text-blue-600">{connections.length}</span> active developer connections.
                        </p>
                    </div>
                </div>

                {/* 2. Empty State */}
                {connections.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                            <span className="text-5xl">⚡</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Your network is quiet</h3>
                        <p className="text-slate-500 mt-2">Head over to the feed to find like-minded devs.</p>
                        <button className="btn btn-primary btn-wide mt-8 rounded-xl">Explore Feed</button>
                    </div>
                ) : (
                    /* 3. Connections List */
                    <div className="grid grid-cols-1 gap-4">
                        {connections.map((conn) =>
                        {
                            // Extract user info from the connection object
                            const user = conn.displayUser;

                            return (
                                <div
                                    key={conn._id}
                                    className="group flex items-center p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300"
                                >
                                    {/* Avatar with Status Ring */}
                                    <div className="avatar placeholder ring-offset-2 ring-offset-white group-hover:ring-2 ring-blue-100 rounded-2xl transition-all">
                                        <div className="bg-slate-900 text-white rounded-2xl w-20 h-20">
                                            <span className="text-2xl font-bold">
                                                {user?.firstName?.[0]?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Connection Details */}
                                    <div className="ml-6 flex-1">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl font-extrabold text-slate-800 capitalize tracking-tight">
                                                {user?.firstName} {user?.lastName}
                                            </h2>
                                            <div className="badge badge-sm bg-green-100 text-green-700 border-none font-bold px-3">
                                                {conn.status}
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-medium mt-1">
                                            Software Engineer •
                                            <span className="text-slate-400 text-sm ml-2">
                                                Joined {new Date(conn.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Action Area */}
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="btn btn-square btn-outline border-slate-200 text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Connections;