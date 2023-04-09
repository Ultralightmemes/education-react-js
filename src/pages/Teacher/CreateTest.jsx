import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import TaskService from "../../services/TaskService";
import LessonTask from "../../components/LessonTask";

const CreateTest = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [test, setTest] = useState({
        title: '',
        text: '',
        options: [
            {
                id: 1,
                text: '',
                is_true: false,
            },
            {
                id: 2,
                text: '',
                is_true: false,
            }
        ],
    })
    const [optionsCounter, setOptionsCounter] = useState(3)

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    const createTest = (e) => {
        e.preventDefault()
        TaskService.createTest(id, test).then(response => {
            navigate(`/teacher/test/${id}`)
        })
        console.log(test)
    }

    function handleOptionChange(id, property, value) {
        const updatedOptions = test.options.map(option => {
            if (option.id === id) {
                return {...option, [property]: value};
            }
            return option;
        });

        setTest({...test, options: updatedOptions});
        // console.log(test)
    }

    const handleAddOptionClick = (e) => {
        e.preventDefault()
        const newOption = {
            id: optionsCounter,
            text: '',
            is_true: false,
        };
        setTest({...test, options: [...test.options, newOption]})
        setOptionsCounter(optionsCounter + 1)
    }

    return (
        <div className="flex justify-center items-center">
            <form className="w-2/3 text-center">
                <h1 className="mx-auto text-4xl mb-7">Создание теста</h1>
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название
                            </label>
                            <input
                                className={input_style} type="text"
                                onChange={e => setTest({...test, title: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Описание
                    </label>
                    <textarea
                        className={input_style}
                        onChange={e => setTest({...test, text: e.target.value})}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border
                            border-gray-400 rounded shadow text-xl mt-4 w-5/12"
                            onClick={e => createTest(e)}
                        >
                            Сохранить
                        </button>
                    </div>
                    <div className="flex w-1/3 mt-4 flex-col">
                        <div className="w-11/12 mx-auto border-2 border-gray-500 rounded-xl">
                            <h2 className="text-2xl mx-auto block">
                                Варианты ответа
                            </h2>
                            <div className="w-full">
                                <div className="w-full flex flex-col">
                                    {test.options.map(option =>
                                        <div className="w-full flex" key={option.id}>
                                            <div className="border w-full text-l py-1 hover:bg-amber-100 flex">
                                                <input
                                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg py-2 w-5/6"
                                                    type="text"
                                                    id={option.id}
                                                    onChange={e => handleOptionChange(option.id, 'text', e.target.value)}
                                                />
                                                <input
                                                    className="ml-4" type="checkbox"
                                                    id={option.id}
                                                    onChange={e => handleOptionChange(option.id, 'is_true', e.target.checked)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        className="hover:bg-green-100 rounded-b-xl"
                                        onClick={e => handleAddOptionClick(e)}>
                                        Добавить ответ
                                    </button>
                                </div>
                                {/*<LessonTask id={id}/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTest;