import React from 'react'
import { Link } from "react-router-dom";

import {
    PATH_DASHBOARD,
    PATH_EDIT_CHECK_INS,
    PATH_EDIT_STUDENT_LIST,
    PATH_EDIT_SUPPORT_ADMIN_LIST,
    PATH_SEND_CHECK_IN_TO_STUDENT_LITBITS,
    PATH_SETTINGS,
    PATH_VIEW_ATTENDANCE,
    PATH_VIEW_CHECK_IN_RESULTS,
    PATH_VIEW_OTP,
    PATH_VIEW_SENSOR_DATA
} from '../routes';
import { Strings } from '../const';

function Sidebar() {
    return (
        <div className="drawer-side">
            <label htmlFor="side-bar" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-neutral text-base-content">
                <li>
                    <Link exact="true" to={PATH_DASHBOARD}>
                        <span className="text-base-content">{Strings.layout.menus.dashboard}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_VIEW_ATTENDANCE}>
                        <span className="text-base-content">{Strings.layout.menus.view_attendance}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_VIEW_CHECK_IN_RESULTS}>
                        <span className="text-base-content">{Strings.layout.menus.view_check_in_results}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_VIEW_SENSOR_DATA}>
                        <span className="text-base-content">{Strings.layout.menus.view_sensor_data}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_EDIT_CHECK_INS}>
                        <span className="text-base-content">{Strings.layout.menus.edit_check_ins}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_EDIT_SUPPORT_ADMIN_LIST}>
                        <span className="text-base-content">{Strings.layout.menus.edit_support_admin_list}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_EDIT_STUDENT_LIST}>
                        <span className="text-base-content">{Strings.layout.menus.edit_student_list}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_SEND_CHECK_IN_TO_STUDENT_LITBITS}>
                        <span className="text-base-content">{Strings.layout.menus.send_check_in_to_student_litbits}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_VIEW_OTP}>
                        <span className="text-base-content">{Strings.layout.menus.view_otp}</span>
                    </Link>
                </li>
                <li>
                    <Link exact="true" to={PATH_SETTINGS}>
                        <span className="text-base-content">{Strings.layout.menus.settings}</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
