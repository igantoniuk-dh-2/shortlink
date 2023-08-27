import { useContext, useEffect, useState } from 'react'
import appContext, { AppContext } from 'src/app.context'
import Icons from '../icons'
import api from 'src/api'
import { Link } from 'src/api/api.interface'

const Links: React.FC<{}> = ({}) => {
    const { links } = useContext<AppContext>(appContext)

    useEffect(() => {
        if (!links || !links.length) return
        const sorted = links.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        setLinksForRender(sorted)
    }, [links])

    const [linksForRender, setLinksForRender] = useState<Link[]>([])
    return (
        <table className="mt-10 w-[100%] ">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Длинная ссылка</th>
                    <th>Сокращенная ссылка</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {linksForRender.map((link, inx) => (
                    <LinkRow key={link.id} link={link} inx={inx} />
                ))}
            </tbody>
        </table>
    )
}

const LinkRow: React.FC<{ link: Link; inx: number }> = ({ link, inx }) => {
    const { jwt, setNeedToRefreshLinks } = useContext<AppContext>(appContext)
    return (
        <tr className=" text-base mt-2 min-h-[30px] text-center">
            <td>{inx + 1}</td>
            <td className="px-5 text-blue-600 hover:underline">
                <a
                    target="_blank"
                    href={
                        link.longLink.match(/^http/)
                            ? link.longLink
                            : `http://${link.longLink}`
                    }
                >
                    {link.longLink}
                </a>
            </td>

            <td>{link.shortLink}</td>
            <td className="flex items-center justify-center min-h-[50px] cursor-pointer">
                <button
                    onClick={() => {
                        return api
                            .delLinks({ id: link.id }, jwt)
                            .then((res) => setNeedToRefreshLinks())
                    }}
                >
                    <Icons.trash />
                </button>
            </td>
        </tr>
    )
}

export default Links
