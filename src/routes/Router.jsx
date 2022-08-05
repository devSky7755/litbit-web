import React from "react";
import { Route, Routes } from 'react-router-dom'

import NotFound from '@/screens/NotFound'
import {
  Home,
  ScreenLogin,
  ScreenJoin,
  ScreenProfile,
  Dashboard,
  SupportAdminList,
} from '../screens'
import {
  PATH_DASHBOARD,
  PATH_EDIT_SUPPORT_ADMIN_LIST,
  PATH_HOME,
  PATH_JOIN,
  PATH_LOGIN,
  PATH_PROFILE
} from "./paths";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path={PATH_HOME} element={<Home />} />
        <Route path={PATH_LOGIN} element={<ScreenLogin />} />
        <Route path={PATH_JOIN} element={<ScreenJoin />} />
        <Route path={PATH_PROFILE} element={<ScreenProfile />} />
        <Route path={PATH_DASHBOARD} element={<Dashboard />} />
        <Route path={PATH_EDIT_SUPPORT_ADMIN_LIST} element={<SupportAdminList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
