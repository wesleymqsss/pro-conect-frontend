export interface UserLogin {
    message: string,
    user: {
        id: number,
        username: string,
        password: string,
        role: string
    }
}