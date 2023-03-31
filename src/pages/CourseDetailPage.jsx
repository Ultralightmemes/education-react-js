import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CourseService from "../services/CourseService";
import {useParams} from "react-router-dom";
import {API_URL} from "../http";
import ThemeTab from "../components/ThemeTab";
import MyButton from "../components/UI/button/MyButton";

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

    const handleImageError = (event) => {
        event.target.src = '/No_image_available.svg.png';
    };

    const followCourse = async (event) => {
        const response = await CourseService.followCourse(id)
        console.log(response)
    }

    return (
        <div className="w-full">
            <div className="w-full text-center">
                <h1 className="text-3xl">{course.name}</h1>
            </div>
            <div className="container mx-auto gap-x-8 grid grid-cols-3 mt-4 w-11/12">
                <div className="border-2 rounded-xl shadow-lg">
                    <img src={API_URL.substring(0, API_URL.length - 1) + course.image}
                         className="mx-auto rounded-t-xl"
                         onError={handleImageError}
                    />
                    <div className="mt-2">
                        {course.author != null &&
                            <h3 className="m-2">
                                Автор:
                                <i className="font-semibold"> {course.author.first_name} {course.author.last_name}</i>
                            </h3>
                        }
                        <h3 className="m-2">Последнее обновление: {course.update_date}</h3>
                    </div>
                </div>
                <div className="border-2 flex text-center items-center justify-center rounded-xl shadow-lg">
                    <h2 className="text-lg w-full text-justify mx-2">
                        {course.text}
                    </h2>
                </div>
                <div className="border-2 rounded-xl shadow-lg">
                    {course.themes.map(theme =>
                        <ThemeTab theme={theme} key={theme.id}/>
                    )}
                </div>
            </div>
            <div className="max-w flex flex-col items-center m-6">
                <button
                    onClick={followCourse}
                    className="w-5/12 hover:shadow-purple-100 hover:shadow-xl rounded-2xl h-24"
                >
                    <h2 className="text-4xl">
                        Подписаться
                    </h2>
                </button>
            </div>
        </div>
    );
};

export default CourseDetailPage;