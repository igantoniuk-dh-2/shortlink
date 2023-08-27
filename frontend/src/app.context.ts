import { createContext } from 'react'
import { Link, User } from './api/api.interface'

export interface AppContext {
    user: Partial<User> | null
    isLoading: boolean
    links: Link[]
    setLinks: (links: Link[]) => void
    setUser: (user: Partial<User>) => void
    jwt: string
    startLoading: () => void
    stopLoading: () => void
    setJwt: (jwt: string) => void
    setNeedToRefreshLinks: () => void
}

const context = createContext<AppContext>(null)
export default context
