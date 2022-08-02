import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';

import { firebaseStudent } from "../../services";
import { Alert } from '../../components'
import { Strings } from '../../const'
import { PATH_LOGIN } from '../../routes'


const columns = [
];

const initialState = {
  queryPageIndex: 0,
  queryPageSize: 10,
  totalCount: null,
};

const PAGE_CHANGED = 'PAGE_CHANGED';
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export const StudentsPreRegister = ({ user }) => {
  const [{ queryPageIndex, queryPageSize, totalCount }, dispatch] =
    React.useReducer(reducer, initialState);

  const { isLoading, error, data, isSuccess } = useQuery(
    ['students', queryPageIndex, queryPageSize],
    () => firebaseStudent.getStudents(user.uid, { queryPageIndex, queryPageSize }),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center">
          {Strings.join.students_pre_register.title}
        </h2>
      </div>

      <div className="mt-8 md:mx-auto md:w-full md:max-w-lg">
        <div className="px-4 py-8 shadow bg-base-200 md:rounded-lg md:px-10">
          {isSuccess ? (
            <>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
