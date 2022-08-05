import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Alert } from '../../components'
import { Strings } from '../../const'

const schema = yup.object().shape({
  first_name: yup.string().label(Strings.edit_support_admin_list.add_admin_form.first_name).required(),
  last_name: yup.string().label(Strings.edit_support_admin_list.add_admin_form.last_name).required(),
  email: yup.string().label(Strings.edit_support_admin_list.add_admin_form.email).nullable(),
})

export const AddNewSupportAdmin = ({
  message,
  admin = null,
  onSubmit,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (admin) {
      reset(admin)
    }
  }, [admin])

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="px-4 py-8 shadow bg-base-200 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {message && <Alert type="error" message={message} />}
            <div className='grid grid-cols-2 gap-2'>
              <div className="form-control">
                <label className="label" htmlFor="first_name">
                  <span className="label-text">{Strings.edit_support_admin_list.add_admin_form.first_name} *</span>
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  className={`input input-bordered ${errors.first_name && 'input-error'
                    }`}
                  {...register('first_name')}
                />
                {errors.first_name && (
                  <span className="mt-1 text-xs text-error">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label" htmlFor="last_name">
                  <span className="label-text">{Strings.edit_support_admin_list.add_admin_form.last_name} *</span>
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  className={`input input-bordered ${errors.last_name && 'input-error'
                    }`}
                  {...register('last_name')}
                />
                {errors.last_name && (
                  <span className="mt-1 text-xs text-error">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">{Strings.edit_support_admin_list.add_admin_form.email}</span>
              </label>
              <input
                type="email"
                autoComplete="off"
                className={`input input-bordered ${errors.email && 'input-error'
                  }`}
                {...register('email')}
              />
              {errors.email && (
                <span className="mt-1 text-xs text-error">
                  {errors.email.message}
                </span>
              )}
            </div>

            {!admin && (
              <p className='mt-5 text-left'>
                {Strings.edit_support_admin_list.add_admin_form.alert}
              </p>
            )}

            <div className='grid grid-cols-2 gap-2'>
              <button type="submit" className="btn btn-primary btn-block">
                {Strings.edit_support_admin_list.add_admin_form.submit}
              </button>
              <button className="btn btn-error btn-block" onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}>
                {Strings.edit_support_admin_list.add_admin_form.cancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
