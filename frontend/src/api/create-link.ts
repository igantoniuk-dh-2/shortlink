import {
    CreateShortLinkDto,
    CreateShortLinkResult,
    baseUrl,
    err400,
    err401,
    err500,
    successMessage,
} from './api.interface'
export default async function createLink(
    dto: CreateShortLinkDto,
    jwt: string
): Promise<CreateShortLinkResult> {
    const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            ...dto,
        }),
    })

    const { status } = res
    const data = await res.json()

    return convertResponseToResult(status, data)
}

const convertResponseToResult = async (
    status: number,
    data: any
): Promise<CreateShortLinkResult> => {
    if (status === 400) {
        await err400(data)
        return {
            shortLink: '',
            id: '',
        }
    }
    if (status === 401 || status === 404) {
        await err401()
        return {
            shortLink: '',
            id: '',
        }
    }
    if (status === 500) {
        await err500()
        return {
            shortLink: '',
            id: '',
        }
    }

    if (status === 201) {
        await successMessage('short link created')
        return data
    }
    await err500()
    return {
        shortLink: '',
        id: '',
    }
}
