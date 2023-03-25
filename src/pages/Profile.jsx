import React, {useContext, useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import {Context} from "../index";
import {useFetching} from "../hooks/useFetching";
import UserService from "../services/UserService";

const Profile = () => {
    const [user, setUser] = useState(
        {
            email: '',
            first_name: '',
            last_name: '',
            patronymic: '',
            image: null,
            is_staff: null,
            is_teacher: null,
        })
    const [image, setImage] = useState(null)

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const response = await UserService.getUser()
        setUser(response.data)
        console.log(response)
    })

    useEffect(() => {
        fetchUser()
    }, [])

    const {store} = useContext(Context)

    const logout = (e) => {
        e.preventDefault()
        store.logout()
    }

    const update = async (e) => {
        e.preventDefault()
        const response = await UserService.updateUser(user)
    }

    const updateImage = async (e) => {
        window.location.reload();
        const response = await UserService.updateImage(image)
    }

    const input_style = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm" +
        " placeholder-slate-400focus:outline-none focus:border-sky-500 focus:ring-1 " +
        "focus:ring-sky-500invalid:border-pink-500 invalid:text-pink-600focus:invalid:border-pink-500 " +
        "focus:invalid:ring-pink-500"
    return (
        <div className="flex justify-center items-center">
            <div className="w-1/5">
                {
                    user.image
                        ?
                        <img src={user.image} alt="Profile"/>
                        :
                        <img src="/user.png" alt="Profile"/>
                }

                <form>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        Upload file
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                    bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400"
                        type="file"
                        onChange={(event) => setImage(event.target.files[0])}
                    />
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Email</span>
                        <input type="text"
                               onChange={e => setUser({...user, email: e.target.value})}
                               defaultValue={user.email}
                               className={input_style}
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">First Name</span>
                        <input type="text"
                               onChange={e => setUser({...user, first_name: e.target.value})}
                               defaultValue={user.first_name}
                               className={input_style}
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Last Name</span>
                        <input type="text"
                               onChange={e => setUser({...user, last_name: e.target.value})}
                               defaultValue={user.last_name}
                               className={input_style}
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Patronymic</span>
                        <input type="text"
                               onChange={e => setUser({...user, patronymic: e.target.value})}
                               defaultValue={user.patronymic}
                               className={input_style}
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700 text-center mt-2">Staff</span>
                        <input type="checkbox"
                               defaultChecked={user.is_staff}
                               className={input_style}
                               disabled
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700 text-center mt-2">Teacher</span>
                        <input type="checkbox"
                               defaultChecked={user.is_teacher}
                               className={input_style}
                               disabled
                        />
                    </label>
                </form>
                <div className="flex justify-between">
                    <MyButton
                        onClick={(e) => updateImage(e)}
                    >
                        Update image
                    </MyButton>

                    <MyButton
                        onClick={(e) => update(e)}
                    >
                        Update info
                    </MyButton>

                    <MyButton
                        onClick={(e) => logout(e)}
                    >
                        Logout
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default Profile;