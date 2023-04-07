import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import ThemeService from "../services/ThemeService";
import {Link} from "react-router-dom";

const CourseTheme = ({id}) => {
    const [themes, setThemes] = useState([])

    const [fetchThemes, isThemeLoading, themeError] = useFetching(async () => {
        const response = await ThemeService.getCourseThemesForTeacher(id)
        setThemes(response.data)
        console.log(response.data)
    })

    useEffect(() => {
        fetchThemes()
    }, [])

    return (
        <div className="w-full flex flex-col">
            <Link
                className="border w-full"
                to={`/teacher/theme/create/${id}`}>
                Добавить
            </Link>
            {themes.map(theme => <Link
                className="border w-full"
                to={`/teacher/theme/${theme.id}/`}>
                {theme.title}
            </Link>)}
        </div>
    );
};

export default CourseTheme;