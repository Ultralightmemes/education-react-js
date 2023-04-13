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

    static async getTeacherCourses() {
        return $api.get('teacher/course/')
    }

    static async updateCourseImage(id, image) {
        return $api.patch(`teacher/course/${id}/image/`, {image}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    static async updateCourse(course) {
        return $api.patch(`teacher/course/${course.id}/`, {
            categories: course.categories,
            name: course.name,
            is_published: course.is_published,
            text: course.text
        })
    }

    static async createCourse(name, text, is_published, categories) {
        return $api.post('teacher/course/', {
            name,
            text,
            is_published,
            categories,
        })
    }

    static async deleteCourse(id) {
        return $api.delete(`teacher/course/${id}/`)
    }

    static async getBest() {
        return $api.get(`education/course/best/`)
    }

    static async getNewest() {
        return $api.get(`education/course/new/`)
    }
}