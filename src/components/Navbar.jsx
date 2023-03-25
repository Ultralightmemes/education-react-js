import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import MyModal from "./UI/MyModal/MyModal";
import LoginForm from "./LoginForm";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Navbar = () => {

    const [modal, setModal] = useState(false);
    const {store} = useContext(Context)

    return (
        <nav className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white ">
            <div>
                <span className="font-bold mr-2">
                    <Link to="/">Education</Link>
                </span>
                <span>
                    <Link to="/courses">Courses</Link>
                </span>
            </div>
            <div>
                {store.isAuth
                    ?
                    <span className="mr-2">
                        <Link to="/student/courses" className="mr-1">My Courses</Link>
                        <Link to="/profile">
                            <button>Profile</button>
                        </Link>
                    </span>
                    :
                    <div>

                        <button onClick={() => setModal(true)}>Login</button>
                        <MyModal visible={modal} setVisible={setModal}>
                            <LoginForm/>
                        </MyModal>
                    </div>
                }
            </div>
        </nav>
    );
};

export default observer(Navbar);