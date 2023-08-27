import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import api from './api'
import AppContext from './app.context'
import LinkInput from './components/link-input'
import Links from './components/links/Component'
import Navbar from './components/navbar'
import { Link, User } from './api/api.interface'

const App: React.FC<{}> = () => {
    const [user, setUser] = useState<Partial<User> | null>(null)
    const [links, setLinks] = useState<Link[] | null>(null)
    const [jwt, setJwt] = useState<string | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [needTorefreshLinks, setNeedToRefreshLinks] = useState<boolean>(true)

    useEffect(() => {
        checkJwt(jwt, setUser)?.then((res) => fetchLinks(setLinks, jwt))
    }, [jwt])

    useEffect(() => {
        if (!needTorefreshLinks) return
        fetchLinks(setLinks, jwt)
        setNeedToRefreshLinks(false)
    }, [needTorefreshLinks])

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) return
        setJwt(jwt)
    }, [])

    return (
        <AppContext.Provider
            value={{
                user,
                isLoading,
                setUser,
                startLoading: () => setLoading(true),
                stopLoading: () => setLoading(false),
                jwt,
                setLinks,
                links,
                setJwt,
                setNeedToRefreshLinks: () => setNeedToRefreshLinks(true),
            }}
        >
            <div className="container mx-auto">
                <Navbar />
            </div>
            <div className="container mx-auto max-w-[700px]">
                {user ? <LinkInput /> : <Description />}
            </div>
            <div className="container mx-auto max-h-[450px] overflow-y-scroll ">
                {user && links?.length > 0 && <Links />}
            </div>
            <div>
                <ToastContainerWithOpts />
            </div>
        </AppContext.Provider>
    )
}

async function fetchLinks(setLinks: (links: Link[] | null) => void, jwt) {
    if (!jwt) return
    const links = await api.getLinks(jwt)
    setLinks(links.links || [])
}

const Description: React.FC<{}> = ({}) => {
    return (
        <div className="flex flex-col  text-xl mt-12">
            <ul>
                <li className="my-2">
                    Сервис для сокращения ссылок сокращает ссылки на
                    веб-страницы и предоставляет удобный интерфейс для их
                    просмотра.
                </li>
                <li className="my-2">
                    Наш сервис позволяет пользователям сократить до нескольких
                    символов длинные URL-адреса, что экономит время и упрощает
                    навигацию по сайту.
                </li>
                <li className="my-2">
                    Мы используем передовые алгоритмы для сокращения ссылок,
                    чтобы они были максимально короткими и содержательными.
                </li>
                <li className="my-2">
                    Наш сервис поддерживает множество языков, включая русский,
                    что делает его доступным для пользователей из разных стран.
                </li>
                <li className="my-2">
                    Наш сервис автоматически обрабатывает все сокращения ссылок,
                    чтобы пользователи могли легко найти нужную информацию на
                    сайте.
                </li>
            </ul>
            <hr />
            <div className="flex items-center justify-center">
                <h3 className="text-3xl my-5 text-center">
                    Для продолжения работы - войдите или зарегистируйтесь
                </h3>
            </div>
        </div>
    )
}

const checkJwt = (jwt: string, setUser: (user: Partial<User>) => void) => {
    if (!jwt) return
    return api.checkJwt(jwt).then((res) => {
        if (res.jwt) {
            localStorage.setItem('jwt', res.jwt)
            setUser(res.user)
            return res
        }
        localStorage.removeItem('jwt')
        return res
    })
}

const ToastContainerWithOpts: React.FC<{}> = ({}) => {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    )
}

export default App
