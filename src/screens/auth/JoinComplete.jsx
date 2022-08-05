import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Strings } from '../../const'
import { PATH_DASHBOARD } from '../../routes';

export const JoinComplete = ({ user }) => {
    const navigate = useNavigate();

    const [otp, setOtp] = useState('123ABC')

    const gotoDashboard = () => {
        navigate(PATH_DASHBOARD);
    }
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="mt-6 text-3xl font-extrabold text-center">
                    {Strings.join.complete.title}
                </h2>
            </div>
            <div className="mt-8 card sm:mx-auto sm:w-full sm:max-w-lg w-96 bg-base-200 shadow-xl  text-center">
                <div className="card-body">
                    <h2 className="card-title">{Strings.join.complete.otp_label}</h2>
                    <p className="text-red-500">{otp}</p>
                    <hr className='my-5' />
                    <p className='mt-5 text-left'>
                        Congratulations! <br /><br />
                        You have successfully created a teacher admin account. <br />
                        You will need your OTP to register your profile on your SmartHub. <br />
                        To view your OTP again, log in to the web app and click “View OTP”.
                    </p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-outline btn-primary btn-sm" onClick={gotoDashboard}>{Strings.join.complete.return_to_main_menu}</button>
                    </div>
                </div>
            </div>

        </>
    )
}
