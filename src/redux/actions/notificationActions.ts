import { actions } from "../slices/notificationSlice";
import { AppDispatch, RootState } from "../store";
import * as apis from "../../api/notificationApi";

export const getNotificationAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()
    try {
        const { data } = await apis.getNotification(auth.userData!._id, auth.accessToken!)
        dispatch(actions.getNotifications(data.notifications))
    } catch (error) {
        console.log(error)
    }
}