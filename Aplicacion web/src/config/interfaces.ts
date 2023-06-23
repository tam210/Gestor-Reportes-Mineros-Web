export interface LoginResponse{
    token: string,
    user: UserLoginResponse
}

export interface UserLoginResponse{
    validEmail: boolean,
    validPassword: boolean,
    userType: number
}