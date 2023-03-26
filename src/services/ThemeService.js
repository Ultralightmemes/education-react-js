import $api from "../http";

export default class ThemeService {
    static async getThemes(id) {
        return $api.get(`education/course/${id}/theme/`)
    }
}