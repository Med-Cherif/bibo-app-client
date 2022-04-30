import axios from "axios";
import API_URL from "../config";

const notificationApi = `${API_URL}/api/notifications`;

export const getNotification = (userId: string, token: string) => axios.get(notificationApi + '/' + userId, { headers: { authorization: 'Bearer ' + token } })
