import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { removeUser } from "../utils/userslice";
import { Link } from "react-router";
const Navbar = () =>
{
    // 1. Declare data at the top level of the component so the whole function can see it
    const data = useSelector((state) => state.userStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 2. Handle the "null" case (Optional Chaining)
    // If data is null, data?.firstName will just return undefined instead of crashing the app
    const handleLogout = async () =>
    {

        await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
        dispatch(removeUser());
        navigate('/login');
    };
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">Devmeet</Link>
            </div>
            <div className="flex-1">
                {/* The ?. prevents the "Cannot read property firstName of null" error */}
                <a className="btn btn-ghost text-xl">{data?.firstName}</a>
            </div>
            {data && <div className="flex gap-2">
                <div className="mx-5 dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src={data.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to='/profile' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to={'/connections'}>Connections</Link></li>
                        <li><Link to={'/request'}>Requests</Link></li>
                        <li><a onClick={() =>
                        {
                            handleLogout();
                        }}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    );
};

export default Navbar;