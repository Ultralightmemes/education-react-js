import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const SideTeacherNavigation = observer(() => {
    const {store} = useContext(Context)
    return (
        <aside className="w-1/6 mr-2" aria-label="Sidebar">
            <div className="overflow-y-auto px-3 bg-gray-100 rounded -mt-4 py-4">
                <ul className="space-y-2">
                    <li className="hover:bg-gray-200 py-2 rounded-xl">
                        <Link to={`/teacher/courses`}>
                            <div>
                                <span className="ml-3">Курсы</span>
                            </div>
                        </Link>
                        <hr className="bg-gray-500 h-[1px] mx-2"/>
                    </li>
                    {store.course_id &&
                        <li className="hover:bg-gray-200 py-2 rounded-xl">
                            <Link to={`/teacher/course/${store.course_id}`}>
                                <div>
                                    <span className="ml-3">Курс</span>
                                </div>
                            </Link>
                            <hr className="bg-gray-500 h-[1px] mx-2"/>
                        </li>
                    }
                    {store.theme_id &&
                        <li className="hover:bg-gray-200 py-2 rounded-xl">
                            <Link to={`/teacher/theme/${store.theme_id}`}>
                                <div>
                                    <span className="ml-3">Тема</span>
                                </div>
                            </Link>
                            <hr className="bg-gray-500 h-[1px] mx-2"/>
                        </li>
                    }
                    {store.lesson_id &&
                        <li className="hover:bg-gray-200 py-2 rounded-xl">
                            <Link to={`/teacher/lesson/${store.lesson_id}`}>
                                <div>
                                    <span className="ml-3">Урок</span>
                                </div>
                            </Link>
                            <hr className="bg-gray-100 h-[1px] mx-2"/>
                        </li>
                    }
                </ul>
            </div>
        </aside>
    );
});

export default SideTeacherNavigation;