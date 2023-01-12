import React from "react";
import RegisterForm from "components/Auth/RegisterForm";
import ResetPasswordForm from "components/Auth/ResetPassword";
function TestPage() {
    return (
        <div className=" grid place-items-center items-center h-screen">
            <div className=" w-[500px]  ">
                <ResetPasswordForm />
            </div>
        </div>
    );
}

export default TestPage;
