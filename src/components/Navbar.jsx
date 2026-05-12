import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { removeUser } from "../utils/userslice";
import { Link } from "react-router";

const Navbar = () => {
    const data = useSelector((state) => state.userStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
        dispatch(removeUser());
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50">
            <div className="flex-1 px-2 lg:px-4">
                <Link to='/' className="text-3xl font-extrabold text-base-content hover:opacity-80 transition-opacity">
                    Devmeet
                </Link>
            </div>
            <div className="flex-none gap-2">
                {data && <div className="hidden sm:block text-sm font-medium mr-2 text-base-content/80">
                    Welcome, {data?.firstName}
                </div>}
                {data && <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-base-300 hover:ring-neutral transition-all">
                        <div className="w-10 rounded-full">
                            <img alt="User Avatar" src={data.photoUrl} />
                        </div>
                    </div>
                    <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-base-200">
                        <li>
                            <Link to='/profile' className="justify-between font-medium py-2">
                                Profile
                            </Link>
                        </li>
                        <li><Link to={'/connections'} className="font-medium py-2">Connections</Link></li>
                        <li><Link to={'/request'} className="font-medium py-2">Requests</Link></li>
                        <div className="divider my-1"></div>
                        <li><a onClick={handleLogout} className="text-error font-medium py-2">Logout</a></li>
                    </ul>
                </div>}
            </div>
        </div>
    );
};

export default Navbar;