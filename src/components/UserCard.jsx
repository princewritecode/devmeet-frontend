import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedslice";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();

    const handleSendRequest = async (status, _id) => {
        if (!_id) return; // Prevent action if this is a live preview card without an ID
        try {
            await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(_id));
        } catch (err) {
            console.error("Error sending request:", err.message);
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm rounded-2xl shadow-xl border border-base-300 overflow-hidden transform transition-all hover:shadow-2xl">
            <figure className="h-64 bg-base-200 overflow-hidden relative">
                {user.photoUrl ? (
                    <img
                        src={user.photoUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-base-content/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                )}
            </figure>
            <div className="card-body p-6">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="card-title text-2xl font-extrabold tracking-tight text-base-content">
                        {user.firstName || "First"} {user.lastName || "Last"}
                    </h2>
                    {user.age && (
                        <div className="badge badge-neutral font-bold mt-1">{user.age}</div>
                    )}
                </div>
                
                {user.gender && (
                    <p className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-2">{user.gender}</p>
                )}

                <p className="text-base-content/80 font-medium leading-relaxed my-2 line-clamp-3">
                    {user.about || "This user hasn't written anything about themselves yet."}
                </p>
                
                <div className="card-actions justify-center mt-6 gap-3">
                    <button onClick={() => handleSendRequest("interested", user._id)} className="flex-1 py-3 rounded-xl bg-neutral text-neutral-content font-bold shadow-md shadow-neutral/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                        Interested
                    </button>
                    <button onClick={() => handleSendRequest("ignore", user._id)} className="flex-1 py-3 rounded-xl bg-transparent border-2 border-base-300 text-base-content font-bold hover:bg-base-200 hover:border-base-300 transition-all duration-200 cursor-pointer">
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;