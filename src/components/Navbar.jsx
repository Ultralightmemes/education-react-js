import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import MyModal from "./UI/MyModal/MyModal";
import LoginForm from "./LoginForm";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Navbar = () => {
    const [modal, setModal] = useState(false);
    const {store} = useContext(Context)
    console.log(store.isAuth)

    return (
        <header className="h-[50px] flex justify-between px-5 bg-gray-500 items-center bg-white w-full shadow-md mb-5">
            <div className="">
                <span className="font-bold mr-2">
                    <Link to="/">Education</Link>
                </span>
                <span>
                    <Link to="/courses">Courses</Link>
                </span>
                <span className="ml-5 text-2xl">{store.title}</span>
            </div>
            <div className="mr-48">
                {store.isAuth
                    ?
                    <span className="mr-2">
                        <Link to="/profile/courses" className="mr-1">My Courses</Link>
                        <Link to="/profile">
                            <button>Profile</button>
                        </Link>
                    </span>
                    :
                    <div>
                        <button onClick={() => setModal(true)} className="mr-2">Sign in</button>
                        <MyModal visible={modal} setVisible={setModal}>
                            <LoginForm/>
                        </MyModal>
                        <Link to="/registration" >Sign up</Link>
                    </div>
                }
            </div>
        </header>
    );
};

export default observer(Navbar);