import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { LoadingGif } from "../components/Loading/Loading";
import { PropsChildren } from "../layouts/Table/Table";
import { ResponseData } from "../services/types";
import { deleteUser, getUsers } from "../services/APIuser";
import { getCookie } from "../utils/cookieUtil";

export default function Users(props: PropsChildren) {
  const history = useHistory();

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
        if (data.email === getCookie("email")) return;
        return (
          <tr key={index}>
            <td>{data.id}</td>
            <td>{data.email}</td>
            <td>{data.name}</td>
            <td>{new Date(data.createdAt).toLocaleString()}</td>
            <td>{new Date(data.modifiedAt).toLocaleString()}</td>
            <td>
              <>
                <Link
                  className="btn btn-primary btn-edit"
                  to={`/users/edit/${data.id}`}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <button
                  className="btn btn-danger btn-remove ml-2"
                  onClick={() => {
                    if (getCookie("role") !== "ROLE_ADMIN") {
                      alert("Bạn không có quyền xoá user");
                      return;
                    }
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm("Bạn có muốn xoá không?")) {
                      deleteUser(data.id, (response: ResponseData) => {
                        alert("Xoá thành công");
                        props.removeItem(data.id);
                        history.push(history.location.pathname);
                      });
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
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
    <>
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
                <th
                  className="sorting"
                  onClick={(e) => {
                    props.handleSort(e);
                  }}
                >
                  Id
                </th>
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
    </>
  );
}
