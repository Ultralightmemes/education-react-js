import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CourseService from "../services/CourseService";
import CategoriesSidebar from "../components/CategoriesSidebar";
import CourseCard from "../components/CourseCard";

const CourseListPage = () => {
    const [courses, setCourses] = useState([])

    const [fetchCourses, isCoursesLoading, coursesError] = useFetching(async () => {
        const response = await CourseService.getAll();
        setCourses(response.data)
    })

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div className="flex mx-auto max-w-screen-xl pt-5 ml-10">
            <CategoriesSidebar/>
            <div className="container ml-5">
                <div className="max-w-screen-2xl gap-x-20 grid grid-cols-4">
                    {courses?.map(course => <CourseCard course={course} key={course.id}/>)}
                </div>
            </div>
        </div>
    );
};

export default CourseListPage;