import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import ThemeService from "../services/ThemeService";
import ThemeWithLessons from "./ThemeWithLessons";

const SideThemes = ({id}) => {
    const [themes, setThemes] = useState([])

    const [fetchThemes, isThemesLoading, themesErrors] = useFetching(async () => {
        const response = await ThemeService.getThemes(id)
        setThemes(response.data)
    })

    useEffect(() => {
        fetchThemes()
    }, [])

    return (
        <aside className="w-1/4" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-100 rounded">
                <ul className="space-y-2">
                    {themes.map(theme => <ThemeWithLessons theme={theme}
                                                           key={theme.id}/>)}
                </ul>
            </div>
        </aside>
    );
};

export default SideThemes;