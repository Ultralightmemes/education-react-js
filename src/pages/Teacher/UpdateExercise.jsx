import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import TaskService from "../../services/TaskService";

const UpdateExercise = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [exercise, setExercise] = useState({
        title: '',
        text: '',
        className: 'ExerciseTask',
        answer: ''
    })

    const [fetchExercise, isExerciseLoading, ExerciseError] = useFetching(async () => {
        const response = await TaskService.getTeacherExercise(id)
        setExercise(response.data)
    })

    useEffect(() => {
        fetchExercise()
    }, [])

    const updateExercise = (e) => {
        e.preventDefault()
        TaskService.updateExercise(exercise)
    }

    const deleteExercise = (e) => {
        e.preventDefault()
        TaskService.deleteExercise(id).then(response => {
            navigate(`/teacher/lesson/${exercise.lesson}`)
        })

    }

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div className="flex justify-center items-center">
            <form className="w-2/3 text-center">
                <h1 className="mx-auto text-4xl mb-7">Задание: {exercise.title}</h1>
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название
                            </label>
                            <input
                                defaultValue={exercise.title}
                                className={input_style} type="text"
                                onChange={e => setExercise({...exercise, title: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ответ
                        </label>
                        <input
                            defaultValue={exercise.answer}
                            className={input_style} type="text"
                            onChange={e => setExercise({...exercise, answer: e.target.value})}
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Описание
                    </label>
                    <textarea
                        defaultValue={exercise.text}
                        className={input_style}
                        onChange={e => setExercise({...exercise, text: e.target.value})}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <div className="flex flex-col w-5/12 mx-auto">
                            <button
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border
                            border-gray-400 rounded shadow text-xl mt-4"
                                onClick={e => updateExercise(e)}
                            >
                                Изменить
                            </button>
                            <button
                                className="bg-white hover:bg-red-400 text-gray-800 font-semibold py-2 px-2 border
                            border-red-400 rounded shadow text-xl mt-4"
                                onClick={e => deleteExercise(e)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateExercise;