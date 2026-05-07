import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userslice';
import { useNavigate } from 'react-router';
const Login = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState(false);

    const loginUser = async () =>
    {
        try
        {
            // 1. Point to the actual backend URL
            // 2. Wrap in try/catch to handle errors
            const response = await axios.post(BASE_URL + '/login',
                { emailId: email, password },
                { withCredentials: true }
            );

            dispatch(addUser(response.data));
            console.log(response);
            // Axios puts the server's response in the .data property
            console.log("Login Successful:", response.data);
            navigate('/');
            // You would usually redirect the user or save user state here

        } catch (error)
        {
            // Handle errors (401 Unauthorized, 500 Server Error, etc.)
            if (error.response)
            {
                setError(error.message);
                console.error("Login Failed:", error.response.data.message);
            } else
            {
                setError(error.message);
                console.error("Network error or server is down.");
            }
        }
    };
    const [email, setEmail] = useState('anjali@gmail.com');
    const [password, setPassword] = useState('anjaliA@1');
    return (
        <div className='flex justify-center  my-40'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input type="email" value={email} onChange={(e) =>
                {
                    e.preventDefault();
                    setEmail(e.target.value);
                }} className="input" placeholder="Email" />

                <label className="label">Password</label>
                <input type="password" value={password} className="input" placeholder="Password" onChange={(e) =>
                {
                    e.preventDefault();
                    setPassword(e.target.value);
                }} />
                {error && <p className='text-red-500'>{error}</p>}
                <button className="btn btn-neutral mt-4" onClick={() =>
                {
                    loginUser();
                }}>Login</button>
            </fieldset>
        </div>
    );
};

export default Login;