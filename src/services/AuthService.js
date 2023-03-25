import $api, {API_URL} from "../http";
import axios from "axios";

export default class AuthService {
    static async login(email, password) {
        return $api.post('token/', {email, password}, {})
    }

    static async registration(user) {
        return axios.post(API_URL + 'user/registration/', {
            email: user.email,
            password: user.password,
            first_name: user.firstName,
            last_name: user.lastName
        })
    }

    static async logout(refresh) {
        return $api.post('user/logout/', {refresh})
    }
}