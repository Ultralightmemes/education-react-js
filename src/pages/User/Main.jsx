import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import CourseService from "../../services/CourseService";
import CourseCard from "../../components/CourseCard";
import BigCard from "../../components/BigCard";

const Main = () => {
    const [bestCourse, setBestCourse] = useState({})
    const [courses, setCourses] = useState([])

    const [fetchBestCourse, isBestCourseLoading, bestCourseError] = useFetching(async () => {
        const response = await CourseService.getBest();
        setBestCourse(response.data)
        console.log(response.data)
    })

    const [fetchCourses, isCoursesLoading, coursesError] = useFetching(async () => {
        const response = await CourseService.getNewest();
        setCourses(response.data)
    })

    useEffect(() => {
        fetchCourses()
        fetchBestCourse()
    }, [])

    return (
        <div className="flex flex-col items-center text-center justify-center">
            <h1 className="text-4xl mb-5">Новые курсы</h1>
            <div className="w-full text-center bg-blue-400 pt-2">
                <div className="grid grid-cols-3 gap-x-4 w-5/6 mx-auto">
                    {courses?.map(course => <CourseCard course={course} key={course.id} absoluteURL={false}/>)}
                </div>
            </div>
            <h1 className="text-4xl mb-5">Лучший курс</h1>
            <div className="w-full items-center text-center justify-center bg-blue-400 pt-2">
                <div className="w-5/12 mx-auto">
                    <BigCard course={bestCourse}/>
                </div>
            </div>
        </div>
    );
};

export default Main;