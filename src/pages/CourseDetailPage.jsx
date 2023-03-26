import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CourseService from "../services/CourseService";
import {useParams} from "react-router-dom";
import {API_URL} from "../http";
import ThemeTab from "../components/ThemeTab";

const CourseDetailPage = () => {
    const {id} = useParams()
    const [course, setCourse] = useState({
        id: null,
        themes: [{
            id: null,
            title: '',
            position: null,
            description: '',
        }],
        categories: [{
            id: null,
            name: '',
        }],
        author: null,
        rating: null,
        name: '',
        publish_date: '',
        update_date: '',
        is_published: true,
        text: '',
        image: '',
    })

    const [fetchCourse, isCourseLoading, courseError] = useFetching(async () => {
        const response = await CourseService.getById(id)
        setCourse(response.data)
        console.log(response)
    })

    useEffect(() => {
        fetchCourse()
    }, [])

    console.log(course.image)

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-1 justify-center items-center bg-cyan-400 w-full h-full">
                <div className="flex-1 w-80 w-full ml-44">
                    <h1 className="text-3xl">{course.name}</h1>
                    <div className="mt-3 max-w-fit">
                        {course.categories.map(category => <span
                            key={category.id}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold
                                text-gray-700 mr-2 mb-2"
                        >
                                {category.name}</span>)}

                    </div>
                    <h2 className="text-lg w-full text-justify">{course.text}</h2>
                    {course.author != null &&
                        <h3 className="mt-2">
                            Автор:
                            <i className="font-semibold"> {course.author.first_name} {course.author.last_name}</i>
                        </h3>
                    }
                    <h3>Последнее обновление: {course.update_date}</h3>
                    <button
                        onClick={() => CourseService.followCourse(id)}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border
                        border-gray-400 rounded shadow mt-2"
                    >
                        Подписаться
                    </button>
                </div>
                <div className="flex-1 w-20 w-full h-full flex">
                    {
                        course.image == '/media/course/Ruby.png'
                            ?
                            <img src="/No_image_available.svg.png"
                                 className="w-1/2 h-1/2 mx-auto ml-20"/>
                            :
                            <img src={API_URL.substring(0, API_URL.length - 1) + course.image}
                                 className="w-1/2 h-1/2 mx-auto ml-20"/>
                    }
                </div>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center bg-gray-200 w-full">
                {course.themes.map(theme => <ThemeTab theme={theme} key={theme.id}/>)}
            </div>
        </div>
    );
};

export default CourseDetailPage;