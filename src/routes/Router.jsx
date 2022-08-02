import React from "react";
import { Route, Routes } from 'react-router-dom'

import NotFound from '@/screens/NotFound'
import {
  Home,
  ScreenLogin,
  ScreenJoin,
} from '../screens'
import { PATH_HOME, PATH_JOIN, PATH_LOGIN } from "./paths";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path={PATH_HOME} element={<Home />} />
        <Route path={PATH_LOGIN} element={<ScreenLogin />} />
        <Route path={PATH_JOIN} element={<ScreenJoin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
