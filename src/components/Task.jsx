import React from 'react';

const Task = ({task}) => {
    if (task.classname === 'ExerciseTask') {
        return (
            <div className="ml-10 border border-black mt-4 pl-2">
                <label>{task.text}:</label>
                <input className={"rounded-l border border-black mt-1 ml-2 mb-1 block " + task.classname}
                       id={task.id.toString()} type="text"/>
            </div>
        )
    } else {
        let type = 'radio'
        if (!task.radio)
            type = 'checkbox'
        return (
            <div className="ml-10 border border-black mt-4 pl-2">
                <label>{task.text}:</label>
                <fieldset id={task.id.toString()} className={task.classname}>
                    {task.options.map(option =>
                        <span className="block ml-1" key={option.id}>
                            <input name={task.id.toString()}
                                   id={option.id.toString()}
                                   type={type}
                                   className="ml-2"/>
                            <label>{option.text}</label>
                        </span>)}
                </fieldset>
            </div>
        )
    }
};

export default Task;