import React, {useContext} from 'react';
import MyButton from "../components/UI/button/MyButton";
import {Context} from "../index";

const Profile = () => {
    const {store} = useContext(Context)
    const logout = (e) => {
        e.preventDefault()
        store.logout()
    }
    return (
        <div>
            <MyButton
            onClick={(e) => logout(e)}
            >
                Logout
            </MyButton>
        </div>
    );
};

export default Profile;