import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import TaskService from "../../services/TaskService";

const UpdateTest = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [test, setTest] = useState({})
    const [testOptions, setTestOptions] = useState([])
    const [optionsCounter, setOptionsCounter] = useState(3)

    const [fetchTest, isTestLoading, TestError] = useFetching(async () => {
        const response = await TaskService.getTeacherTest(id)
        setTest(response.data)
    })

    const [fetchOptions, isOptionsLoading, OptionsError] = useFetching(async () => {
        const response = await TaskService.getOptions(id)
        console.log(response.data)
        setTestOptions(response.data)
        setOptionsCounter(response.data[response.data.length - 1].id + 1)
    })

    useEffect(() => {
        fetchTest()
        fetchOptions()
    }, [])

    const updateTest = async (e) => {
        e.preventDefault()
        await TaskService.updateTest(test, testOptions)
    }

    const deleteTest = (e) => {
        e.preventDefault()
        TaskService.deleteTest(id).then(response => {
            navigate(`/teacher/lesson/${test.lesson}`)
        })
    }

    const deleteOption = (e, id) => {
        e.preventDefault()
        setTestOptions(testOptions.filter(item => item.id !== id))
    }

    function handleOptionChange(id, property, value) {
        const updatedOptions = testOptions.map(option => {
            if (option.id === id) {
                return {...option, [property]: value};
            }
            return option;
        });

        setTestOptions(updatedOptions);
    }

    const handleAddOptionClick = (e) => {
        e.preventDefault()
        const newOption = {
            id: optionsCounter,
            new: true,
            text: '',
            is_true: false,
        };
        setTestOptions([...testOptions, newOption])
        setOptionsCounter(optionsCounter + 1)
    }

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

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
                                defaultValue={test.title}
                                className={input_style} type="text"
                                onChange={e => setTest({...test, title: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span className="mr-2">Опубликовать</span>
                            <input
                                className={input_style}
                                defaultChecked={test.is_published}
                                type="checkbox"
                                onInput={e => setTest({...test, is_published: !test.is_published})}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Описание
                    </label>
                    <textarea
                        defaultValue={test.text}
                        className={input_style}
                        onChange={e => setTest({...test, text: e.target.value})}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <div className="flex flex-col w-5/12 mx-auto">
                            <button
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border
                            border-gray-400 rounded shadow text-xl mt-4"
                                onClick={e => updateTest(e)}
                            >
                                Изменить
                            </button>
                            <button
                                className="bg-white hover:bg-red-400 text-gray-800 font-semibold py-2 px-2 border
                            border-red-400 rounded shadow text-xl mt-4"
                                onClick={e => deleteTest(e)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                    <div className="flex w-1/3 mt-4 flex-col">
                        <div className="w-11/12 mx-auto border-2 border-gray-500 rounded-xl">
                            <h2 className="text-2xl mx-auto block">
                                Варианты ответа
                            </h2>
                            <div className="w-full">
                                <div className="w-full flex flex-col">
                                    {testOptions.map(option =>
                                        <div className="w-full flex" key={option.id}>
                                            <div className="border w-full text-l py-1 hover:bg-amber-100 flex">
                                                <input
                                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg py-2 w-5/6"
                                                    type="text"
                                                    defaultValue={option.text}
                                                    id={option.id}
                                                    onChange={e => handleOptionChange(option.id, 'text', e.target.value)}
                                                />
                                                <input
                                                    className="ml-4" type="checkbox"
                                                    id={option.id}
                                                    defaultChecked={option.is_true}
                                                    onChange={e => handleOptionChange(option.id, 'is_true', e.target.checked)}
                                                />
                                                <button
                                                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm ml-2 px-2"
                                                    onClick={e => deleteOption(e, option.id)}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        className="hover:bg-green-100 rounded-b-xl"
                                        onClick={e => handleAddOptionClick(e)}>
                                        Добавить ответ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateTest;