import React, { useState } from 'react'

export const BasicModal = ({
    modalId = "basic-modal",
    hideControlBtn = false,
    headerTitle,
    btnLabel,
    btnClass,
    visible,
    onPress,
    disableClose = false,
    children
}) => {
    return (
        <>
            {!hideControlBtn && (<label htmlFor={modalId} className={btnClass}>{btnLabel}</label>)}
            <input type="checkbox" id={modalId} className="modal-toggle" checked={visible} onChange={onPress} />

            <label htmlFor={!disableClose && modalId} className="modal cursor-pointer absolute">
                <label className="modal-box sm:max-w-xl relative" htmlFor="">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {headerTitle && (<h3 className="font-bold text-lg">{headerTitle}</h3>)}
                    {children}
                </label>
            </label>
        </>
    )
}
