import { useContext, useState } from 'react'
import appContext, { AppContext } from 'src/app.context'
import alerts from '../alerts'
import api from 'src/api'

const LinkInput: React.FC<{}> = ({}) => {
    return (
        <div className="flex flex-col  justify-center mt-5">
            <Header />
            <LinkInputForm />
        </div>
    )
}

const Header: React.FC<{}> = ({}) => {
    return (
        <div className="text-3xl flex items-center justify-center">
            <span>Сократи свою ссылку</span>
        </div>
    )
}

const LinkInputForm: React.FC<{}> = ({}) => {
    const { user, jwt, setNeedToRefreshLinks } =
        useContext<AppContext>(appContext)
    const [url, setUrl] = useState<string>('')
    return (
        <form
            className="flex flex-col"
            onSubmit={async (event) => {
                event.preventDefault()
                if (!user) alerts.NoAuthError()
                await api
                    .createLink(
                        {
                            url,
                        },

                        jwt
                    )
                    .then((res) => setNeedToRefreshLinks())
            }}
        >
            <input
                type="text"
                name="longlink"
                placeholder="Введите cсылку для сокращения"
                onInput={(event) => setUrl(event.currentTarget.value)}
                className="my-5"
            />
            <button
                type="submit"
                className=" cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
                Сократить ссылку
            </button>
        </form>
    )
}

export default LinkInput
