import React, {useEffect, useState} from 'react';
import Task from "./Task";
import {useFetching} from "../hooks/useFetching";
import TaskService from "../services/TaskService";
import LessonService from "../services/LessonService";

const Tasks = ({id}) => {
    const [tests, setTests] = useState([])
    const [exercises, setExercises] = useState([])
    console.log(id)

    const [fetchTests, isTestsLoading, testsError] = useFetching(async () => {
        const response = await TaskService.getTests(id)
        setTests(response.data)
    })

    const [fetchExercises, isExercisesLoading, exercisesError] = useFetching(async () => {
        const response = await TaskService.getExercises(id)
        setExercises(response.data)
    })

    useEffect(() => {
        fetchTests()
        fetchExercises()
    }, [id])

    const formSubmitHandler = (e) => {
        e.preventDefault()
        let exercises_answers = []
        let raw_exercises = document.getElementsByClassName('ExerciseTask')
        const emptyExercise = () => ({
            id: '',
            answer: '',
        });
        for (let i = 0; i < raw_exercises.length; i++) {
            let exercise = emptyExercise()
            exercise.id = raw_exercises[i].id
            exercise.answer = (raw_exercises[i]).value
            exercises_answers.push(exercise)
        }
        let tests_answers = []
        let raw_tests = document.getElementsByClassName('TestTask')
        const emptyTests = () => ({
            id: '',
            answers: [],
        });
        for (let i = 0; i < raw_tests.length; i++) {
            let test = emptyTests()
            test.id = raw_tests[i].id
            let options = raw_tests[i].getElementsByTagName("input")
            for (let k = 0; k < options.length; k++) {
                if ((options[k]).checked) {
                    test.answers.push(options[k].id)
                }
            }
            tests_answers.push(test)
        }
        let response = LessonService.sendAnswer(id,
            {
                lesson: id,
                exercises: exercises_answers,
                tests: tests_answers
            })
    }
    return (
        <form
            onSubmit={formSubmitHandler}
            className="-ml-2"
        >
            {exercises.concat(tests).map(task => <Task task={task} key={task.id}/>)}
            <div className="right-1/4 mr-7 absolute">
                <button
                    className="mt-2 p-2 text-xl border-2 border-white bg-blue-600 rounded-lg"
                    type="submit">Submit
                </button>
            </div>
        </form>
    );
};

export default Tasks;