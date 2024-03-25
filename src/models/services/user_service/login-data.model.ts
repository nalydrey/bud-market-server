import { User } from "../../../entity/user.entity.js"

export interface LoginData {
    password: string
    user: User
}