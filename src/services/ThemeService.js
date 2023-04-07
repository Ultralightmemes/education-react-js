import $api from "../http";

export default class ThemeService {
    static async getThemes(id) {
        return $api.get(`education/course/${id}/theme/`)
    }

    static async getCourseThemesForTeacher(id) {
        return $api.get(`teacher/course/${id}/theme/`)
    }

    static async createTheme(id, theme) {
        return $api.post(`teacher/course/${id}/theme/`, theme)
    }
}