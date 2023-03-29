import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CourseService from "../services/CourseService";
import CategoriesSidebar from "../components/CategoriesSidebar";
import CourseCard from "../components/CourseCard";
import MyInput from "../components/UI/input/MyInput";

const CourseListPage = () => {
    const [courses, setCourses] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const [fetchCourses, isCoursesLoading, coursesError] = useFetching(async () => {
        const response = await CourseService.getAll();
        setCourses(response.data)
    })

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div className="flex mx-auto max-w-screen-xl ml-10">
            <CategoriesSidebar/>
            <div className="container ml-5">
                <MyInput
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Поиск..."
                    style={{width: '104%'}}
                />
                <div className="max-w-screen-2xl gap-x-20 grid grid-cols-3">
                    {courses?.map(course => <CourseCard course={course} key={course.id}/>)}
                </div>
            </div>
        </div>
    );
};

export default CourseListPage;