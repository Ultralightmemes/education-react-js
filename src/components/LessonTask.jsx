import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import TaskService from "../services/TaskService";
import {Link} from "react-router-dom";

const LessonTask = ({id}) => {
    const [exercises, setExercises] = useState([])
    const [tests, setTests] = useState([])

    const [fetchExercises, isExercisesLoading, ExercisesError] = useFetching(async () => {
        const response = await TaskService.getTeacherExercises(id)
        setExercises(response.data)
        console.log(response.data)
    })

    const [fetchTasks, isTasksLoading, TasksError] = useFetching(async () => {
        const response = await TaskService.getTeacherTests(id)
        setTests(response.data)
    })

    useEffect(() => {
        fetchExercises()
        fetchTasks()
    }, [])

    useEffect(() => {
        fetchTasks()
    }, [])
    return (
        <div className="w-full flex flex-col">
            <Link
                className="border w-full text-l py-1 hover:bg-green-100"
                to={`/teacher/exercise/create/${id}`}>
                Добавить зададние
            </Link>
            <Link
                className="border w-full text-l py-1 hover:bg-yellow-100"
                to={`/teacher/test/create/${id}`}>
                Добавить тест
            </Link>
            {exercises.map(exercise => <div className="w-full flex" key={exercise.id}>
                <Link
                    className="border w-full text-l py-1 hover:bg-gray-100"
                    to={`/teacher/exercise/${exercise.id}`}>
                    {exercise.title}
                </Link>
            </div>)}
            {tests.map(test => <div className="w-full flex" key={test.id}>
                <Link
                    className="border w-full text-l py-1 hover:bg-amber-100"
                    to={`/teacher/test/${test.id}`}>
                    {test.title}
                </Link>
            </div>)}
        </div>
    );
};

export default LessonTask;