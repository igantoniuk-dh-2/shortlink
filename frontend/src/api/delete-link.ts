import {
    DeleteShortLinkDto,
    DeleteShortLinkResult,
    baseUrl,
    err400,
    err401,
    err500,
    successMessage,
} from './api.interface'
export default async function deleteLink(
    dto: DeleteShortLinkDto,
    jwt: string
): Promise<DeleteShortLinkResult> {
    const res = await fetch(`${baseUrl}/${dto.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    })

    const { status } = res
    const data = await res.json()

    return convertResponseToResult(status, data)
}

const convertResponseToResult = async (
    status: number,
    data: any
): Promise<DeleteShortLinkResult> => {
    if (status === 400) {
        await err400(data)
        return {
            id: '',
        }
    }
    if (status === 401 || status === 404) {
        await err401()
        return {
            id: '',
        }
    }
    if (status === 500) {
        await err500()
        return {
            id: '',
        }
    }

    if (status === 200) {
        await successMessage('short link deleted')
        return data
    }
    await err500()
    return {
        id: '',
    }
}
