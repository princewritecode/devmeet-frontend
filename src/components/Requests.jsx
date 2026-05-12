import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/request/recieved', {
                withCredentials: true
            });
            dispatch(addRequest(res?.data?.data || []));
        } catch (err) {
            console.error("Fetch Error:", err.message);
            dispatch(addRequest([]));
        }
    };

    const reviewRequest = async (status, id) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/request/review/${status}/${id}`,
                {},
                { withCredentials: true }
            );

            if (res.data) {
                dispatch(removeRequest(id));
            }
        } catch (err) {
            console.error("Review Error:", err.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    return (
        <div className="min-h-[85vh] bg-base-200 py-16 px-4 transition-colors duration-300">
            <div className="max-w-3xl mx-auto">

                {/* Header Section */}
                <div className="flex items-center justify-between mb-12 border-b border-base-300 pb-8">
                    <div>
                        <h1 className="text-5xl font-black text-base-content tracking-tight">
                            Requests
                        </h1>
                        <p className="text-base-content/60 font-medium mt-2 text-lg">
                            Pending connection requests
                        </p>
                    </div>
                    <div className="bg-base-100 border border-base-300 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral animate-pulse"></div>
                        <span className="text-base-content font-extrabold text-lg">{requests.length}</span>
                        <span className="text-base-content/50 font-bold uppercase text-xs tracking-widest">Received</span>
                    </div>
                </div>

                {/* Empty State */}
                {requests.length === 0 ? (
                    <div className="text-center py-24 bg-base-100 rounded-[3rem] border border-base-300 shadow-xl transition-all">
                        <div className="text-6xl mb-6">🥂</div>
                        <h2 className="text-2xl font-bold text-base-content tracking-tight">All Caught Up!</h2>
                        <p className="text-base-content/60 mt-2 max-w-xs mx-auto text-balance font-medium">
                            Your inbox is empty. Why not explore the feed to find more developers?
                        </p>
                    </div>
                ) : (
                    /* Requests List */
                    <div className="space-y-5">
                        {requests.map((req) => {
                            const user = req.fromUserId;
                            return (
                                <div
                                    key={req._id}
                                    className="group flex flex-col sm:flex-row items-center p-6 sm:p-8 bg-base-100 rounded-[2.5rem] border border-base-300 hover:border-neutral hover:shadow-xl transition-all duration-300 gap-6"
                                >
                                    {/* Profile Avatar */}
                                    <div className="avatar">
                                        <div className="w-24 h-24 rounded-3xl bg-base-200 ring-4 ring-base-100 shadow-inner group-hover:ring-neutral/10 transition-all duration-500">
                                            <img
                                                src={user?.photoUrl || `https://ui-avatars.com/api/?name=${user?.firstName}&background=random`}
                                                alt="avatar"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* User Details */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <h2 className="text-2xl font-extrabold text-base-content tracking-tight capitalize group-hover:text-neutral transition-colors">
                                            {user?.firstName} {user?.lastName}
                                        </h2>
                                        <p className="text-base-content/50 font-bold text-xs uppercase tracking-widest mt-1.5">
                                            Requested on {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </p>
                                        <div className="mt-3 inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black bg-base-200 text-base-content/60 uppercase tracking-widest group-hover:bg-neutral/10 group-hover:text-neutral transition-all">
                                            {req.status}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                                        <button
                                            onClick={() => reviewRequest("rejected", req._id)}
                                            className="btn btn-circle btn-ghost text-base-content/30 hover:bg-error/10 hover:text-error transition-all active:scale-90"
                                            aria-label="Reject Request"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => reviewRequest("accepted", req._id)}
                                            className="btn btn-neutral flex-1 sm:flex-none h-14 rounded-2xl px-10 text-base font-bold shadow-lg hover:-translate-y-0.5 border-none transition-all active:scale-95"
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