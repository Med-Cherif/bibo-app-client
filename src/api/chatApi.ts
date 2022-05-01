import axios from "axios";
import API_URL from "../config";

const chatApi = `${API_URL}/api/chats`;

export const getChats = (userId: string, token: string) => axios.get(`${chatApi}/${userId}`, { headers: { authorization: 'Bearer ' + token } });