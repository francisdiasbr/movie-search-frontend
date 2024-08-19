'use client';

import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchCuratory } from '@/lib/features/movies/curatorySlice';
import Table from '../../ui/Table';

export default function Page() {

    const dispatch = useAppDispatch();
    const { entries, total_documents } = useAppSelector((state) => state.moviesCuratory);

    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        const params = {
            filters: {},
            sorters: entries.primaryTitle,
            page: pageIndex + 1,
            pageSize
        }
        dispatch(fetchCuratory(params));
    }, [pageIndex, pageSize]);

    const columnData = [
        { key: 'actions', label: 'Actions', isAction: true, width: '15%' },
        { key: 'tconst', label: 'IMDb code', width: '15%' },
        { key: 'primaryTitle', label: 'Title', width: '50%' },
        { key: 'startYear', label: 'Year', width: '20%' },
    ];

    return (
        <>
            <p>Movies Page</p>
            <Table
                columns={columnData}
                entries={entries}
                totalDocuments={total_documents}
                pageSize={pageSize}
                pageIndex={pageIndex}
                onPageSizeChange={setPageSize}
                onPageChange={setPageIndex}
            />
        </>
    )
}