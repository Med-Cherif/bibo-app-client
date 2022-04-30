import jwtDecode from "jwt-decode";
import { UserData } from "../redux/slices/authSlice";

const nameAPP = 'bibotoken'

export const getAccessToken = () => {
    let token: any = localStorage.getItem(nameAPP)
    if (token === "null" || token === "undefined" || !token) {
        return null
    }
    token = JSON.parse(token);
    let accessToken = token?.accessToken;
    if (!accessToken) {
        return null;
    }

    return accessToken
}

export const getRefreshToken = () => {
    let token: any = localStorage.getItem(nameAPP)
    if (token === "null" || token === "undefined" || !token) {
        return null
    }
    token = JSON.parse(token);
    let refreshToken = token?.refreshToken;
    if (!refreshToken) {
        return null;
    }

    return refreshToken
}

export const getUserData = (): UserData | null => {
    const accessToken = getAccessToken()
    if (!accessToken) {
        return null
    }

    return jwtDecode(accessToken);

}
