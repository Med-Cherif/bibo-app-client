import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../redux/store'

const RequiredNotAuth = ({ children }: { children: JSX.Element }) => {
    const { accessToken } = useSelector((state: RootState) => state.auth)
    if (accessToken) {
        return <Navigate to="/" />
    }

    return children
}

export default RequiredNotAuth