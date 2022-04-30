import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const RequiredAuth = ({ children }: { children: JSX.Element }) => {
    const { accessToken } = useSelector((state: RootState) => state.auth)

    if (!accessToken) {
        return <Navigate to="/register" />
    }

    return children
}

export default RequiredAuth