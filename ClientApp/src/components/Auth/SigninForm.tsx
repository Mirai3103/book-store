import Button, { colors } from "components/Button";
import CheckBox from "components/Form/CheckBox";
import Form from "components/Form/Form";
import Input from "components/Form/Input";
import React from "react";
import { Link } from "react-router-dom";
import { login } from "utils/axiosInstance";
import { login as setUser, logout } from "redux/authSplice";

import Cookies from "universal-cookie";
import { useAppDispatch } from "../../redux/hooks";
import { IUser } from "../../types/ServerEntity";
function SigninForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispath = useAppDispatch();
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleLogin = async () => {
        const data = await login(email, password);
        if (!data) {
            dispath(logout());
            return;
        }
        const { accessToken, refreshToken, user } = data;
        localStorage.setItem("refreshToken", refreshToken);
        const cookies = new Cookies();
        cookies.set("accessToken", accessToken, { path: "/" });
        dispath(setUser(user as IUser));
    };
    return (
        <Form>
            <h2 className="font-semibold text-3xl mx-auto text-center -mt-2">Sign in</h2>
            <Input
                label="Email"
                type="email"
                placeholder="Enter email"
                onChange={handleEmailChange}
                value={email}
                autoComplete="username"
            />
            <Input
                label="Password"
                type="password"
                placeholder="password"
                onChange={handlePasswordChange}
                value={password}
                autoComplete="current-password"
            />
            <div className="flex justify-end">
                <Link to={"/forgotpass"} className="text-white hover:underline text-sm -mt-2">
                    Forgot password?
                </Link>
            </div>
            <CheckBox label="Remember me" defaultChecked />
            <Button classColor={colors.invertPrimary} onClick={handleLogin}>
                Sign in
            </Button>
            <div className="flex justify-center gap-x-1">
                <span className="text-black">Don't have an account? </span>
                <Link to="/register" className="text-white hover:underline">
                    Sign up
                </Link>
            </div>
        </Form>
    );
}

export default SigninForm;
