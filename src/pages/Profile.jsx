import React, {useContext, useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import {Context} from "../index";
import {useFetching} from "../hooks/useFetching";
import UserService from "../services/UserService";
import {Link} from "react-router-dom";

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

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    return (
        <div className="flex justify-center items-center">
            <div className="w-2/5">
                {
                    user.image
                        ?
                        <img src={user.image} className="w-72 h-72 mx-auto" alt="Profile"/>
                        :
                        <img src="/user.png" className="w-72 h-72 mx-auto" alt="Profile"/>
                }
                <form>
                    <div className="flex items-center justify-center w-full my-2">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                    className="font-semibold">Click to upload avatar</span> or drag and drop</p>
                            </div>
                            <input id="dropzone-file"
                                   type="file"
                                   className="hidden"
                                   onChange={(event) => setImage(event.target.files[0])}
                            />
                        </label>
                    </div>
                    <div className="grid gap-6 mb-4 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input
                                className={input_style} type="text"
                                onChange={e => setUser({...user, email: e.target.value})}
                                defaultValue={user.email}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                First Name
                            </label>
                            <input type="text"
                                   className={input_style}
                                   onChange={e => setUser({...user, first_name: e.target.value})}
                                   defaultValue={user.first_name}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Last Name
                            </label>
                            <input type="text" i
                                   className={input_style}
                                   onChange={e => setUser({...user, last_name: e.target.value})}
                                   defaultValue={user.last_name}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patronymic
                            </label>
                            <input type="text"
                                   className={input_style}
                                   onChange={e => setUser({...user, patronymic: e.target.value})}
                                   defaultValue={user.patronymic}
                            />
                        </div>
                        <div className="text-center">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Superuser
                            </label>
                            <input
                                className={input_style} type="checkbox"
                                defaultChecked={user.is_staff}
                                disabled
                            />
                        </div>
                        <div className="text-center">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher
                            </label>
                            <input
                                className={input_style} type="checkbox"
                                defaultChecked={user.is_teacher}
                                disabled
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-1/5">
                <button
                    className="block w-5/6 mx-auto h-14 mb-2 border border-teal-500"
                    onClick={(e) => update(e)}
                >
                    Update info
                </button>
                <button
                    className="block w-5/6 mx-auto h-14 mb-2 border border-teal-500"
                    onClick={(e) => updateImage(e)}
                >
                    Update image
                </button>
                <Link to='/teacher/courses'>
                    <button
                        className="block w-5/6 mx-auto h-14 border border-teal-500"
                    >
                        Мои курсы
                    </button>
                </Link>
                <button
                    className="block w-5/6 mx-auto h-14 mb-2 border border-teal-500"
                    onClick={(e) => logout(e)}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;