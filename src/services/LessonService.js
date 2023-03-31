import $api from "../http";

export default class LessonService {
    static async getLesson(id, page) {
        return $api.get(`education/course/${id}/lesson/?page=${page}`)
    }

    static async sendAnswer(id, data) {
        return $api.post(`education/lesson/${id}/answer/`, data)
    }
}