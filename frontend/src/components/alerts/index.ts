import { toast } from 'react-toastify'

const ApiError = (message: string = 'api error') => {
    toast(message, {
        type: 'error',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    })
}

const NoAuthError = (message: string = 'for continue please login') => {
    toast(message, {
        type: 'error',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    })
}

const LoginSuccess = (message: string = 'login success') => {
    toast(message, {
        type: 'success',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    })
}

const LogoutSuccess = (message: string = 'logout success') => {
    toast(message, {
        type: 'success',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    })
}

export default {
    ApiError,
    LoginSuccess,
    LogoutSuccess,
    NoAuthError,
}
