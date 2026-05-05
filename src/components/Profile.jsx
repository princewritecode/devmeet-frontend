import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
const Profile = () =>
{
    const user = useSelector((store) => store.userStore);

    {
        return user && (
            <EditProfile user={user}></EditProfile>
        );
    };
};

export default Profile;


//**
// should show user profile
//should be able to edit user profile

//  */