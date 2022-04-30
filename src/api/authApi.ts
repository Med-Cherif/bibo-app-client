import axios from "axios";
import API_URL from "../config";

const authApi = `${API_URL}/api/auth`;

export interface SigninData {
    username?: string; 
    email?: string;
    password: string;
};

export interface SignupData extends SigninData {
    name: string;
    confirmPassword: string;
    birthday: string;
    gender: string;
    country?: string
};

export const signup = (signupData: SignupData) => axios.post(authApi + '/register', signupData);
export const signin = (signinData: SigninData) => axios.post(authApi + '/login', signinData);