import $api from "../http";

export default class CourseService {
    static async getAll() {
        return $api.get('education/course/')
    }

    static async getById(id) {
        return $api.get(`education/course/${id}/`)
    }

    static async getMy() {
        return $api.get('education/course/my/')
    }

    static async followCourse(id) {
        return $api.post(`education/course/${id}/follow/`)
    }
}