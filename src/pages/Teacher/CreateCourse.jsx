import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import CategoryService from "../../services/CategoryService";
import CourseService from "../../services/CourseService";
import {useNavigate} from "react-router-dom";
import SideTeacherNavigation from "../../components/SideTeacherNavigation";
import {Context} from "../../index";

const CreateCourse = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [isPublished, setIsPublished] = useState(false)
    const [chosenCategories, setChosenCategories] = useState([])
    const {store} = useContext(Context)

    const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching(async () => {
        const response = await CategoryService.getCategories()
        setCategories(response.data)
    })

    const moveToChosen = (e, category) => {
        e.preventDefault()
        setChosenCategories([...chosenCategories, category])
        setCategories(categories.filter(item => item !== category))
    }

    const moveToInitial = (e, category) => {
        e.preventDefault()
        setCategories([...categories, category])
        setChosenCategories(chosenCategories.filter(item => item !== category))
    }

    const createCourse = async (e) => {
        e.preventDefault()
        const response = await CourseService.createCourse(name, text, isPublished, chosenCategories).then(response => {
            if (response.status === 201) {
                const patchResponse = CourseService.updateCourseImage(response.data.id, image)
                console.log(response.data)
                navigate(`/teacher/course/${response.data.id}`)
            }
        })
    }

    useEffect(() => {
        store.delIds()
        fetchCategories()
    }, [])

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div className="flex">
            <SideTeacherNavigation/>
            <form className="w-2/3 text-center">
                <h1 className="mx-auto text-4xl mb-7">Создание курса</h1>
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название курса
                            </label>
                            <input
                                className={input_style} type="text"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-6">
                            <label className="inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <span className="mr-2">Опубликовать</span>
                                <input
                                    className={input_style}
                                    type="checkbox"
                                    onChange={e => setIsPublished(e.target.checked)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full my-2">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-full h-32 border-2
                               border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50
                               dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600
                               dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0
                                          0l-3 3m3-3v12"></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                    className="font-semibold">Нажмите чтобы загрузить изрбражение</span></p>
                            </div>
                            <input id="dropzone-file"
                                   type="file"
                                   className="hidden"
                                   onChange={(event) => setImage(event.target.files[0])}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Описание
                    </label>
                    <textarea
                        className={input_style}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <button
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border
                            border-gray-400 rounded shadow text-xl mt-4 w-5/12"
                            onClick={e => createCourse(e)}>
                            Сохранить
                        </button>
                    </div>
                    <div className="flex w-1/3 mt-4 flex-col border-2 border-gray-500 rounded-xl pb-2">
                        <h2 className="text-2xl mx-auto block w-full border-b">
                            Категории
                        </h2>
                        <div className="flex w-full">
                            <div className="w-1/2 flex flex-col border-r-2">
                                <h3 className="border-b mb-1">Доступные</h3>
                                {categories.map(category => <button
                                    className="rounded-r-2xl shadow-inner shadow-red-200 shadow-sm"
                                    onClick={e => moveToChosen(e, category)}
                                >{category.name}</button>)}
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <h3 className="border-b mb-1">Выбранные</h3>
                                {chosenCategories.map(category => <button
                                    className="rounded-l-2xl shadow-inner shadow-green-200 shadow-sm"
                                    onClick={e => moveToInitial(e, category)}
                                >{category.name}</button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;