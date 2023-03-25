import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)

    const login = (e) => {
        e.preventDefault()
        store.login(email, password)
    }

    return (
        <form>
            <MyInput
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="email"
            />
            <MyInput
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="password"
            />
            <MyButton onClick={login}>Sign in</MyButton>
        </form>
    );
};

export default observer(LoginForm);