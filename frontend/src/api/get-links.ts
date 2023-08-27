import {
    ReadAllLinksResult,
    baseUrl,
    err400,
    err401,
    err500,
} from './api.interface'
export default async function getLinks(
    jwt: string
): Promise<ReadAllLinksResult> {
    const res = await fetch(`${baseUrl}/all`, {
        method: 'GET',
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
): Promise<ReadAllLinksResult> => {
    if (status === 400) {
        await err400(data)
        return {
            links: [],
        }
    }
    if (status === 401 || status === 404) {
        await err401()
        return {
            links: [],
        }
    }
    if (status === 500) {
        await err500()
        return {
            links: [],
        }
    }

    if (status === 200) {
        return data
    }
    await err500()
    return {
        links: [],
    }
}
