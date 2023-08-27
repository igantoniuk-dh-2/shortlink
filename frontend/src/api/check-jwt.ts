import { LoginUserResult, baseUrl } from './api.interface'
export default async function checkJwt(jwt: string): Promise<LoginUserResult> {
    const urlParams = new URLSearchParams()
    urlParams.append('jwt', jwt)

    const res = await fetch(`${baseUrl}/user/check?${urlParams.toString()}`)

    const { status } = res
    const data = await res.json()

    return convertResponseToResult(status, data)
}

const convertResponseToResult = async (
    status: number,
    data: any
): Promise<LoginUserResult> => {
    if (status === 200) {
        return data
    }
    return {
        user: null,
        jwt: '',
    }
}
