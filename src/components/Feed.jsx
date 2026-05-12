import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUsersInFeed } from "../utils/feedslice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () =>
{
    const feed = useSelector((store) => store.feedUsers);
    const dispatch = useDispatch();

    const getFeed = async () =>
    {
        if (feed) return; // Prevent fetching if we already have data
        try
        {
            const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
            // Make sure you are dispatching the correct part of the response
            dispatch(addUsersInFeed(res.data.data || res.data));
        } catch (err)
        {
            console.log(err.message);
        }
    };

    useEffect(() =>
    {
        getFeed();
    }, []);

    // FIX: Add a loading state or null check
    if (!feed) return <h1 className="text-center mt-10">Loading...</h1>;

    // FIX: Handle empty feed case
    if (feed.length === 0) return <h1 className="text-center mt-10">No users found!</h1>;

    return (
        <div className="min-h-[85vh] bg-base-200 py-12 px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 md:gap-12">
                {
                    feed.map((feedUser, index) =>
                    {
                        return <UserCard key={feedUser._id || index} user={feedUser} />;
                    })
                }
            </div>
        </div>
    );
};


export default Feed;