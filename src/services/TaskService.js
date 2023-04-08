import $api from "../http";

export default class TaskService {
    static async getTests(id) {
        return $api.get(`education/lesson/${id}/tests/`)
    }

    static async getExercises(id) {
        return $api.get(`education/lesson/${id}/exercises/`)
    }

    static async getTeacherExercises(id) {
        return $api.get(`teacher/lesson/${id}/exercise/`)
    }

    static async getTeacherTests(id) {
        return $api.get(`teacher/lesson/${id}/test/`)
    }

    static async createExercise(id, exercise) {
        return $api.post(`teacher/lesson/${id}/exercise/`, exercise)
    }

    static async createTest(id, test) {
        return $api.post(`teacher/lesson/${id}/test/`, test)
    }
}