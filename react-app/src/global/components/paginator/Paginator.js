import React from "react";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

export default function Paginator({dataCount = 0, activePage = 1, handlePageChange, hasNextPage}) {
    return (
        <Pagination>
            <PaginationItem onClick={() => handlePageChange(1)} disabled={activePage === 1}>
                <PaginationLink first/>
            </PaginationItem>
            <PaginationItem onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1}>
                <PaginationLink previous/>
            </PaginationItem>
            <PaginationItem disabled>
                <PaginationLink>
                    {activePage}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={() => handlePageChange(activePage + 1)} disabled={!hasNextPage}>
                <PaginationLink next/>
            </PaginationItem>
            <PaginationItem onClick={() => handlePageChange(Math.ceil(dataCount / 10))} disabled={!hasNextPage}>
                <PaginationLink last/>
            </PaginationItem>
        </Pagination>
    )
}
