import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import TaskService from "../../services/TaskService";

const CreateExercise = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [exercise, setExercise] = useState({
        title: '',
        text: '',
        className: 'ExerciseTask',
        answer: ''
    })

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    const createExercise = (e) => {
        e.preventDefault()
        TaskService.createExercise(id, exercise).then(response => {
            navigate(`/teacher/lesson/${id}`)
        })
    }

    return (
        <div className="flex justify-center items-center">
            <form className="w-2/3 text-center">
                <h1 className="mx-auto text-4xl mb-7">Создание урока</h1>
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название
                            </label>
                            <input
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
                        className={input_style}
                        onChange={e => setExercise({...exercise, text: e.target.value})}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border
                            border-gray-400 rounded shadow text-xl mt-4 w-5/12"
                            onClick={e => createExercise(e)}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateExercise;