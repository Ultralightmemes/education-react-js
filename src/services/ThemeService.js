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

    static async getTeacherTheme(id) {
        return $api.get(`teacher/theme/${id}/`)
    }

    static async updateTheme(theme) {
        return $api.patch(`teacher/theme/${theme.id}/`, {
            id: theme.id,
            title: theme.title,
            description: theme.description,
            position: theme.position,
            is_published: theme.is_published
        })
    }

    static async deleteTheme(id) {
        return $api.delete(`teacher/theme/${id}/`)
    }
}