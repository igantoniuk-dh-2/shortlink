import alerts from 'src/components/alerts'

export const baseUrl = `http://127.0.0.1:${
    process.env.REACT_APP_BACKEND_PORT || 3000
}`

export interface User {
    ID: string
    id: string
    email: string
    password: string
    createdAt: string
}
export interface CreateUserResult {
    jwt: string
    user: Partial<User>
}

export interface LoginUserResult extends CreateUserResult {
    // ...
}

export interface CheckUserResult extends CreateUserResult {
    // ...
}

export interface Link {
    ID: string
    id?: string
    shortLink: string
    longLink: string
    userId: string
    createdAt: string
}

export interface CreateShortLinkDto {
    url: string
}

export interface DeleteShortLinkDto {
    id: string
}

export interface ReadShortLinkDto {
    shortLink: string
}

export interface CreateShortLinkResult {
    shortLink: string
    id: string
}

export interface DeleteShortLinkResult {
    id: string
}

export interface ReadAllLinksResult {
    links: {
        shortLink: string
        longLink: string
        id: string
        ID: string
        createdAt: string
        userId: string
    }[]
}

const successLoginMessage = async (email: string) => {
    alerts.LoginSuccess(`Welcome ${email}!`)
}

const successMessage = async (message: string) => {
    alerts.LoginSuccess(message)
}

const err400 = async (data: { message: string[] }) => {
    return data.message.map((messae) => alerts.ApiError(messae))
}

const err401 = async () => {
    return alerts.ApiError('user not exists or password is wrong')
}

const err500 = async () => {
    return alerts.ApiError('internal server errror')
}

export { err400, err401, err500, successLoginMessage, successMessage }
