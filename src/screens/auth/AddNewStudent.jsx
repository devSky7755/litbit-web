import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Alert } from '../../components'
import { Strings } from '../../const'

const schema = yup.object().shape({
  first_name: yup.string().label(Strings.join.students_pre_register.add_student_form.first_name).required(),
  last_name: yup.string().label(Strings.join.students_pre_register.add_student_form.last_name).required(),
  email: yup.string().label(Strings.join.students_pre_register.add_student_form.email).nullable(),
})

export const AddNewStudent = ({
  message,
  student = null,
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
    if (student) {
      reset(student)
    }
  }, [student])

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 shadow bg-base-200 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {message && <Alert type="error" message={message} />}
            <div className='grid grid-cols-2 gap-2'>
              <div className="form-control">
                <label className="label" htmlFor="first_name">
                  <span className="label-text">{Strings.join.students_pre_register.add_student_form.first_name} *</span>
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
                  <span className="label-text">{Strings.join.students_pre_register.add_student_form.last_name} *</span>
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
                <span className="label-text">{Strings.join.students_pre_register.add_student_form.email}</span>
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
            <div className='grid grid-cols-2 gap-2'>
              <button type="submit" className="btn btn-primary btn-block">
                {Strings.join.students_pre_register.add_student_form.submit}
              </button>
              <button className="btn btn-error btn-block" onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}>
                {Strings.join.students_pre_register.add_student_form.cancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
