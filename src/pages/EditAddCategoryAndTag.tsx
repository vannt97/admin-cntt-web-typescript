import { useFormik } from "formik";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  createCategory,
  editCateogry,
  getCategory,
} from "../services/APIcategory";
import { createTag, editTag, getTag } from "../services/APItag";
import { ResponseData } from "../services/types";
import { getCookie } from "../utils/cookieUtil";

const PATH_ADD_CATEGORY = "/category/add";
const PATH_EDIT_CATEGORY = "/category/edit";
const PATH_ADD_TAG = "/tag/add";
const PATH_EDIT_TAG = "/tag/edit";

export default function EditAddCategoryAndTag() {
  const param = useParams<{ id: string }>();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname.includes(PATH_EDIT_CATEGORY)) {
      getCategory(param.id, (response: ResponseData) => {
        if (response.success) {
          formik.setValues({
            name: (response.data as any).name,
            id: (response.data as any).id,
          });
        }
      });
    }

    if (location.pathname.includes(PATH_EDIT_TAG)) {
      getTag(param.id, (response: ResponseData) => {
        if (response.success) {
          formik.setValues({
            name: (response.data as any).name,
            id: (response.data as any).id,
          });
        }
      });
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
    },
    onSubmit: (values) => {
      if (getCookie("role") === "ROLE_ADMIN") {
        if (location.pathname.includes(PATH_EDIT_CATEGORY)) {
          editCateogry(values, (response: ResponseData) => {
            alert(response.data);
          });
        }
        if (location.pathname.includes(PATH_ADD_CATEGORY)) {
          createCategory(values.name, (response: any) => {
            alert(JSON.stringify(response, null, 2));
          });
        }

        if (location.pathname.includes(PATH_EDIT_TAG)) {
          editTag(values, (response: ResponseData) => {
            alert(response.data);
          });
        }
        if (location.pathname.includes(PATH_ADD_TAG)) {
          createTag(values.name, (response: any) => {
            alert(JSON.stringify(response, null, 2));
          });
        }
      } else {
        alert("Bạn phải không có quyền tạo user");
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailAddEdituser">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
            <button
              id="btn-add-edit-user"
              type="submit"
              className="btn btn-primary mb-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
