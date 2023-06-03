export interface LoginResponse{
    token: string,
    user: UserLoginResponse
}

export interface UserLoginResponse{
    email: string,
    id: string,
    password: string,
    username: string,
    type: string
}