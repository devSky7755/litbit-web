import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';

createTheme('solarized', {
    text: {
        primary: '#ffffff',
        secondary: '#ffffff',
    },
    background: {
        default: 'inherit',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#513448',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

const customStyles = {
    headCells: {
        style: {
            fontSize: '15px',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            borderRadius: '25px',
            outline: '1px solid #FFFFFF',
        },
    },
};

export const RemoteTable = ({
    columns,
    isLoading,
    error,
    data,
    isSuccess,
    pageSize = 10,
    handlePageChange
}) => {
    return (
        <>
            <DataTable
                columns={columns}
                data={data?.docs}
                progressPending={isLoading}
                pagination
                paginationPerPage={pageSize}
                paginationRowsPerPageOptions={[pageSize]}
                paginationTotalRows={data?.totalCount}
                paginationServer
                theme="solarized"
                customStyles={customStyles}
                onChangePage={handlePageChange}
            />
        </>
    )
}
