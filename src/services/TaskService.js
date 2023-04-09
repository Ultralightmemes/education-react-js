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

    static async getTeacherExercise(id) {
        return $api.get(`teacher/exercise/${id}/`)
    }

    static async updateExercise(exercise) {
        return $api.patch(`teacher/exercise/${exercise.id}/`, exercise)
    }

    static async deleteExercise(id) {
        return $api.delete(`teacher/exercise/${id}/`)
    }

    static async getTeacherTest(id) {
        return $api.get(`teacher/test/${id}/`)
    }

    static async updateTest(test, options) {
        return $api.patch(`teacher/test/${test.id}/`, {
            title: test.title,
            text: test.title,
            is_published: test.is_published,
            options: options,
        })
    }

    static async deleteTest(id) {
        return $api.delete(`teacher/test/${id}/`)
    }

    static async getOptions(id) {
        return $api.get(`teacher/test/${id}/options/`)
    }
}