import $api from "../http";

export default class UserService {
    static async getUser() {
        return $api.get('user/')
    }
}