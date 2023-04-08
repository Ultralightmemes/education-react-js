import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import {useNavigate, useParams} from "react-router-dom";
import ThemeService from "../../services/ThemeService";
import ThemeLesson from "../../components/ThemeLesson";

const UpdateTheme = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [theme, setTheme] = useState({})

    const [fetchTheme, isThemeLoading, ThemeError] = useFetching(async () => {
        const response = await ThemeService.getTeacherTheme(id)
        setTheme(response.data)
    })

    useEffect(() => {
        fetchTheme()
    }, [])

    const updateTheme = (e) => {
        e.preventDefault()
        const response = ThemeService.updateTheme(theme)
    }

    const deleteTheme = async (e) => {
        e.preventDefault()
        await ThemeService.deleteTheme(id)
        navigate(`/teacher/course/${theme.course_id}`)
    }

    console.log(theme)

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div className="flex justify-center items-center">
            <form className="w-2/3 text-center">
                <h1 className="mx-auto text-4xl mb-7">Тема: {theme.title}</h1>
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название темы
                            </label>
                            <input
                                className={input_style} type="text"
                                defaultValue={theme.title}
                                onChange={e => setTheme({...theme, title: e.target.value})}
                            />
                        </div>
                        <div className="mt-6">
                            <label className="inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <span className="mr-2">Опубликовать</span>
                                <input
                                    className={input_style}
                                    defaultChecked={theme.is_published}
                                    type="checkbox"
                                    onInput={e => setTheme({...theme, is_published: !theme.is_published})}
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
                        defaultValue={theme.description}
                        className={input_style}
                        onChange={e => setTheme({...theme, description: e.target.value})}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <div className="flex flex-col w-5/12 mx-auto">
                            <button
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border
                            border-gray-400 rounded shadow text-xl mt-4"
                                onClick={e => updateTheme(e)}
                            >
                                Изменить
                            </button>
                            <button
                                className="bg-white hover:bg-red-400 text-gray-800 font-semibold py-2 px-2 border
                            border-red-400 rounded shadow text-xl mt-4"
                                onClick={e => deleteTheme(e)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                    <div className="flex w-1/3 mt-4 flex-col">
                        <div className="w-11/12 mx-auto border-2 border-gray-500 rounded-xl pb-2">
                            <h2 className="text-2xl mx-auto block">
                                Уроки
                            </h2>
                            <div className="w-full">
                                <ThemeLesson id={id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateTheme;