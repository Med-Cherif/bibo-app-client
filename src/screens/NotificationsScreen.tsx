import { List } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NotificationItem from "../components/Notification/NotificationItem";
import { RootState } from "../redux/store";
import { getNotificationAction } from "../redux/actions/notificationActions";


const NotificationsScreen = () => {

    const { notifications } = useSelector((state: RootState) => state.notifiction)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNotificationAction())
    }, [])

    return (
        <div className="notifications-screen">
            <List>
                {notifications.map((notification) => {
                    return <NotificationItem key={notification._id} {...notification} />
                })}
            </List>
        </div>
    )
}

export default NotificationsScreen