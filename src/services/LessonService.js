import $api from "../http";

export default class LessonService {
    static async getLesson(id, page) {
        return $api.get(`education/course/${id}/lesson/?page=${page}`)
    }

    static async sendAnswer(id, data) {
        return $api.post(`education/lesson/${id}/answer/`, data)
    }

    static async createLesson(id, lesson) {
        return $api.post(`teacher/theme/${id}/lesson/`, lesson, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    static async getThemeLessons(id) {
        return $api.get(`teacher/theme/${id}/lesson/`)
    }

    static async getTeacherLesson(id) {
        return $api.get(`teacher/lesson/${id}/`)
    }

    static async updateLesson(lesson) {
        return $api.patch(`teacher/lesson/${lesson.id}/`, lesson,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    static async deleteLesson(id) {
        return $api.delete(`teacher/lesson/${id}/`)
    }
}