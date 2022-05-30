import { NotificationType } from "../../redux/slices/notificationSlice";
import LikingPostNotification from "./LikingPostNotification";
import FolowingNotification from "./FolowingNotification";

const NotificationItem = ({ _id, user, user2, message, action, post, seen }: NotificationType) => {
    if (action === "likingPost") {
        return <LikingPostNotification user2={user2} message={message} post={post!} />
    }
    if (action === "followingUser") {
        return <FolowingNotification user2={user2} message={message} />
    }
    return null
}

export default NotificationItem