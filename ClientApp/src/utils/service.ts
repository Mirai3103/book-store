import axios from "axios";
import { createToast } from "../components/Toast";
import { IUser } from "../types/ServerEntity";
import Cookies from "universal-cookie";
export const cookies = new Cookies();
export const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const login = async (
    email: string,
    password: string
): Promise<{
    refreshToken: string;
    accessToken: string;
    user: IUser;
} | null> => {
    try {
        const response = await instance.post("/api/Auth/Login", {
            email,
            password,
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data.message) {
            createToast("Error", error.response.data.message, "error", 4000);
        }
        return null;
    }
};

const refreshAccessToken = async (): Promise<{
    accessToken: string;
    user: IUser;
} | null> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        return null;
    }
    const response = await instance.post("/api/Auth/RefreshToken", {
        refreshToken,
    });
    return response.data;
};

export const authInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
authInstance.interceptors.request.use(
    async (config: any) => {
        const token = cookies.get("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }
        //refresh token
        const response = await refreshAccessToken();
        if (response) {
            config.headers.Authorization = `Bearer ${response.accessToken}`;
            cookies.set("accessToken", response.accessToken, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        } else {
            throw new axios.Cancel("Please login again");
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

authInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const code = error.response.status;
        const config = error.config;
        if (code === 401) {
            const data = await refreshAccessToken();
            if (data) {
                cookies.set("accessToken", data.accessToken, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                });
                return authInstance.request(config);
            } else {
                throw new axios.Cancel("Please login again");
            }
        }
        return error;
    }
);
