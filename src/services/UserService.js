import $api from "../http";

export default class UserService {
    static async getUser() {
        return $api.get('user/')
    }

    static async updateUser(user) {
        return $api.patch('user/', {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            patronymic: user.patronymic,
        })
    }

    static async updateImage(image) {
        const formData = new FormData()
        formData.append('image', image)
        return $api.patch('user/image/', {image}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}