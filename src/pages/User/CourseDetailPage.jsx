import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import CourseService from "../../services/CourseService";
import {useParams} from "react-router-dom";
import {API_URL} from "../../http";
import ThemeTab from "../../components/ThemeTab";
import Rating from "../../components/Rating";
import {Context} from "../../index";

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
    const {store} = useContext(Context)

    const [fetchCourse, isCourseLoading, courseError] = useFetching(async () => {
        const response = await CourseService.getById(id)
        setCourse(response.data)
    })

    useEffect(() => {
        fetchCourse()
    }, [])

    const handleImageError = (event) => {
        event.target.src = '/No_image_available.svg.png';
    };

    const followCourse = async (event) => {
        const response = await CourseService.followCourse(id)
    }

    return (
        <div className="w-full">
            <div className="flex w-11/12 mx-auto text-center">
                <div className="w-1/3 flex justify-center items-center">
                    <Rating
                        courseRating={course.rating}
                        isActive={false}
                        courseId={course.id}
                    />
                </div>
                <div className="w-1/3">
                    <h1 className="text-3xl">{course.name}</h1>
                </div>
                <div className="w-1/3">
                    {store.isAuth ?
                        <button
                            onClick={followCourse}
                            className="w-5/12 hover:shadow-blue-500 hover:shadow-sm rounded-sm h-11 border border-black
                            cursor-pointer"
                        >
                            <h2 className="text-2xl">
                                Подписаться
                            </h2>
                        </button>
                        :
                        <button
                            className="w-5/12  rounded-sm h-11 border border-black bg-gray-200 cursor-pointer"
                            disabled
                        >
                            <h2 className="text-2xl">
                                Подписаться
                            </h2>
                        </button>
                    }
                </div>
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
        </div>
    );
};

export default CourseDetailPage;