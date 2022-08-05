import React from "react";
import { Route, Routes } from 'react-router-dom'

import NotFound from '@/screens/NotFound'
import {
  Home,
  ScreenLogin,
  ScreenJoin,
  ScreenProfile,
} from '../screens'
import { PATH_HOME, PATH_JOIN, PATH_LOGIN, PATH_PROFILE } from "./paths";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path={PATH_HOME} element={<Home />} />
        <Route path={PATH_LOGIN} element={<ScreenLogin />} />
        <Route path={PATH_JOIN} element={<ScreenJoin />} />
        <Route path={PATH_PROFILE} element={<ScreenProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
