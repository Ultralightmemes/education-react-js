import $api from "../http";

export default class ThemeService {
    static async getThemes(id) {
        return $api.get(`education/course/${id}/theme/`)
    }

    static async getCourseThemesForTeacher(id) {
        return $api.get(`teacher/course/${id}/theme/`)
    }
}