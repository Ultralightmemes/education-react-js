import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";

const LessonComponent = ({lesson}) => {
    const {store} = useContext(Context)
    return (
        <li>
            <button>
                <div onClick={() => store.setLesson(lesson.index)}
                    className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white'
                >
                    <span className="ml-3">{lesson.title}</span>
                    {/*{lesson.is_auto_done ? (*/}
                    {/*    <span className="ml-auto mr-0">*/}
                    {/*        {lesson.is_done ?*/}
                    {/*            <input type="checkbox" className="object-right" disabled checked={is_done}/> :*/}
                    {/*            <input type="checkbox" className="object-right" checked={is_done}*/}
                    {/*                   onChange={formSubmitHandler} onClick={() => setIsDone(true)}/>}*/}
                    {/*    </span>) : null}*/}
                </div>
            </button>
        </li>
    );
};

export default LessonComponent;