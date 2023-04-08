import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import LessonService from "../services/LessonService";
import {Link} from "react-router-dom";

const ThemeLesson = ({id}) => {
    const [lessons, setLessons] = useState([])

    const [fetchLessons, isLessonsLoading, LessonsError] = useFetching(async () => {
        const response = await LessonService.getThemeLessons(id)
        setLessons(response.data)
    })

    useEffect(() => {
        fetchLessons()
    }, [])

    return (
        <div className="w-full flex flex-col">
            <Link
                className="border w-full text-l py-1 hover:bg-green-100"
                to={`/teacher/lesson/create/${id}`}>
                Добавить
            </Link>
            {lessons.map(lesson => <div className="w-full flex">
                <Link
                    className="border w-full text-l py-1 hover:bg-gray-100"
                    to={`/teacher/lesson/${lesson.id}`}>
                    {lesson.title}
                </Link>
            </div>)}
        </div>
    );
};

export default ThemeLesson;