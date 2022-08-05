import React from 'react'

export const ConfirmModal = ({
    modalId = "confirm-modal",
    hideControlBtn = false,
    text,
    btnLabel,
    btnClass,
    visible,
    onConfirm,
    onPress,
    disableClose = false,
}) => {
    return (
        <>
            {!hideControlBtn && (<label htmlFor={modalId} className={btnClass}>{btnLabel}</label>)}
            <input type="checkbox" id={modalId} className="modal-toggle" checked={visible} onChange={onPress} />

            <label htmlFor={!disableClose && modalId} className="modal absolute cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg mb-4">{text}</h3>
                    <div className='grid grid-cols-2 gap-2'>
                        <button className="btn btn-sm btn-error btn-block" onClick={onConfirm}>
                            Yes
                        </button>
                        <button className="btn btn-sm btn-primary btn-block" onClick={onPress}>
                            No
                        </button>
                    </div>
                </label>
            </label>
        </>
    )
}
