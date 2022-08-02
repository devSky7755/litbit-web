import React from "react";
import { Route, Switch } from 'react-router-dom'

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
      <Switch>
        <Route exact path={PATH_HOME}>
          <Home />
        </Route>
        <Route path={PATH_LOGIN}>
          <ScreenLogin />
        </Route>
        <Route path={PATH_JOIN}>
          <ScreenJoin />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  )
}
