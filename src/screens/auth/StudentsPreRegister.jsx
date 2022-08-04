import React, { useState } from 'react'
import { useQuery } from 'react-query';

import { PencilIcon, XIcon } from '@heroicons/react/outline'

import { firebaseStudent } from "../../services";
import { BasicTable, RemoteTable, BasicModal } from '../../components'
import { Strings, StudentsMockData } from '../../const'


const columns = (editHandler, removeHandler) => [
  {
    name: Strings.join.students_pre_register.columns.last_name,
    selector: row => row.last_name,
    sortable: true
  },
  {
    name: Strings.join.students_pre_register.columns.first_name,
    selector: row => row.first_name,
    sortable: true
  },
  {
    name: Strings.join.students_pre_register.columns.photo,
    selector: row => row.photo,
  },
  {
    name: Strings.join.students_pre_register.columns.finger_print,
    selector: row => row.finger_print,
  },
  {
    name: Strings.join.students_pre_register.columns.email,
    selector: row => row.email,
    sortable: true
  },
  {
    name: '',
    cell: row => (
      <div className="btn-group">
        <button className="btn btn-outline btn-info btn-sm">
          <PencilIcon className="w-4 h-4" aria-hidden="true" onClick={() => editHandler(row.id)} />
        </button>
        <button className="btn btn-outline btn-error btn-sm">
          <XIcon className="w-4 h-4" aria-hidden="true" onClick={() => removeHandler(row.id)} />
        </button>
      </div>
    ),
  }
];

const pageSize = 10;

const initialQueryPage = {
  limit: pageSize,
  op: "first",
  benchmark: null
}

export const StudentsPreRegister = ({ user }) => {
  const [queryPage, setQueryPage] = useState(initialQueryPage);
  const [curPage, setCurPage] = useState(0);

  const showAddModalId = 'show-add-modal';
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const { isLoading, error, data, isSuccess } = useQuery(
    ['students', queryPage],
    () => {
      return user ? firebaseStudent.getStudents(user.uid, queryPage) : {};
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      enabled: !!user?.uid
    }
  );


  const handlePageChange = page => {
    const totalPageCount = Math.ceil(data.totalCount / pageSize);
    if (page === 1) {
      setQueryPage(initialQueryPage)
    } else if (page === totalPageCount) {
      setQueryPage({
        limit: (data.totalCount % pageSize) || pageSize,
        op: "last",
        benchmark: null
      })
    } else {
      if (page > curPage) {
        setQueryPage({
          limit: pageSize,
          op: 'startAfter',
          benchmark: data.docSnaps.docs[data.docSnaps.size - 1]
        })
      } else {
        setQueryPage({
          limit: pageSize,
          op: 'endBefore',
          benchmark: data.docSnaps.docs[0]
        })
      }
    }
    setCurPage(page);
  };

  const clickedAddModalBtn = () => {
    setIsShowAddModal(!isShowAddModal);
  }
  const addHandler = () => {
  }

  const editHandler = (id) => { console.log(id) }
  const removeHandler = (id) => { }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center">
          {Strings.join.students_pre_register.title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto w-full">
        <div className="px-4 py-8 shadow bg-base-200 md:px-10">
          <div className="flex flex-wrap">
            <div className="flex-none mr-2 font-bold">
              {`${Strings.join.students_pre_register.number_of_students} :  `}
            </div>
            <div className="flex-none">
              {StudentsMockData.students.length}
            </div>
          </div>
          <div className="flex justify-end flex-wrap">
            <BasicModal
              visible={isShowAddModal}
              modalId={showAddModalId}
              onPress={clickedAddModalBtn}
              btnLabel={Strings.join.students_pre_register.add_student}
              btnClass="btn btn-sm btn-outline btn-primary rounded-full m-2"
            >
              <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
              <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            </BasicModal>
            <button className="btn btn-sm btn-outline btn-success rounded-full m-2">{Strings.join.students_pre_register.complete_pre_registration}</button>
            <button className="btn btn-sm btn-outline btn-warning rounded-full m-2">{Strings.join.students_pre_register.cancel_and_discard_changes}</button>
          </div>
          {/* <RemoteTable
            columns={columns(editHandler, removeHandler)}
            isLoading={isLoading}
            error={error}
            data={data}
            isSuccess={isSuccess}
            pageSize={pageSize}
            handlePageChange={handlePageChange}
          /> */}
          <BasicTable
            columns={columns(editHandler, removeHandler)}
            isLoading={false}
            data={StudentsMockData.students}
            isSuccess={true}
            pageSize={pageSize}
          />
        </div>
      </div>
    </>
  )
}
