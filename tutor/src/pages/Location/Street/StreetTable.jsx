import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Icon from "../../../components/ui/Icon";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { API, formatDate1 } from "../../../host";
import Tooltip from "../../../components/ui/Tooltip";
import GlobalFilter from "../../../components/partials/Table/GlobalFilter";
import Card from "../../../components/ui/Card";
import StreetForm from "./StreetForm";
import { toast } from "react-toastify";

const COLUMNS = [
  {
    Header: "#",
    accessor: "rowIndex", 
  },
  {
    Header: "STREET",
    accessor: "street_name",
  },
  {
    Header: "CREATED BY",
    accessor: "createdby",
  },

  {
    Header: "ACTION",
    accessor: "actions", 
  },
];

const StreetTable = ({setIsModal,isModal,data,fetchData}) => {
 
  const handleDelete = async (street_name) => {
    try {
      const response = await axios.delete(
        `${API}/deletestreet?street_name=${street_name}`
      );
      //console.log(response);
      fetchData()
      toast.error('Deleted Successfully')
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Initial page settings
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  const range = 1;

  return (
    <>
     <Card>
      <div className="md:flex justify-between items-center mb-6">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          <select
            className="form-control py-2 w-max"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Page{" "}
            <span>
              {pageIndex + 1} of {pageOptions.length}
            </span>
          </span>
        </div>
        <div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  <th className=" table-th text-center">#</th>
                  <th className=" table-th text-center">Street</th>
                  <th className=" table-th text-center">Created by</th>
                  <th className=" table-th text-center">Date</th>
                  <th className=" table-th text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.original._id}>
                      <td className="table-td text-center">{row.original.rowIndex}</td>
                      <td className="table-td text-center">{row.original.street_name}</td>
                      <td className="table-td text-center">{row.original.createdby}</td>
                      <td className="table-td text-center">{formatDate1(row.original.createdAt)}</td>
                      <td className="table-td">
                        <div className="d-flex justify-around rtl-space-x-reverse">
                    
                          <Tooltip
                            content="Delete"
                            placement="top"
                            arrow
                            animation="shift-away"
                            theme="danger"
                          >
                            <button
                              className="action-btn"
                              type="button"
                              onClick={() => handleDelete(row.original.street_name)}
                            >
                              <Icon icon="heroicons:trash" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse"></div>
        <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <Icon icon="heroicons:chevron-double-left-solid" />
            </button>
          </li>
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Prev
            </button>
          </li>
          {pageOptions.map((page, pageIdx) => {
            if (
              pageIdx === pageIndex ||
              (pageIdx >= pageIndex - range && pageIdx <= pageIndex + range)
            ) {
              return (
                <li key={pageIdx}>
                  <button
                    href="#"
                    aria-current="page"
                    className={`${
                      pageIdx === pageIndex
                        ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium"
                        : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal"
                    } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                    onClick={() => gotoPage(pageIdx)}
                  >
                    {page + 1}
                  </button>
                </li>
              );
            }
            return null;
          })}
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={` ${
                !canNextPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
          </li>
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={` ${
                !canNextPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Icon icon="heroicons:chevron-double-right-solid" />
            </button>
          </li>
        </ul>
      </div>
      </Card>
      {isModal && (
      <StreetForm setIsModal={setIsModal} fetchData={fetchData}/>
    )}
    </>
  );
};

export default StreetTable;
