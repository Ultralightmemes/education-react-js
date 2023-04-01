import $api from "../http";

export default class CourseService {
    static async getAll(ordering='', search='') {
        return $api.get(`education/course/?ordering=${ordering}&search=${search}`)
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

    static async rateCourse(id, rating) {
        return $api.post(`education/course/${id}/rate/`, {rating})
    }
}