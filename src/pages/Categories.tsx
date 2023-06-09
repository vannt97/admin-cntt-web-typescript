import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Key, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoadingGif } from "../components/Loading/Loading";
import Table, { PropsChildren } from "../layouts/Table/Table";
import { getCategories, removeCategory } from "../services/APIcategory";
import { ResponseData } from "../services/types";
import { getCookie } from "../utils/cookieUtil";

interface PropsCategories {
  callback: Function;
  data?: [] | null;
}
export default function Categories(props: PropsChildren) {
  const history = useHistory();

  const renderCategories = () => {
    if (props.data?.length === 0) {
      return (
        <tr className="odd">
          <td valign="top" colSpan={7} className="dataTables_empty">
            No matching records found
          </td>
        </tr>
      );
    } else {
      return props.data?.map((data: any, index: Key | null | undefined) => {
        return (
          <tr key={index}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{new Date(data.createdAt).toLocaleString()}</td>
            <td>{new Date(data.modifiedAt).toLocaleString()}</td>
            <td>
              <>
                <Link
                  className="btn btn-primary btn-edit"
                  to={`/category/edit/${data.id}`}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <button
                  className="btn btn-danger btn-remove ml-2"
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm("Bạn có muốn xoá không?")) {
                      if (getCookie("role") !== "ROLE_ADMIN") {
                        alert("Bạn không có quyền xoá user");
                        return;
                      }
                      removeCategory(data.id, (response: ResponseData) => {
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
    getCategories((res: ResponseData) => {
      if (res.success) {
        props.callback(res.data as [], ["name"]);
      }
    });
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
              <th
                className="sorting"
                onClick={(e) => {
                  props.handleSort(e);
                }}
              >
                Id
              </th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderCategories()}</tbody>
          <tfoot>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
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
