import { useFormik } from "formik";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  createCategory,
  editCateogry,
  getCategory,
} from "../services/APIcategory";
import { ResponseData } from "../services/types";
import { getCookie } from "../utils/cookieUtil";

const PATH_ADD = "/category/add";
const PATH_EDIT = "/category/edit";

export default function EditAddCategory() {
  const param = useParams<{ id: string }>();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname.includes(PATH_EDIT)) {
      getCategory(param.id, (response: ResponseData) => {
        if (response.success) {
          console.log(response);
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
        if (location.pathname.includes(PATH_EDIT)) {
          editCateogry(values, (response: ResponseData) => {
            alert(response.data);
          });
        }
        if (location.pathname.includes(PATH_ADD)) {
          createCategory(values.name, (response: any) => {
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
