import { useEffect, useState } from "react";
import { LoadingGif } from "../components/Loading/Loading";
import Pagination from "../components/Pagination/Pagination";
import { getUsers } from "../services/user";

interface Table {
  datas: [];
  currentPage: number;
  itemsPerPage: number;
  currentItem: [];
  totalPages: number;
}
const CURRENT_PAGE = 1;
const ITEMS_PER_PAGE = 10;
export default function Users() {
  const [table, setTable] = useState<Table | null>(null);

  const handlePageChange = (pageNumber: number) => {
    let prevState = table as Table;
    const startIndex = (pageNumber - 1) * prevState.itemsPerPage;
    const endIndex = startIndex + prevState.itemsPerPage;
    let newState = {
      datas: prevState.datas,
      currentPage: pageNumber,
      itemsPerPage: ITEMS_PER_PAGE,
      currentItem: prevState.datas.slice(startIndex, endIndex),
      totalPages: Math.ceil(prevState.datas.length / prevState.itemsPerPage),
    } as Table;

    setTable(newState);
  };

  // // Tính toán dữ liệu hiển thị trên trang hiện tại, ví dụ:
  const renderUsers = () => {
    return table?.currentItem.map((data: any, index) => {
      return (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.email}</td>
          <td>{data.name}</td>
          <td>{new Date(data.createdAt).toLocaleString()}</td>
          <td>{new Date(data.modifiedAt).toLocaleString()}</td>
          <td>
            {/* <a {role != "ROLE_ANONYMOUS" ? "" : "hidden"} class="btn btn-primary btn-edit" href="/admin/edit/blog/{item.id}"><i class="fas fa-edit"></i></a>
          <button ${role != "ROLE_ANONYMOUS" ? "" : "hidden"} class="btn btn-danger btn-remove" data-id="${item.id}" ><i class="fas fa-trash"></i></button> */}
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    console.log(table);
  }, [table]);

  useEffect(() => {
    try {
      getUsers((res: any) => {
        const startIndex = (CURRENT_PAGE - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        let newState: Table = {
          datas: res.data,
          currentPage: CURRENT_PAGE,
          itemsPerPage: ITEMS_PER_PAGE,
          currentItem: res.data.slice(startIndex, endIndex),
          totalPages: Math.ceil(res.data.length / ITEMS_PER_PAGE),
        };
        setTable(newState);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
                  <div id="dataTable_filter" className="dataTables_filter">
                    <label>
                      Search Name:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder=""
                        aria-controls="dataTable"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table
                    style={{ width: "100%" }}
                    role={"grid"}
                    cellSpacing={0}
                    width={"100%"}
                    id="dataTable"
                    className="table-striped table table-bordered table-database dataTable"
                  >
                    {table ? (
                      <>
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>CreateAt</th>
                            <th>ModifiedAt</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{renderUsers()}</tbody>
                        <tfoot>
                          <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>CreateAt</th>
                            <th>ModifiedAt</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                      </>
                    ) : (
                      <tbody>
                        <tr>
                          <td className="text-center">
                            <LoadingGif />
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
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
                    Showing 1 to{" "}
                    {(table as Table)?.itemsPerPage *
                      (table as Table)?.currentPage >
                    (table as Table)?.datas.length
                      ? (table as Table)?.datas.length
                      : (table as Table)?.currentItem.length + 1}{" "}
                    of {table?.datas.length} entries
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
