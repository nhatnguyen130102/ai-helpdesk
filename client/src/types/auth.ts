
export interface RegisterRequest {
    userName: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    email: string,
    roleId: number,
}

export interface LoginRequest {
    userName: string,
    password: string,
}

export interface RefreshTokenRequest {
    refreshToken: string,
}

export interface LoginResponse {
    userId: number,
    userName: string,
    fullName: string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
}
