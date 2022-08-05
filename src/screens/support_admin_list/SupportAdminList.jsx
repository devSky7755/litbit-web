import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { PencilIcon, XIcon } from '@heroicons/react/outline'

import { PageHeading } from '../../components'
import { BasicTable, RemoteTable, BasicModal, ConfirmModal } from '../../components'
import { Strings, SupportAdminsMockData } from '../../const'
import { PATH_DASHBOARD } from '../../routes';
import { AddNewSupportAdmin, AddSupportAdminComplete } from '.';

const columns = (clickedEditBtn, clickedRemoveBtn) => [
  {
    name: Strings.edit_support_admin_list.columns.last_name,
    selector: row => row.last_name,
    sortable: true
  },
  {
    name: Strings.edit_support_admin_list.columns.first_name,
    selector: row => row.first_name,
    sortable: true
  },
  {
    name: Strings.edit_support_admin_list.columns.photo,
    selector: row => row.photo,
  },
  {
    name: Strings.edit_support_admin_list.columns.finger_print,
    selector: row => row.finger_print,
  },
  {
    name: Strings.edit_support_admin_list.columns.email,
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

export const SupportAdminList = ({ }) => {
  const navigate = useNavigate();

  const showAddModalId = 'show-add-modal';
  const showEditModalId = 'show-edit-modal';
  const showRemoveConfirmModalId = 'show-remove-confirm-modal';
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isAddComplted, setIsAddComplted] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isShowRemoveConfirmModal, setIsShowRemoveConfirmModal] = useState(false);
  const [removingAdmin, setRemovingAdmin] = useState(null);
  const [message, setMessage] = useState('')

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
    setIsAddComplted(true)
  }
  useEffect(() => {
    if (!isShowAddModal) {
      setMessage('')
      setIsAddComplted(false)
    }
  }, [isShowAddModal])

  const clickedEditBtn = (id) => {
    if (!isShowEditModal) {
      const admin = SupportAdminsMockData.admins.find((s) => s.id === id)
      setEditingAdmin(admin)
    }
    setIsShowEditModal(!isShowEditModal);
  }
  useEffect(() => {
    if (!isShowEditModal) {
      setEditingAdmin(null);
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
      const admin = SupportAdminsMockData.admins.find((s) => s.id === id)
      setRemovingAdmin(admin)
    }
    setIsShowRemoveConfirmModal(!isShowRemoveConfirmModal);
  }
  useEffect(() => {
    if (!isShowRemoveConfirmModal) {
      setRemovingAdmin(null);
    }
  }, [isShowRemoveConfirmModal])
  const removeHandler = (e) => {
    setIsShowRemoveConfirmModal(!isShowRemoveConfirmModal);
    console.log(removingAdmin)
  }

  const gotoDashboard = () => {
    navigate(PATH_DASHBOARD);
  }

  return (
    <>
      <PageHeading title={Strings.edit_support_admin_list.title} />
      <div className="flex flex-col justify-center py-12 bg-base sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto w-full">
          <div className="px-4 py-8 shadow bg-base-200 md:px-10">
            <div className="flex flex-wrap">
              <div className="flex-none mr-2 font-bold">
                {`${Strings.edit_support_admin_list.number_of_admins} :  `}
              </div>
              <div className="flex-none">
                {SupportAdminsMockData.admins.length}
              </div>
            </div>
            <div className="flex justify-end flex-wrap">
              <BasicModal
                headerTitle={Strings.edit_support_admin_list.add_admin_modal_header}
                visible={isShowAddModal}
                modalId={showAddModalId}
                onPress={clickedAddBtn}
                btnLabel={Strings.edit_support_admin_list.add_admin}
                btnClass="btn btn-sm btn-outline btn-primary rounded-full m-2"
              >
                {!isAddComplted && (
                  <AddNewSupportAdmin message={message} onSubmit={addHandler} onCancel={clickedAddBtn} />
                ) || (
                    <AddSupportAdminComplete />
                  )}
              </BasicModal>
              <button className="btn btn-sm btn-outline btn-warning rounded-full m-2" onClick={gotoDashboard}>{Strings.edit_support_admin_list.return_to_main_menu}</button>
            </div>
            <BasicTable
              columns={columns(clickedEditBtn, clickedRemoveBtn)}
              isLoading={false}
              data={SupportAdminsMockData.admins}
              isSuccess={true}
              pageSize={pageSize}
            />
            <BasicModal
              headerTitle={Strings.edit_support_admin_list.edit_admin_modal_header}
              visible={isShowEditModal}
              hideControlBtn={true}
              modalId={showEditModalId}
              onPress={clickedEditBtn}
              btnClass="btn btn-sm btn-outline btn-primary rounded-full m-2"
            >
              <AddNewSupportAdmin admin={editingAdmin} message={message} onSubmit={editHandler} onCancel={clickedEditBtn} />
            </BasicModal>
            <ConfirmModal
              text={Strings.edit_support_admin_list.remove_admin_confirm_text}
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
      </div>
    </>
  )
}
