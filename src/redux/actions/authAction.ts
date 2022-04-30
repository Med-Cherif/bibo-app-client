import { actions } from "../slices/authSlice";
import * as api from "../../api/authApi";
import { AppDispatch } from "../store";
import { NavigateFunction } from "react-router-dom";

const errorHandling = (error: any) => {
    return error?.response?.data?.message || error.message
}

export const signupAction = (signupData: api.SignupData, naviagte: NavigateFunction, setSubmitting: (isSubmitting: boolean) => void) => async (dispatch: AppDispatch) => {
    dispatch(actions.loading("auth-loading"))
    try {
        const { data } = await api.signup(signupData)
        dispatch(actions.authSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken }))
        naviagte('/', { replace: true })
    } catch (err) {
        alert(JSON.stringify(err))
        dispatch(actions.error({
            type: "auth-error",
            message: errorHandling(err),
        }))
        
        setSubmitting(false)
    }
}

export const signinAction = (signinData: api.SigninData, naviagte: NavigateFunction, setSubmitting: (isSubmitting: boolean) => void) => async (dispatch: AppDispatch) => {
    dispatch(actions.loading("auth-loading"))
    try {
        const { data } = await api.signin(signinData)
        dispatch(actions.authSuccess({ accessToken: data.accessToken, refreshToken: data.refreshToken }))
        naviagte('/', { replace: true })
    } catch (err) {
        dispatch(actions.error({
            type: "auth-error",
            message: errorHandling(err),
        }))
        setSubmitting(false)
    }
}

export const logoutAction = (naviagte: NavigateFunction) => async (dispatch: AppDispatch) => {
    dispatch(actions.logout())
    naviagte('/login', { replace: true })
}