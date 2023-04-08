import $api from "../http";

export default class TaskService {
    static async getTests(id) {
        return $api.get(`education/lesson/${id}/tests/`)
    }

    static async getExercises(id) {
        return $api.get(`education/lesson/${id}/exercises/`)
    }

    static async getThemeLessons(id) {
        return $api.get(`teacher/${id}/lesson/`)
    }
}