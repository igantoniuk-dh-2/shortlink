import {
    LoginUserResult,
    baseUrl,
    err400,
    err401,
    err500,
    successLoginMessage,
} from './api.interface'
export default async function signup(
    email: string,
    password: string
): Promise<LoginUserResult> {
    const res = await fetch(`${baseUrl}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    const { status } = res
    const data = await res.json()

    return convertResponseToResult(status, data, email)
}

const convertResponseToResult = async (
    status: number,
    data: any,
    email: string
): Promise<LoginUserResult> => {
    if (status === 400) {
        await err400(data)
        return {
            user: null,
            jwt: '',
        }
    }
    if (status === 401 || status === 404) {
        await err401()
        return {
            user: null,
            jwt: '',
        }
    }
    if (status === 500) {
        await err500()
        return {
            user: null,
            jwt: '',
        }
    }

    if (status === 201) {
        await successLoginMessage(email)
        return data
    }
    await err500()
    return {
        user: null,
        jwt: '',
    }
}
