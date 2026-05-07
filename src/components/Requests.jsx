import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () =>
{
    const dispatch = useDispatch();
    // Ensure this matches your store configuration key
    const requests = useSelector((store) => store.request);

    const fetchRequests = async () =>
    {
        try
        {
            const res = await axios.get(BASE_URL + '/user/request/recieved', {
                withCredentials: true
            });
            dispatch(addRequest(res?.data?.data || []));
        } catch (err)
        {
            console.error("Fetch Error:", err.message);
            dispatch(addRequest([])); // Stop loading state even on error
        }
    };

    const reviewRequest = async (status, id) =>
    {
        try
        {
            // The API call to the backend
            const res = await axios.post(
                `${BASE_URL}/request/review/${status}/${id}`,
                {},
                { withCredentials: true }
            );

            if (res.data)
            {
                // Remove from Redux store to update UI instantly
                dispatch(removeRequest(id));
            }
        } catch (err)
        {
            console.error("Review Error:", err.message);
        }
    };

    useEffect(() =>
    {
        fetchRequests();
    }, []);

    // 1. Loading State
    if (!requests)
    {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-ring loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] py-16 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Header Section */}
                <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Requests
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Pending connection requests
                        </p>
                    </div>
                    <div className="bg-white border border-slate-200 px-5 py-2 rounded-2xl shadow-sm flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-blue-600 font-bold">{requests.length}</span>
                        <span className="text-slate-400 font-semibold uppercase text-xs tracking-widest">Received</span>
                    </div>
                </div>

                {/* 2. Empty State */}
                {requests.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm transition-all">
                        <div className="text-6xl mb-6">🥂</div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">All Caught Up!</h2>
                        <p className="text-slate-500 mt-2 max-w-xs mx-auto text-balance">
                            Your inbox is empty. Why not explore the feed to find more developers?
                        </p>
                    </div>
                ) : (
                    /* 3. Requests List */
                    <div className="space-y-4">
                        {requests.map((req) =>
                        {
                            const user = req.fromUserId;
                            return (
                                <div
                                    key={req._id}
                                    className="group flex items-center p-6 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/40 transition-all duration-500"
                                >
                                    {/* Profile Avatar */}
                                    <div className="avatar">
                                        <div className="w-24 h-24 rounded-3xl bg-slate-50 ring-4 ring-white shadow-inner group-hover:ring-blue-50 transition-all duration-500">
                                            <img
                                                src={user?.photoUrl || `https://ui-avatars.com/api/?name=${user?.firstName}&background=random`}
                                                alt="avatar"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* User Details */}
                                    <div className="ml-8 flex-1">
                                        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight capitalize group-hover:text-blue-600 transition-colors">
                                            {user?.firstName} {user?.lastName}
                                        </h2>
                                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                                            Requested on {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </p>
                                        <div className="mt-3 inline-flex items-center px-4 py-1 rounded-xl text-xs font-black bg-slate-100 text-slate-500 uppercase tracking-widest group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                                            {req.status}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => reviewRequest("rejected", req._id)}
                                            className="btn btn-circle btn-ghost text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                                            aria-label="Reject Request"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => reviewRequest("accepted", req._id)}
                                            className="btn btn-primary h-16 rounded-3xl px-10 text-lg font-bold shadow-xl shadow-blue-100 hover:shadow-blue-200 border-none transition-all active:scale-95"
                                        >
                                            Accept
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

export default Requests;