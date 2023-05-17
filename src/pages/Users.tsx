import { useEffect, useState } from "react";
import { LoadingGif } from "../components/Loading/Loading";
import { PropsChildren } from "../layouts/Table/Table";
import { ResponseData } from "../services/types";
import { getUsers } from "../services/user";

export default function Users(props: PropsChildren) {
  // // Tính toán dữ liệu hiển thị trên trang hiện tại, ví dụ:
  const renderUsers = () => {
    if (props.data?.length === 0) {
      return (
        <tr className="odd">
          <td valign="top" colSpan={7} className="dataTables_empty">
            No matching records found
          </td>
        </tr>
      );
    } else {
      return props.data?.map((data: any, index) => {
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
    }
  };

  useEffect(() => {
    try {
      getUsers((res: ResponseData) => {
        if (res.success) {
          props.callback(res.data as [], ["name", "email"]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <table
      style={{ width: "100%" }}
      role={"grid"}
      cellSpacing={0}
      width={"100%"}
      id="dataTable"
      className="table-striped table table-bordered table-database dataTable"
    >
      {props.data ? (
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
  );
}
