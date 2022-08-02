import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Alert } from '../../components'
import { Strings } from '../../const'
import { PATH_LOGIN } from '../../routes'

const schema = yup.object().shape({
  s_hub_id: yup.string().label(Strings.join.personal_details.s_hub_id).required(),
  first_name: yup.string().label(Strings.join.personal_details.first_name).required(),
  last_name: yup.string().label(Strings.join.personal_details.last_name).required(),
  nces_district_number: yup.string().label(Strings.join.personal_details.nces_district_number).required(),
  school_name: yup.string().label(Strings.join.personal_details.school_name).required(),
  grade_level: yup.string().label(Strings.join.personal_details.grade_level).required(),
  choose_a_name_for_your_class: yup.string().label(Strings.join.personal_details.choose_a_name_for_your_class).required(),
})

export const PersonalDetails = ({ message, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center">
          {Strings.join.personal_details.title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 shadow bg-base-200 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {message && <Alert type="error" message={message} />}

            <div className="form-control">
              <label className="label" htmlFor="s_hub_id">
                <span className="label-text">{Strings.join.personal_details.s_hub_id}</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className={`input input-bordered ${errors.s_hub_id && 'input-error'
                  }`}
                {...register('s_hub_id')}
              />
              {errors.s_hub_id && (
                <span className="mt-1 text-xs text-error">
                  {errors.s_hub_id.message}
                </span>
              )}
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className="form-control">
                <label className="label" htmlFor="first_name">
                  <span className="label-text">{Strings.join.personal_details.first_name}</span>
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
                  <span className="label-text">{Strings.join.personal_details.last_name}</span>
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
              <label className="label" htmlFor="nces_district_number">
                <span className="label-text">{Strings.join.personal_details.nces_district_number}</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className={`input input-bordered ${errors.nces_district_number && 'input-error'
                  }`}
                {...register('nces_district_number')}
              />
              {errors.nces_district_number && (
                <span className="mt-1 text-xs text-error">
                  {errors.nces_district_number.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="school_name">
                <span className="label-text">{Strings.join.personal_details.school_name}</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className={`input input-bordered ${errors.school_name && 'input-error'
                  }`}
                {...register('school_name')}
              />
              {errors.school_name && (
                <span className="mt-1 text-xs text-error">
                  {errors.school_name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="grade_level">
                <span className="label-text">{Strings.join.personal_details.grade_level}</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className={`input input-bordered ${errors.grade_level && 'input-error'
                  }`}
                {...register('grade_level')}
              />
              {errors.grade_level && (
                <span className="mt-1 text-xs text-error">
                  {errors.grade_level.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="choose_a_name_for_your_class">
                <span className="label-text">{Strings.join.personal_details.choose_a_name_for_your_class}</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className={`input input-bordered ${errors.choose_a_name_for_your_class && 'input-error'
                  }`}
                {...register('choose_a_name_for_your_class')}
              />
              {errors.choose_a_name_for_your_class && (
                <span className="mt-1 text-xs text-error">
                  {errors.choose_a_name_for_your_class.message}
                </span>
              )}
            </div>

            <div>
              <button type="submit" className="btn btn-primary btn-block">
                {Strings.join.personal_details.submit}
              </button>
            </div>
          </form>

          <div className="flex justify-end mt-4 text-sm">
            {Strings.join.haveAccount + ' '}
            <Link className="ml-2 link" exact="true" to={PATH_LOGIN}>
              {Strings.join.goToLogin}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
