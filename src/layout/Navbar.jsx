import React, { useEffect } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { LoginIcon, LogoutIcon, MenuIcon } from '@heroicons/react/outline'
import { UserCircleIcon } from '@heroicons/react/solid'

import './navbar.css'
import { Strings } from '../const'
import { PATH_HOME, PATH_JOIN, PATH_LOGIN, PATH_PROFILE } from '../routes'
import { firebaseAuth, firebaseUser } from "../services";

function Navbar() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(firebaseAuth.auth);

  const logout = async () => {
    try {
      await firebaseAuth.logout();
      navigate(PATH_LOGIN)
    } catch (error) {
    }
  }

  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div className="navbar-start px-2 mx-2">
        <Link exact="true" to={PATH_HOME} className="inline-block text-lg font-bold text-primary">
          <span className="text-base-content">{Strings.global.app}</span>
        </Link>

        <label htmlFor="side-bar" className="ml-2 btn btn-sm btn-ghost drawer-button lg:hidden">
          <MenuIcon className="w-5 h-5" aria-hidden="true" />
        </label>
      </div>
      {/* <div className="navbar-center px-2 mx-2 hidden md:flex">
        <div className="flex items-stretch space-x-2">
          <NavLink to={PATH_HOME} className="btn btn-ghost btn-sm" exact="true">
            {Strings.layout.navbar.home}
          </NavLink>
        </div>
      </div> */}
      <div className="navbar-end">
        <div className="flex space-x-4">
          {!user && (
            <>
              <Link
                exact="true"
                className="btn btn-sm btn-secondary w-28 rounded-full"
                to={PATH_LOGIN}
              >
                <LoginIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
                {Strings.layout.navbar.login}
              </Link>
              <Link exact="true" className="btn btn-sm btn-primary w-24 rounded-full" to={PATH_JOIN}>
                <UserCircleIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
                {Strings.layout.navbar.join}
              </Link>
            </>
          ) || (
              <>
                <button
                  className="btn btn-sm btn-secondary w-28 rounded-full"
                  onClick={logout}
                >
                  <LogoutIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
                  {Strings.layout.navbar.logout}
                </button>
                <Link exact="true" className="btn btn-sm btn-primary w-36 rounded-full" to={PATH_PROFILE}>
                  <UserCircleIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
                  {Strings.layout.navbar.update_profile}
                </Link>
              </>
            )}
        </div>
      </div>
    </nav >
  )
}

export default Navbar
