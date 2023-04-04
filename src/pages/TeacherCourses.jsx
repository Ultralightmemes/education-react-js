import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CourseService from "../services/CourseService";
import CourseTeacherCard from "../components/CourseTeacherCard";

const TeacherCourses = () => {
    const [courses, setCourses] = useState([])

    const [fetchCourses, isCoursesLoading, coursesError] = useFetching(async () => {
        const response = await CourseService.getTeacherCourses();
        setCourses(response.data)
    })

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div className="w-full flex justify-center text-center items-center mb-2">
            <div className="w-4/6">
                <div className="w-full shadow-lg flex flex-row h-20 justify-center items-center -mt-5">
                    <h1 className="text-xl">Добавить курс</h1>
                </div>
                {courses.map(course => <CourseTeacherCard course={course}/>)}
            </div>
        </div>
    );
};

export default TeacherCourses;