import React from "react";
import { ReactNode, useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
interface StateTable {
  datas: [];
  dataFiltered: [];
  currentPage: number;
  itemsPerPage: number;
  currentItem: any[];
  totalPages: number;
  typesSearch: string[];
}
export interface PropsChildren {
  callback: Function;
  data?: [] | null;
}

const CURRENT_PAGE = 1;
const ITEMS_PER_PAGE = 10;

export default function Table(props: any) {
  const [table, setTable] = useState<StateTable | null>(null);
  const handlePageChange = (pageNumber: number) => {
    let prevState = table as StateTable;
    const startIndex = (pageNumber - 1) * prevState.itemsPerPage;
    const endIndex = startIndex + prevState.itemsPerPage;
    let newState = {
      datas: prevState.datas,
      dataFiltered: prevState.dataFiltered,
      currentPage: pageNumber,
      itemsPerPage: ITEMS_PER_PAGE,
      currentItem: prevState.dataFiltered.slice(startIndex, endIndex),
      totalPages: Math.ceil(prevState.datas.length / prevState.itemsPerPage),
      typesSearch: prevState.typesSearch,
    } as StateTable;

    setTable(newState);
  };

  useEffect(() => {});

  const handleUpdateData = (data: [], typesSearch: string[]) => {
    const startIndex = (CURRENT_PAGE - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    let newState: StateTable = {
      datas: data,
      dataFiltered: data,
      currentPage: CURRENT_PAGE,
      itemsPerPage: ITEMS_PER_PAGE,
      currentItem: data.slice(startIndex, endIndex),
      totalPages: Math.ceil(data.length / ITEMS_PER_PAGE),
      typesSearch,
    };
    setTable(newState);
  };

  const handleSearch = (dataFiltered: []) => {
    let prevState = table as StateTable;
    const startIndex = (CURRENT_PAGE - 1) * prevState.itemsPerPage;
    const endIndex = startIndex + prevState.itemsPerPage;
    let newState: StateTable = {
      datas: prevState.datas,
      dataFiltered: dataFiltered,
      currentPage: CURRENT_PAGE,
      itemsPerPage: prevState.itemsPerPage,
      currentItem: dataFiltered.slice(startIndex, endIndex),
      totalPages: Math.ceil(dataFiltered.length / prevState.itemsPerPage),
      typesSearch: prevState.typesSearch,
    };

    // console.log(" itemsPerPage: ", prevState.itemsPerPage);
    setTable({ ...newState });
  };
  return (
    <>
      <h1 className="text-capitalize h3 mb-3 text-gray-800">Users</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
            {/* <a
          href="#"
          className="btn  btn-success"
          data-toggle="modal"
          data-target="#accountCreateModal"
        >
          Add
        </a> */}
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="dataTables_length" id="dataTable_length">
                    <label>
                      Show{" "}
                      <select
                        name="dataTable_length"
                        aria-controls="dataTable"
                        className="custom-select custom-select-sm form-control form-control-sm"
                        onChange={(e) => {
                          let prevState = table as StateTable;
                          if (!Number.isNaN(e.currentTarget.value)) {
                            let itemsPerPage = e.currentTarget
                              .value as unknown as number;
                            const startIndex =
                              (prevState.currentPage - 1) * itemsPerPage;
                            const endIndex = startIndex + itemsPerPage;
                            let newState: StateTable = {
                              dataFiltered: prevState.dataFiltered,
                              datas: prevState.datas,
                              currentPage: CURRENT_PAGE,
                              itemsPerPage: itemsPerPage,
                              currentItem: prevState.dataFiltered.slice(
                                startIndex,
                                endIndex
                              ),
                              totalPages: Math.ceil(
                                prevState.datas.length / itemsPerPage
                              ),
                              typesSearch: prevState.typesSearch,
                            };
                            setTable(newState);
                          }
                        }}
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>{" "}
                      entries
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <Search
                    datas={table?.datas as []}
                    callback={handleSearch}
                    typesSearch={table?.typesSearch}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  {React.cloneElement(props.children, {
                    data: table?.currentItem,
                    callback: handleUpdateData,
                  })}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-5">
                  <div
                    className="dataTables_info"
                    id="dataTable_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing{" "}
                    {((table as StateTable)?.currentPage - 1) *
                      (table as StateTable)?.itemsPerPage +
                      1}{" "}
                    to{" "}
                    {(table as StateTable)?.itemsPerPage *
                      (table as StateTable)?.currentPage >
                    (table as StateTable)?.dataFiltered?.length
                      ? (table as StateTable)?.dataFiltered?.length
                      : (table as StateTable)?.currentItem?.length}{" "}
                    of {table?.dataFiltered?.length} entries
                  </div>
                </div>
                <div className="col-sm-12 col-md-7">
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="dataTable_paginate"
                  >
                    <Pagination
                      currentPage={table ? table.currentPage : 1}
                      totalPages={table ? table.totalPages : 1}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}