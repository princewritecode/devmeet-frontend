import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userslice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const Body = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => { return state.userStore; });
    const fetchUser = async () =>
    {
        if (userData) return;

        try
        {
            const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
            dispatch(addUser(res.data));
        }
        catch (err)
        {
            navigate('/login');
            console.log(err.message);
        }
    };
    useEffect(() =>
    {
        fetchUser();
    }, []);

    return (<>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
    );
};

export default Body;