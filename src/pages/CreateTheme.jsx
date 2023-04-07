import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import ThemeService from "../services/ThemeService";

const CreateTheme = () => {
    const {id} = useParams()
    const [theme, setTheme] = useState({
        title: '',
        description: '',
        position: 1,
        is_published: false,
        num_lessons: null
    })

    const createTheme = (e) => {
        e.preventDefault()
        const response = ThemeService.createTheme(id, theme)
    }

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div className="flex justify-center items-center">
            <form className="w-2/3 text-center">
                <h1 className="mx-auto text-4xl mb-7">Создание курса</h1>
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название темы
                            </label>
                            <input
                                className={input_style} type="text"
                                onChange={e => setTheme({...theme, title: e.target.value})}
                            />
                        </div>
                        <div className="mt-6">
                            <label className="inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <span className="mr-2">Опубликовать</span>
                                <input
                                    className={input_style}
                                    type="checkbox"
                                    onChange={e => setTheme({...theme, is_published: e.target.checked})}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Описание
                    </label>
                    <textarea
                        className={input_style}
                        onChange={e => setTheme({...theme, description: e.target.value})}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <button
                            className="mt-7 bg-blue-500 hover:bg-blue-700 text-2xl text-white font-bold py-2 px-4
                            rounded"
                            onClick={e => createTheme(e)}
                            >
                            Создать
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTheme;