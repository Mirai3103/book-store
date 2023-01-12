import Button, { colors } from "components/Button";
import CheckBox from "components/Form/CheckBox";
import Form from "components/Form/Form";
import Input from "components/Form/Input";
import React from "react";
import { Link } from "react-router-dom";

function ResetPasswordForm() {
    return (
        <Form>
            <h2 className="font-semibold text-3xl mx-auto text-center -mt-2">Reset Password </h2>
            <p>Enter your email address and we'll send you an email with instructions to reset your password</p>
            <Input label="Email" type="email" placeholder="Enter email" required />
            <Button classColor={colors.invertPrimary}>Reset password</Button>
            <div className="flex justify-end gap-x-1">
                <Link to="/register" className="text-white hover:underline">
                    Back to login ?
                </Link>
            </div>
        </Form>
    );
}

export default ResetPasswordForm;
