import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router";
const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((state) => state.connections);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
      console.log(res.data.data);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    if (!connections || connections.length === 0) {
      fetchConnection();
    }
  }, []);

  if (!connections) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-neutral"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-base-200 py-16 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-base-300 pb-8">
          <div>
            <h1 className="text-5xl font-black text-base-content tracking-tight">
              Network
            </h1>
            <p className="text-base-content/60 mt-3 text-lg font-medium">
              You have{" "}
              <span className="font-bold text-base-content">
                {connections.length}
              </span>{" "}
              active connections.
            </p>
          </div>
        </div>

        {/* Empty State */}
        {connections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-[2rem] border border-base-300 shadow-xl">
            <div className="bg-base-200 p-6 rounded-full shadow-sm mb-6">
              <span className="text-5xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-base-content">
              Your network is quiet
            </h3>
            <p className="text-base-content/60 mt-2 font-medium">
              Head over to the feed to find like-minded devs.
            </p>
            <Link to={"/"}>
              {" "}
              <button className="btn btn-neutral btn-wide mt-8 rounded-xl font-bold">
                Explore Feed
              </button>
            </Link>
          </div>
        ) : (
          /* Connections List */
          <div className="grid grid-cols-1 gap-5">
            {connections.map((conn) => {
              const user = conn.displayUser;

              return (
                <div
                  key={conn._id}
                  className="group flex items-center p-6 bg-base-100 rounded-3xl border border-base-300 hover:border-neutral hover:shadow-xl transition-all duration-300"
                >
                  {/* Avatar */}
                  <div className="avatar placeholder ring-offset-2 ring-offset-base-100 group-hover:ring-2 ring-neutral/20 rounded-2xl transition-all">
                    <div className="bg-neutral text-neutral-content rounded-2xl w-20 h-20">
                      {user?.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt="avatar"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold">
                          {user?.firstName?.[0]?.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Connection Details */}
                  <div className="ml-6 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-extrabold text-base-content capitalize tracking-tight">
                        {user?.firstName} {user?.lastName}
                      </h2>
                      <div className="badge badge-neutral font-bold uppercase tracking-widest text-[10px] px-3 py-2">
                        {conn.status}
                      </div>
                    </div>
                    <p className="text-base-content/80 font-medium">
                      Developer •
                      <span className="text-base-content/50 text-sm ml-2">
                        Connected{" "}
                        {new Date(conn.updatedAt).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>

                  {/* Action Area */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="btn btn-square btn-outline border-base-300 text-base-content hover:bg-neutral hover:border-neutral hover:text-neutral-content transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
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
