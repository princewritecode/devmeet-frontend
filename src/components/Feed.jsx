import axios from "axios";
import { useDispatch } from "react-redux";
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
            const res = await axios.get('http://localhost:3000/user/feed', { withCredentials: true });
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
        <div className="flex justify-center">
            {/* Now it's safe to access feed[0] */}
            {
                feed.map((feedUser) =>
                {
                    return <UserCard user={feedUser} />;
                })
            }
        </div>
    );
};


export default Feed;