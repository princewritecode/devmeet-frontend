import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userslice';
const EditProfile = ({ user }) =>
{
    console.log(user, 'print user');
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);

    const [toast, setToast] = useState(false);

    const dispatch = useDispatch();

    const saveProfile = async () =>
    {
        try
        {

            const res = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, gender, age, photoUrl, about }, {
                withCredentials: true
            });
            dispatch(addUser(res?.data?.data));



        }
        catch (err)
        {
            console.log(err.message);
        }
    };

    if (!user)
    {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {toast && <div className="toast toast-top toast-center">

                <div className="alert alert-success">
                    <span>user details updated</span>
                </div>
            </div>
            }
            <div className='flex my-20 justify-center gap-2.5'>
                <div className='flex justify-center'>

                    <fieldset className=" fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Edit Profile</legend>

                        <label className="label">Firstname</label>
                        <input type="text" className="input" value={firstName} onChange={(e) =>
                        {
                            setFirstName(e.target.value);
                        }} placeholder="firstname" />

                        <label className="label">Lastname</label>
                        <input type="text" className="input" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Lastname" />

                        <label className="label">Gender</label>
                        <input type="text" className="input" placeholder="gender" value={gender} onChange={e => setGender(e.target.value)} />

                        <label className="label">Photo</label>
                        <input type="text" className="input" placeholder="photo" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />

                        <label className="label">age</label>
                        <input type="number" className="input" value={age} onChange={e => setAge(e.target.value)} placeholder="age" />

                        <label className="label">About</label>
                        <input type="text" className="input" value={about} onChange={e => setAbout(e.target.value)} placeholder="about" />


                        <button className="btn btn-neutral mt-4" onClick={() =>
                        {
                            saveProfile();
                            setToast(true);
                            setTimeout(() => { setToast(false); }, 3000);
                        }}>Save details</button>
                    </fieldset>

                </div>
                <UserCard user={{ firstName, lastName, photoUrl, about, age, gender }}></UserCard>

            </div>
        </>
    );
};

export default EditProfile;