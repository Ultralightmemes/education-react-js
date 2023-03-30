import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import LessonService from "../services/LessonService";
import {useParams} from "react-router-dom";
import SideThemes from "./SideThemes";
import ReactPlayer from "react-player";
import $api, {API_URL} from "../http";
import TaskService from "../services/TaskService";
import Task from "./Task";
import Loader from "./UI/Loader/Loader";
import {Context} from "../index";

const Lesson = () => {
    const {id} = useParams()
    const [lesson, setLesson] = useState(
        {
            count: null,
            next: null,
            previous: null,
            results: [{
                id: null,
                title: '',
                video: null,
                position: null,
                text: '',
                theme: null,
            }
            ]
        }
    )

    const [tests, setTests] = useState([])
    const [exercises, setExercises] = useState([])
    const [previousURL, setPreviousURL] = useState(null)
    const [nextURL, setNextURL] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const {store} = useContext(Context)

    const [fetchLesson, isLessonLoading, lessonError] = useFetching(async () => {
        const response = await LessonService.getLesson(id, currentPage)
        setLesson(response.data)
        setPreviousURL(response.data.previous)
        setNextURL(response.data.next)
        store.setTitle(response.data.results[0].title)
    })

    const [fetchTests, isTestsLoading, testsError] = useFetching(async () => {
        const response = await TaskService.getTests(id)
        setTests(response.data)
    })

    const [fetchExercises, isExercisesLoading, exercisesError] = useFetching(async () => {
        const response = await TaskService.getExercises(id)
        setExercises(response.data)
    })

    useEffect(() => {
        fetchLesson()
        fetchTests()
        fetchExercises()

        console.log(1)

        console.log(store.title)

        return () => {
            store.delTitle()
        };
    }, [currentPage])


    function handlePrevClick() {
        if (previousURL) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNextClick() {
        if (nextURL) {
            setCurrentPage(currentPage + 1);
        }
    }

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
        // console.log(exercises)
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
        let response = $api.post(`education/lesson/${id}/answer/`,
            {
                lesson: lesson?.id,
                exercises: exercises_answers,
                tests: tests_answers
            })
    }

    console.log(lesson)

    return (
        <div className="flex">
            <div className="mr-6 w-3/4 pl-10 flex flex-col pr-5">
                {previousURL &&
                    <button
                        onClick={handlePrevClick}
                        className="fixed bg-gray-500 w-7 h-14 top-1/2 -mt-10 z-10 opacity-25 -ml-3"
                    >
                        <img src="/keyboard-left-arrow-button_icon-icons.com_72692.png"/>
                    </button>
                }
                {nextURL &&
                    <button
                        onClick={handleNextClick}
                        className="fixed left-3/4 bg-gray-500 w-7 h-14 top-1/2 -mt-10 z-10 opacity-25 -ml-5"
                    >
                        <img src="/keyboard-right-arrow-button_icon-icons.com_72691.png"/>
                    </button>
                }
                {isLessonLoading &&
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                        <Loader/>
                    </div>
                }
                {lesson.results[0].video && <div className="inline z-0 relative w-full h-1/2 ml-4">
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        className="w-full"
                        url={API_URL.substring(0, API_URL.length - 1) + lesson.results[0].video}
                        controls={true}
                        config={{file: {attributes: {controlsList: 'nodownload'}}}}
                    />
                </div>}
                <p className="text-justify text-xl mt-3 -ml-6 indent-12 mx-auto text-center">
                    {lesson.results[0].text}
                </p>
                <div>
                    <form
                        onSubmit={formSubmitHandler}>
                        {exercises.concat(tests).map(task => <Task task={task} key={task.id}/>)}
                        <div className="right-1/4 mr-6 absolute">
                            <button
                                className="mt-2 p-2 text-xl border-2 border-white bg-blue-600 rounded-lg"
                                type="submit">Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <SideThemes id={id}/>
        </div>
    );
};

export default Lesson;