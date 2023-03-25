import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import CourseService from "../services/CourseService";
import CourseList from "../components/CourseList";

const CourseListPage = () => {
    const [courses, setCourses] = useState([])

    const [fetchCourses, isCoursesLoading, courseError] = useFetching(async () => {
        const response = await CourseService.getAll();
        setCourses([...courses, ...response.data])
        console.log(response)
    })

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div>
            <CourseList courses={courses}></CourseList>
        </div>
    );
};

export default CourseListPage;