import $api from "../http";

export default class CategoryService {
    static async getCategories() {
        return $api.get('education/category/')
    }

    static async getCategory(id) {
        return $api.get(`education/category/${id}/`)
    }
}