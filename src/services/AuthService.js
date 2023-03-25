import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('token/', {email, password}, {})
    }

    static async registration(user) {
        return $api.post('user/registration/', {
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