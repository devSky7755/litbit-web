import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useAuthState } from "react-firebase-hooks/auth";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { PageHeading, Alert } from '../../components';
import { Strings } from '../../const';
import { firebaseAuth } from "../../services";
import { PATH_DASHBOARD } from '../../routes';

const schema = yup.object().shape({
  email: yup.string().label('Email').required().email(),
  password: yup.string().label('Password').required(),
})

export const ScreenLogin = () => {
  const [message, setMessage] = useState('')
  const [user, loading, error] = useAuthState(firebaseAuth.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate(PATH_DASHBOARD);
  }, [user, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      await firebaseAuth.logInWithEmailAndPassword(email, password)
    } catch (error) {
      setMessage(Strings.firebase.errors?.[error.code] || Strings.api)
    }
  }

  return (
    <>
      <PageHeading title={Strings.login.title} />
      <div className="flex flex-col justify-center py-12 bg-base sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center">
            {Strings.login.subtitle}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 shadow bg-base-200 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {message && <Alert type="error" message={message} />}

              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">{Strings.login.email}</span>
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`input input-bordered ${errors.email && 'input-error'
                    }`}
                />
                {errors.email && (
                  <span className="mt-1 text-xs text-error">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">{Strings.login.password}</span>
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className={`input input-bordered ${errors.password && 'input-error'
                    }`}
                />
                {errors.password && (
                  <span className="mt-1 text-xs text-error">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    {...register('rememberMe')}
                    className="w-4 h-4 text-base border-gray-300 rounded focus:ring-base"
                  />
                  <label htmlFor="rememberMe" className="block ml-2 text-sm">
                    {Strings.login.rememberMe}
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium hover:text-accent-content link"
                  >
                    {Strings.login.forgotPassword}
                  </a>
                </div>
              </div>

              <div>
                <button type="submit" className="btn btn-primary btn-block">
                  {Strings.login.signIn}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
