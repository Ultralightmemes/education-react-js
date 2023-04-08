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
            {themes.map(theme => <div className="w-full flex">
                    <Link
                        className="border w-full"
                        to={`/teacher/theme/${theme.id}/`}>
                        {theme.position}
                    </Link>
                    {/*<button className="w-1/6 block">f</button>*/}
                    {/*<button className="w-1/6 block">f</button>*/}
                </div>
            )}
        </div>
    );
};

export default CourseTheme;