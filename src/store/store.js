import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";

export default class Store {
    isAuth = false
    isLoading = false
    title = null
    lesson = 1

    course_id = null
    theme_id = null
    lesson_id = null
    exercise_id = null
    test_id = null

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    delTitle() {
        this.title = null
    }

    setTitle(title) {
        this.title = title
    }

    setLesson(lesson) {
        this.lesson = lesson
    }

    delLesson() {
        this.lesson = 1
    }

    delIds() {
        this.course_id = null
        this.theme_id = null
        this.lesson_id = null
        this.exercise_id = null
        this.test_id = null
    }

    setCourseId(id) {
        this.course_id = id
        this.theme_id = null
        this.lesson_id = null
        this.exercise_id = null
        this.test_id = null
    }

    setThemeId(id) {
        this.theme_id = id
        this.lesson_id = null
        this.exercise_id = null
        this.test_id = null
    }

    setLessonId(id) {
        this.lesson_id = id
        this.exercise_id = null
        this.test_id = null
    }

    setExerciseId(id) {
        this.exercise_id = id
        this.test_id = null
    }

    setTestId(id) {
        this.test_id = id
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            this.setAuth(true)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

    async registration(user) {
        try {
            const response = await AuthService.registration(user);
            console.log(response)
            localStorage.setItem('access', response.data.tokens.access)
            localStorage.setItem('refresh', response.data.tokens.refresh)
            this.setAuth(true)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout(localStorage.getItem('refresh'));
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            this.setAuth(false)
        } catch (e) {
            console.log(e.response.message)
        }
    }

    async checkAuth () {
        this.setLoading(true)
        try {
            const response = await axios.post(`${API_URL}token/refresh/`, {

                refresh: localStorage.getItem('refresh')
            }, {withCredentials: true,})
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            this.setAuth(true)
        } catch (e) {
            console.log(e.response.message)
        } finally {
            this.setLoading(false)
        }
    }
}