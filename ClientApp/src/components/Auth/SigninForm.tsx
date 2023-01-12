import Button, { colors } from "components/Button";
import CheckBox from "components/Form/CheckBox";
import Form from "components/Form/Form";
import Input from "components/Form/Input";
import React from "react";
import { Link } from "react-router-dom";

function SigninForm() {
    return (
        <Form>
            <h2 className="font-semibold text-3xl mx-auto text-center -mt-2">Sign in</h2>
            <Input label="Email" type="email" placeholder="Enter email" />
            <Input label="Password" type="password" placeholder="password" />
            <div className="flex justify-end">
                <Link to={"/forgotpass"} className="text-white hover:underline text-sm -mt-2">
                    Forgot password?
                </Link>
            </div>
            <CheckBox label="Remember me" defaultChecked />
            <Button classColor={colors.invertPrimary}>Sign in</Button>
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
