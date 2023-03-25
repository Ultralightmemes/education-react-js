import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {Context} from "../index";

const Registration = () => {
    const [user, setUser] = useState({email: '', password: '', firstName: '', lastName: ''})
    const {store} = useContext(Context)

    const register = (e) => {
        e.preventDefault()
        store.registration(user)
    }

    return (
        <div style={{width: 800, margin: "auto"}}>
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
                <MyButton onClick={(e) => register(e)}>Регистрация</MyButton>
            </form>
        </div>
    );
};

export default Registration;