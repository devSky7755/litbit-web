import React, { useState } from 'react'

export const BasicModal = ({ modalId = "basicModal", btnLabel, btnClass, visible, onPress, disableClose = false, children }) => {

    return (
        <>
            <label htmlFor={modalId} className={btnClass}>{btnLabel}</label>
            <input type="checkbox" id={modalId} className="modal-toggle" checked={visible} onChange={onPress} />

            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {children}
                    <div className="modal-action">
                        <label htmlFor={modalId} className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </>
    )
}
