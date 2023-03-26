import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CourseService from "../services/CourseService";
import StudentCourseCard from "../components/StudentCourseCard";

const UserCourses = () => {
    const [courses, setCourses] = useState([])

    const [fetchCourses, isCoursesLoading, coursesError] = useFetching(async () => {
        const response = await CourseService.getMy();
        setCourses(response.data)
        console.log(response.data)
    })

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div className="flex pt-5 ml-6 justify-center items-center">
            <div className="w-2/3 gap-x-20 grid grid-cols-4">
                {courses?.map(course => <StudentCourseCard course={course} key={course.id}/>)}
            </div>
        </div>
    )
};

export default UserCourses;