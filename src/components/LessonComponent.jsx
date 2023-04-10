import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";

const LessonComponent = ({lesson}) => {
    const {store} = useContext(Context)
    let className = 'flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg' +
        ' cursor-pointer'
    if (store.lesson === lesson.index) {
        className += ' bg-blue-500 hover:bg-blue-600'
    }
    else {
        className += ' hover:bg-gray-200'
    }
    return (
        <li>
            <div
                onClick={() => store.setLesson(lesson.index)}
                className={className}
            >
                <span className="ml-5">{lesson.title}</span>
            </div>
            <hr className="ml-3 border-gray-400 w-11/12"/>
        </li>
    );
};

export default LessonComponent;