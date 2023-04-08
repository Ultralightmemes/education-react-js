import React, {useContext, useState} from 'react';
import MyInput from "../../components/UI/input/MyInput";
import MyButton from "../../components/UI/button/MyButton";
import {Context} from "../../index";

const Registration = () => {
    const [user, setUser] = useState({email: '', password: '', firstName: '', lastName: ''})
    const {store} = useContext(Context)

    const register = (e) => {
        e.preventDefault()
        store.registration(user)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold text-teal-500 mt-24">Registration</h1>

            <div className="flex items-center justify-center h-screen mb-48">
                <form>
                    <MyInput
                        placeholder='name'
                        value={user.firstName}
                        onChange={e => setUser({...user, firstName: e.target.value})}
                    />
                    <MyInput
                        placeholder='last name'
                        value={user.lastName}
                        onChange={e => setUser({...user, lastName: e.target.value})}
                    />
                    <MyInput
                        placeholder='email'
                        value={user.email}
                        type='email'
                        onChange={e => setUser({...user, email: e.target.value})}
                    />
                    <MyInput
                        placeholder='password'
                        value={user.password}
                        type='password'
                        onChange={e => setUser({...user, password: e.target.value})}
                    />
                    <MyButton onClick={(e) => register(e)}>Sign up</MyButton>
                </form>
            </div>
        </div>
    );
};

export default Registration;