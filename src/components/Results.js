import React from 'react';
import DataTable from 'react-data-table-component';

const Results = ({data, heandleContributors}) => {

    const columns = [
        {
            name: 'Action',
            selector: row => actions(row)
        },
        {
            name: 'Name',
            selector: row => row.name
        },
        {
            name: 'Description',
            selector: row => row.description
        },
        {
            name: 'Size',
            selector: row => row.size
        },
        {
            name: 'Language',
            selector: row => row.language
        }
    ];

    const actions = (row) => {
        return (
            <>
                <a title='View' className="action-icon" target="_blank" href={row.html_url}>
                    <i className="action-icon-ri ri-folder-open-line"></i>
                </a>
                <span title='Info' className="action-icon info" onClick={heandleContributors(row.name)}>
                    <i className="ri-information-line"></i>
                </span>
            </>
        );
    };

    return (
        <DataTable
            columns={columns}
            data={data}
            defaultSortFieldId={1}
            title="Github Organization Info"
            pagination
        />
    );
}

export default Results;