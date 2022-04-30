import axios from "axios";
import API_URL from "../config";

const userApi = `${API_URL}/api/users`;

interface UpdateUserData {
    username?: string,
    name?: string,
    email?: string,
    description?: string,
}
export interface UpdatePasswordData {
    currentPassword: string, 
    newPassword: string, 
    newConfirmingPassword: string, 
}
export const getSearchUsers = (query: string, token: string) => axios.get(userApi + `?search=${query}`, { headers: { authorization: token } });
export const getUserData = (userId: string, token: string) => axios.get(userApi + '/' + userId, { headers: { authorization: token } });
export const updateUser = (userId: string, data: UpdateUserData, token: string) => axios.patch(userApi + '/' + userId, data, { headers: { authorization: token } });
export const updateUserPassword = (userId: string, data: UpdatePasswordData, token: string) => axios.patch(userApi + '/' + userId + '/password', data, { headers: { authorization: token } });
export const updateProfilePicture = (userId: string, data: FormData, token: string) => axios.patch(userApi + '/' + userId + '/picture', data, { headers: { authorization: token } });
export const getUserContact = (userId: string, type: "followings" | "followers", token: string) => axios.get(`${userApi}/${userId}/${type}` ,{ headers: { authorization: token } });

export const getMyFollowings = (userId: string, token: string) => axios.get(`${userApi}/${userId}/contact/followings` ,{ headers: { authorization: token } });