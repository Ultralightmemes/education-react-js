import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import LessonService from "../services/LessonService";
import {useParams} from "react-router-dom";
import SideThemes from "../components/SideThemes";
import ReactPlayer from "react-player";
import {API_URL} from "../http";
import Loader from "../components/UI/Loader/Loader";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Tasks from "../components/Tasks";

const Lesson = observer(() => {
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
    const {store} = useContext(Context)
    const [previousURL, setPreviousURL] = useState(null)
    const [nextURL, setNextURL] = useState(null)
    const [currentPage, setCurrentPage] = useState(store.lesson)


    const [fetchLesson, isLessonLoading, lessonError] = useFetching(async () => {
        const response = await LessonService.getLesson(id, store.lesson)
        setLesson(response.data)
        setPreviousURL(response.data.previous)
        setNextURL(response.data.next)
        store.setTitle(response.data.results[0].title)
    })

    useEffect(() => {
        fetchLesson()

        return () => {
            store.delTitle()
        };
    }, [currentPage, store.lesson])


    function handlePrevClick() {
        if (previousURL) {
            store.setLesson(store.lesson - 1);
        }
    }

    function handleNextClick() {
        if (nextURL) {
            store.setLesson(store.lesson + 1);
        }
    }
    console.log(lesson)

    return (
        <div className="flex ml-10">
            <div className="mr-6 w-3/4 flex flex-col pr-5">
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
                        className="fixed left-3/4 bg-gray-500 w-7 h-14 top-1/2 -mt-10 z-10 opacity-25 -ml-3"
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
                        className="w-full border"
                        url={API_URL.substring(0, API_URL.length - 1) + lesson.results[0].video}
                        controls={true}
                        config={{file: {attributes: {controlsList: 'nodownload'}}}}
                    />
                </div>}
                <p className="text-justify text-xl mt-5 ml-8 indent-12 mx-auto text-center">
                    {lesson.results[0].text}
                </p>
                <div>
                    <Tasks id={lesson.results[0].id}/>
                </div>
            </div>
            <SideThemes id={id}/>
        </div>
    );
});

export default Lesson;