import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import LessonService from "../../services/LessonService";
import LessonTask from "../../components/LessonTask";

const UpdateLesson = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [lesson, setLesson] = useState({
        title: '',
        video: null,
        position: 1,
        text: '',
    })

    const [fetchLesson, isLessonLoading, LessonError] = useFetching(async () => {
        const response = await LessonService.getTeacherLesson(id)
        setLesson(response.data)
    })

    useEffect(() => {
        fetchLesson()
    }, [])

    const updateLesson = (e) => {
        e.preventDefault()
        if (typeof lesson.video === "string") {
            lesson.video = null
        }
        LessonService.updateLesson(lesson)
    }

    const deleteLesson = (e) => {
        e.preventDefault()
        LessonService.deleteLesson(id).then(response => {
            navigate(`/teacher/theme/${lesson.theme}`)
        })
    }

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div className="flex justify-center items-center">
            <form className="w-2/3 text-center">
                <h1 className="mx-auto text-4xl mb-7">Урок: {lesson.title}</h1>
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название
                            </label>
                            <input
                                className={input_style} type="text"
                                defaultValue={lesson.title}
                                onChange={e => setLesson({...lesson, title: e.target.value})}
                            />
                        </div>
                        <div className="mt-6">
                            <label className="inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <span className="mr-2">Опубликовать</span>
                                <input
                                    className={input_style}
                                    defaultChecked={lesson.is_published}
                                    type="checkbox"
                                    onInput={e => setLesson({...lesson, is_published: !lesson.is_published})}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full my-2">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-full h-32 border-2
                               border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0
                                          0l-3 3m3-3v12"></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                    className="font-semibold">Нажмите чтобы загрузить видео</span></p>
                            </div>
                            <input id="dropzone-file"
                                   type="file"
                                   className="hidden"
                                   onChange={e => setLesson({...lesson, video: e.target.files[0]})}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Текст
                    </label>
                    <textarea
                        defaultValue={lesson.text}
                        className={input_style}
                        onChange={e => setLesson({...lesson, text: e.target.value})}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <div className="flex flex-col w-5/12 mx-auto">
                            <button
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border
                            border-gray-400 rounded shadow text-xl mt-4"
                                onClick={e => updateLesson(e)}
                            >
                                Изменить
                            </button>
                            <button
                                className="bg-white hover:bg-red-400 text-gray-800 font-semibold py-2 px-2 border
                            border-red-400 rounded shadow text-xl mt-4"
                                onClick={e => deleteLesson(e)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                    <div className="flex w-1/3 mt-4 flex-col">
                        <div className="w-11/12 mx-auto border-2 border-gray-500 rounded-xl pb-2">
                            <h2 className="text-2xl mx-auto block">
                                Задания
                            </h2>
                            <div className="w-full">
                                <LessonTask id={id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateLesson;