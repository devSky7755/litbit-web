import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';

import { PencilIcon, XIcon } from '@heroicons/react/outline'

import { firebaseStudent } from "../../services";
import { BasicTable, RemoteTable, BasicModal, ConfirmModal } from '../../components'
import { Strings, StudentsMockData } from '../../const'
import { AddNewStudent } from '.';


const columns = (clickedEditBtn, clickedRemoveBtn) => [
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
        <button className="btn btn-outline btn-info btn-sm" onClick={() => clickedEditBtn(row.id)}>
          <PencilIcon className="w-4 h-4" aria-hidden="true" />
        </button>
        <button className="btn btn-outline btn-error btn-sm" onClick={() => clickedRemoveBtn(row.id)}>
          <XIcon className="w-4 h-4" aria-hidden="true" />
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

export const StudentsPreRegister = ({ user, onComplete }) => {
  const [queryPage, setQueryPage] = useState(initialQueryPage);
  const [curPage, setCurPage] = useState(0);

  const showAddModalId = 'show-add-modal';
  const showEditModalId = 'show-edit-modal';
  const showRemoveConfirmModalId = 'show-remove-confirm-modal';
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isShowRemoveConfirmModal, setIsShowRemoveConfirmModal] = useState(false);
  const [removingStudent, setRemovingStudent] = useState(null);
  const [message, setMessage] = useState('')

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

  const clickedAddBtn = () => {
    setIsShowAddModal(!isShowAddModal);
  }
  useEffect(() => {
    if (!isShowAddModal) setMessage('');
  }, [isShowAddModal])
  const addHandler = (data, e) => {
    e.preventDefault();
    setMessage(Strings.alert.featureNotAvailable)
    // TODO
    // API Integration
    console.log(data);
  }
  const completePreRegisterHandler = () => {
    onComplete();
  }
  const cancelAndDiscardHandler = () => { }

  const clickedEditBtn = (id) => {
    if (!isShowEditModal) {
      const student = StudentsMockData.students.find((s) => s.id === id)
      setEditingStudent(student)
    }
    setIsShowEditModal(!isShowEditModal);
  }
  useEffect(() => {
    if (!isShowEditModal) {
      setEditingStudent(null);
      setMessage('')
    }
  }, [isShowEditModal])
  const editHandler = (data, e) => {
    e.preventDefault();
    setMessage(Strings.alert.featureNotAvailable)
    // TODO
    // API Integration
    console.log(data);
  }

  const clickedRemoveBtn = (id) => {
    if (!isShowRemoveConfirmModal) {
      const student = StudentsMockData.students.find((s) => s.id === id)
      setRemovingStudent(student)
    }
    setIsShowRemoveConfirmModal(!isShowRemoveConfirmModal);
  }
  useEffect(() => {
    if (!isShowRemoveConfirmModal) {
      setRemovingStudent(null);
    }
  }, [isShowRemoveConfirmModal])
  const removeHandler = (e) => {
    setIsShowRemoveConfirmModal(!isShowRemoveConfirmModal);
    console.log(removingStudent)
  }

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
              headerTitle={Strings.join.students_pre_register.add_student_modal_header}
              visible={isShowAddModal}
              modalId={showAddModalId}
              onPress={clickedAddBtn}
              btnLabel={Strings.join.students_pre_register.add_student}
              btnClass="btn btn-sm btn-outline btn-primary rounded-full m-2"
            >
              <AddNewStudent message={message} onSubmit={addHandler} onCancel={clickedAddBtn} />
            </BasicModal>
            <button className="btn btn-sm btn-outline btn-success rounded-full m-2" onClick={completePreRegisterHandler}>{Strings.join.students_pre_register.complete_pre_registration}</button>
            <button className="btn btn-sm btn-outline btn-warning rounded-full m-2" onClick={cancelAndDiscardHandler}>{Strings.join.students_pre_register.cancel_and_discard_changes}</button>
          </div>
          {/* <RemoteTable
            columns={columns(clickedEditBtn, clickedRemoveBtn)}
            isLoading={isLoading}
            error={error}
            data={data}
            isSuccess={isSuccess}
            pageSize={pageSize}
            handlePageChange={handlePageChange}
          /> */}
          <BasicTable
            columns={columns(clickedEditBtn, clickedRemoveBtn)}
            isLoading={false}
            data={StudentsMockData.students}
            isSuccess={true}
            pageSize={pageSize}
          />
          <BasicModal
            headerTitle={Strings.join.students_pre_register.edit_student_modal_header}
            visible={isShowEditModal}
            hideControlBtn={true}
            modalId={showEditModalId}
            onPress={clickedEditBtn}
            btnClass="btn btn-sm btn-outline btn-primary rounded-full m-2"
          >
            <AddNewStudent student={editingStudent} message={message} onSubmit={editHandler} onCancel={clickedEditBtn} />
          </BasicModal>
          <ConfirmModal
            text={Strings.join.students_pre_register.remove_student_confirm_text}
            visible={isShowRemoveConfirmModal}
            hideControlBtn={true}
            modalId={showRemoveConfirmModalId}
            onConfirm={removeHandler}
            onPress={clickedRemoveBtn}
            btnClass="btn btn-sm btn-outline btn-primary rounded-full m-2"
          >
          </ConfirmModal>
        </div>
      </div>
    </>
  )
}
