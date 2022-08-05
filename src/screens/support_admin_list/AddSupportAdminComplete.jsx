import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Strings } from '../../const'

export const AddSupportAdminComplete = ({ user }) => {
    const [otp, setOtp] = useState('123ABC')
    return (
        <>
            <div className="sm:mx-auto sm:w-full">
                <h2 className="mt-6 text-3xl font-extrabold text-center">
                    {Strings.edit_support_admin_list.add_admin_complete.title}
                </h2>
            </div>
            <div className="mt-8 card sm:mx-auto sm:w-full bg-base-200 shadow-xl text-center">
                <div className="card-body">
                    <h2 className="card-title">{Strings.edit_support_admin_list.add_admin_complete.otp_label}</h2>
                    <p className="text-red-500">{otp}</p>
                </div>
            </div>

        </>
    )
}
