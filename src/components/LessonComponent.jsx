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
        className += ' hover:bg-gray-100'
    }
    return (
        <li>
            <div
                onClick={() => store.setLesson(lesson.index)}
                className={className}
            >
                <span className="ml-5">{lesson.title}</span>
                {/*{lesson.is_auto_done ? (*/}
                {/*    <span className="ml-auto mr-0">*/}
                {/*        {lesson.is_done ?*/}
                {/*            <input type="checkbox" className="object-right" disabled checked={is_done}/> :*/}
                {/*            <input type="checkbox" className="object-right" checked={is_done}*/}
                {/*                   onChange={formSubmitHandler} onClick={() => setIsDone(true)}/>}*/}
                {/*    </span>) : null}*/}
            </div>
            <hr className="ml-3 border-gray-400 w-11/12"/>
        </li>
    );
};

export default LessonComponent;