import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userslice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [about, setAbout] = useState(user?.about || "");

    const [toast, setToast] = useState(false);

    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, gender, age, photoUrl, about }, {
                withCredentials: true
            });
            dispatch(addUser(res?.data?.data));
        } catch (err) {
            console.log(err.message);
        }
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
            </div>
        );
    }

    return (
        <>
            {toast && (
                <div className="toast toast-top toast-center z-50 animate-fade-in">
                    <div className="alert bg-neutral text-neutral-content shadow-lg font-bold rounded-xl border-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Profile updated successfully!</span>
                    </div>
                </div>
            )}
            
            <div className="min-h-[85vh] bg-base-200 py-12 px-4 selection:bg-neutral selection:text-neutral-content transition-colors duration-300">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-10">
                    
                    {/* Form Section */}
                    <div className="w-full max-w-lg bg-base-100 rounded-2xl p-8 sm:p-10 shadow-xl border border-base-300 flex-1">
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-base-content tracking-tight mb-2">
                                Edit Profile
                            </h1>
                            <p className="text-base-content/60 text-sm font-medium">
                                Update your personal details and public profile.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {/* Name Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="form-control">
                                    <label className="label pb-2">
                                        <span className="label-text font-semibold text-base-content/80">First Name</span>
                                    </label>
                                    <input type="text" className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
                                </div>
                                <div className="form-control">
                                    <label className="label pb-2">
                                        <span className="label-text font-semibold text-base-content/80">Last Name</span>
                                    </label>
                                    <input type="text" className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="form-control">
                                    <label className="label pb-2">
                                        <span className="label-text font-semibold text-base-content/80">Age</span>
                                    </label>
                                    <input type="number" className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content" value={age} onChange={e => setAge(e.target.value)} placeholder="25" />
                                </div>
                                <div className="form-control">
                                    <label className="label pb-2">
                                        <span className="label-text font-semibold text-base-content/80">Gender</span>
                                    </label>
                                    <select value={gender} onChange={e => setGender(e.target.value)} className="select select-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content">
                                        <option value="" disabled>Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label pb-2">
                                    <span className="label-text font-semibold text-base-content/80">Photo URL</span>
                                </label>
                                <input type="text" className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content" placeholder="https://example.com/photo.jpg" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
                            </div>

                            <div className="form-control">
                                <label className="label pb-2">
                                    <span className="label-text font-semibold text-base-content/80">About</span>
                                </label>
                                <textarea className="textarea textarea-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content h-24 resize-none" value={about} onChange={e => setAbout(e.target.value)} placeholder="Write something about yourself..."></textarea>
                            </div>

                            <button className="w-full py-3.5 mt-6 rounded-xl bg-neutral text-neutral-content font-bold text-base shadow-lg shadow-neutral/30 hover:shadow-neutral/50 hover:-translate-y-0.5 transition-all duration-200" onClick={() => {
                                saveProfile();
                                setToast(true);
                                setTimeout(() => { setToast(false); }, 3000);
                            }}>
                                Save details
                            </button>
                        </div>
                    </div>

                    {/* Live Preview Section */}
                    <div className="w-full lg:w-96 flex flex-col items-center">
                        <div className="w-full text-left mb-4 px-2">
                            <h2 className="text-xl font-bold text-base-content/80 tracking-tight">Live Preview</h2>
                            <p className="text-xs text-base-content/50 font-medium">This is how your profile appears to others.</p>
                        </div>
                        <UserCard user={{ firstName, lastName, photoUrl, about, age, gender }} />
                    </div>

                </div>
            </div>
        </>
    );
};

export default EditProfile;