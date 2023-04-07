import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CategoryService from "../services/CategoryService";
import {useParams} from "react-router-dom";
import CourseService from "../services/CourseService";
import CourseTheme from "../components/CourseTheme";

const UpdateCourse = () => {
    const {id} = useParams()
    const [categories, setCategories] = useState([])
    const [course, setCourse] = useState({
        id: null,
        categories: [{
            id: null,
            name: '',
        }],
        name: '',
        is_published: true,
        text: '',
        image: '',
    })
    const [image, setImage] = useState(null)

    const [fetchCourse, isCourseLoading, courseError] = useFetching(async () => {
        await CourseService.getById(id)
            .then(async response => {
                setCourse(response.data)
                const categoryResponse = await CategoryService.getCategories()
                let categoryIds = []
                for (let i = 0; i < response.data.categories.length; i++) {
                    categoryIds.push(response.data.categories[i].id)
                }
                setCategories(categoryResponse.data.filter(item => !categoryIds.includes(item.id)))
            })
    })

    useEffect(() => {
        fetchCourse()
    }, [])

    const moveToChosen = (e, category) => {
        e.preventDefault()
        setCourse({...course, categories: [...course.categories, category]})
        setCategories(categories.filter(item => item !== category))
    }

    const moveToInitial = (e, category) => {
        e.preventDefault()
        setCategories([...categories, category])
        setCourse({...course, categories: course.categories.filter(item => item !== category)})
    }

    const updateCourse = (e) => {
        e.preventDefault()
        CourseService.updateCourse(course).then(response => {
            if (response.status === 200) {
                const patchResponse = CourseService.updateCourseImage(id, image)
            }
        })

    }

    const input_style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
        "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
        "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div className="flex justify-center items-center">

            <form className="w-2/3 text-center">
                <h1 className="mx-auto text-4xl mb-7">{course.name}</h1>
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                    <div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название курса
                            </label>
                            <input
                                className={input_style} type="text"
                                defaultValue={course.name}
                                onChange={e => setCourse({...course, name: e.target.value})}
                            />
                        </div>
                        <div className="mt-6">
                            <label className="inline-flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <span className="mr-2">Опубликовать</span>
                                <input
                                    className={input_style}
                                    type="checkbox"
                                    defaultChecked={course.is_published}
                                    onChange={e => setCourse({...course, is_published: e.target.checked})}
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
                                    className="font-semibold">Нажмите чтобы загрузить изрбражение</span></p>
                            </div>
                            <input id="dropzone-file"
                                   type="file"
                                   className="hidden"
                                   onChange={(e) => setImage(e.target.files[0])}
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
                        defaultValue={course.text}
                        onChange={e => setCourse({...course, text: e.target.value})}
                    />
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <button
                            className="mt-7 bg-blue-500 hover:bg-blue-700 text-2xl text-white font-bold py-2 px-4
                            rounded"
                            onClick={e => updateCourse(e)}
                        >
                            Изменить
                        </button>
                    </div>
                    <div className="flex w-1/3 mt-4 flex-col">
                        <h2 className="text-2xl mx-auto block">
                            Темы
                        </h2>
                        <div className="w-full">
                            <CourseTheme id={id}/>
                        </div>
                    </div>
                    <div className="flex w-1/3 mt-4 flex-col">
                        <h2 className="text-2xl mx-auto block">
                            Категории
                        </h2>
                        <div className="flex w--full mt-4 border border-black">
                            <div className="w-1/2 flex flex-col">
                                {categories.map(category => <button
                                    key={category.id}
                                    className="rounded-r-2xl border"
                                    onClick={e => moveToChosen(e, category)}
                                >{category.name}</button>)}
                            </div>
                            <div className="w-1/2 flex flex-col">
                                {course.categories.map(category => <button
                                    key={category.id}
                                    className="rounded-l-2xl border"
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

export default UpdateCourse;