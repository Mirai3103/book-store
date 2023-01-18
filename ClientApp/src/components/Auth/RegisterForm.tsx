import Button, { colors } from "components/Button";
import CheckBox from "components/Form/CheckBox";
import Form from "components/Form/Form";
import Input from "components/Form/Input";
import React from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
    return (
        <Form>
            <h2 className="font-semibold text-3xl mx-auto text-center -mt-2">Register</h2>
            <Input label="Full name" type="text" placeholder="Your full name" required autoComplete="name" />

            <Input label="Email" type="email" placeholder="Enter email" required autoComplete="email" />
            <Input label="Password" type="password" placeholder="password" required autoComplete="new-password" />
            <Input
                label="Password"
                type="password"
                placeholder="repeat password"
                required
                autoComplete="new-password"
            />

            <CheckBox label="I accept  the terms and conditions" />
            <Button classColor={colors.invertPrimary}>Register </Button>
            <div className="flex justify-center gap-x-1">
                <span className="text-black">Already have an account? </span>
                <Link to="/login" className="text-white hover:underline">
                    Login
                </Link>
            </div>
        </Form>
    );
}

export default RegisterForm;
