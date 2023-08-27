import { useContext, useState, createContext } from 'react'
import Icons from '../icons'
import api from 'src/api'
import Alerts from '../alerts'

import appContext, { AppContext } from 'src/app.context'
import alerts from '../alerts'

interface AuthFormContext {
    email: string
    password: string
    setEmail: (str) => void
    setPassword: (str) => void
}

const AuthFormContextImpl = createContext<AuthFormContext | null>(null)

export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const { user } = useContext<AppContext>(appContext)
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <LogoNote />
                </div>
                <div>{user ? <UserForm /> : <AuthForm />}</div>
            </div>
        </nav>
    )
}
const LogoNote: React.FC<{}> = ({}) => {
    return (
        <>
            <a href="#" className="flex items-center">
                <Icons.link className="mr-[5px]" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Декабрист
                </span>
            </a>
        </>
    )
}
const UserForm: React.FC<{}> = ({}) => {
    const { user } = useContext<AppContext>(appContext)
    return (
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {user && <User />}
            {user && <LogoutButton />}
        </div>
    )
}

const User: React.FC<{}> = ({}) => {
    const { user } = useContext<AppContext>(appContext)
    return <>{user && <span className="mr-2">{user.email}</span>}</>
}
const LogoutButton: React.FC<{}> = ({}) => {
    const { user, setUser } = useContext<AppContext>(appContext)
    return (
        <>
            {user && (
                <button
                    onClick={() => {
                        setUser(null)
                        localStorage.removeItem('jwt')
                        alerts.LogoutSuccess(`Good bye!`)
                    }}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 min-h-[40px] min-w-[100px]"
                >
                    Logout
                </button>
            )}
        </>
    )
}

const AuthForm: React.FC<{}> = ({}) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <AuthFormContextImpl.Provider
            value={{ email, password, setEmail, setPassword }}
        >
            <form className="flex">
                <EmailInput />
                <PasswordInput />
                <LoginButton />
                <SignupButton />
            </form>
        </AuthFormContextImpl.Provider>
    )
}

const EmailInput: React.FC<{}> = ({}) => {
    const { setEmail } = useContext<AuthFormContext>(AuthFormContextImpl)
    return (
        <div className="flex items-center">
            <input
                onInput={(event) => setEmail(event.currentTarget.value)}
                type="text"
                name="email"
                placeholder="email"
                className="text"
            />
        </div>
    )
}

const PasswordInput: React.FC<{}> = ({}) => {
    const { setPassword } = useContext<AuthFormContext>(AuthFormContextImpl)

    return (
        <div className="flex items-center">
            <input
                onInput={(event) => setPassword(event.currentTarget.value)}
                type={'password'}
                name="password"
                placeholder="password"
                className="text mx-[5px]"
            />
        </div>
    )
}

const LoginButton: React.FC<{}> = ({}) => {
    const { setUser, setJwt } = useContext<AppContext>(appContext)
    const { email, password } = useContext<AuthFormContext>(AuthFormContextImpl)

    return (
        <div className="flex items-center">
            <button
                onClick={() =>
                    api.login(email, password).then((res) => {
                        setUser(res.user || null)
                        setJwt(res.jwt)
                    })
                }
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-h-[40px] min-w-[100px] mr-2"
            >
                Login
            </button>
        </div>
    )
}

const SignupButton: React.FC<{}> = ({}) => {
    const { setUser, setJwt } = useContext<AppContext>(appContext)
    const { email, password } = useContext<AuthFormContext>(AuthFormContextImpl)
    return (
        <div className="flex items-center">
            <button
                onClick={() =>
                    api.signup(email, password).then((res) => {
                        setUser(res.user || null)
                        setJwt(res.jwt)
                    })
                }
                type="button"
                className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 min-h-[40px] min-w-[100px]"
            >
                Signup
            </button>
        </div>
    )
}
