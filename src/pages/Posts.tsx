import { useEffect } from "react";
import { LoadingGif } from "../components/Loading/Loading";
import { PropsChildren } from "../layouts/Table/Table";
import { getPosts } from "../services/APIpost";
import { ResponseData } from "../services/types";

export default function Posts(props: PropsChildren) {
  const renderPosts = () => {
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
            <td>{data.title}</td>
            <td>{data.status}</td>
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
      getPosts((res: ResponseData) => {
        if (res.success) {
          props.callback(res.data as [], ["title"]);
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
              <th
                className="sorting"
                onClick={(e) => {
                  props.handleSort(e);
                }}
              >
                Id
              </th>
              <th>Title</th>
              <th>Status</th>
              <th>CreateAt</th>
              <th>ModifiedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderPosts()}</tbody>
          <tfoot>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Status</th>
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
