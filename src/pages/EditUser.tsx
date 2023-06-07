import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { LoadingGif } from "../components/Loading/Loading";
import { editUserAdmin, getUser } from "../services/APIuser";
import { ResponseData } from "../services/types";
import { getCookie } from "../utils/cookieUtil";
const roles = [
  {
    name: "Staff",
    value: 2,
  },
  {
    name: "Anonymous",
    value: 3,
  },
];
export default function EditUser() {
  let param = useParams<{ id: string }>();
  let location = useLocation();
  let history = useHistory();
  let { from }: any = location.state || { from: { pathname: "/users" } };
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      role: 1,
      description: "",
      avatar: "",
    },
    onSubmit: (values) => {
      if (getCookie("role") === "ROLE_ADMIN") {
        editUserAdmin(values, (response: ResponseData) => {
          if (response.success) {
            alert("Edit thành công");
          } else {
            alert("Edit không thành công. Vui lòng thử lại");
          }
        });
      } else {
        alert("Bạn phải không có quyền edit user");
      }
    },
  });

  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document
      .getElementById("emailAddEdituser")
      ?.setAttribute("disabled", "true");

    document.getElementById("avataAddEditUser")?.setAttribute("hidden", "true");
    setIsLoading(true);

    getUser(param.id, (response: ResponseData) => {
      if (response.success) {
        let data = response.data as any;
        formik.setValues({
          email: data.email,
          name: data.name,
          role: data.role.id,
          description: data.userDetail.description
            ? data.userDetail.description
            : "",
          avatar: data.userDetail.avatar,
        });

        let imgtag = document.getElementById("imgThumbnailSuccess");
        setIsLoading(false);
        (imgtag as HTMLImageElement).src = data.userDetail.avatar as string;
        (imgtag as HTMLImageElement).hidden = false;
        (
          document.getElementById("file-thumbnail-input") as HTMLInputElement
        ).value = data.userDetail.avatar as string;
        (document.getElementById("avataAddEditUser") as HTMLElement).hidden =
          true;
        (document.getElementById("removeAvatar") as HTMLElement).hidden = false;
        (document.getElementById("chooseFile") as HTMLElement).hidden = true;
      } else {
        alert("lỗi load dữ liệu vui lòng thử lại");
      }
    });

    if (getCookie("role") !== process.env.REACT_APP_ROLE_ADMIN) {
      document
        .getElementById("btn-add-edit-user")
        ?.setAttribute("disabled", "true");
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailAddEdituser">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="emailAddEdituser"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameAddEditUser">Name</label>
              <input
                type="text"
                className="form-control"
                id="nameAddEditUser"
                aria-describedby="emailHelp"
                placeholder="Enter Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionAddEditUser">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="descriptionAddEditUser"
                rows={3}
                onChange={formik.handleChange}
                value={formik.values.description}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="" className="d-block">
                Avatar
              </label>
              <label
                htmlFor="avataAddEditUser"
                className="btn btn-primary"
                id="chooseFile"
              >
                Choose
              </label>
              <input
                hidden
                type="file"
                className="form-control-file mb-2"
                id="avataAddEditUser"
                defaultValue={""}
                onChange={(e) => {
                  let RegExpImg = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
                  if (!RegExpImg.exec(e.target.value)) {
                    alert("Sai định dạng ảnh");
                  } else {
                    e.currentTarget.setAttribute("hidden", "true");
                    setIsLoading(true);
                    let imgtag = document.getElementById("imgThumbnailSuccess");
                    let selectedFile = (e.currentTarget.files as FileList)[0];
                    uploadImage((response: ResponseData) => {
                      if (response.success) {
                        if (imgtag) {
                          setIsLoading(false);
                          (imgtag as HTMLImageElement).src =
                            response.data as string;
                          (imgtag as HTMLImageElement).hidden = false;
                          (
                            document.getElementById(
                              "file-thumbnail-input"
                            ) as HTMLInputElement
                          ).value = response.data as string;
                          formik.setFieldValue(
                            "avatar",
                            response.data as string
                          );
                          (
                            document.getElementById(
                              "avataAddEditUser"
                            ) as HTMLElement
                          ).hidden = true;
                          (
                            document.getElementById(
                              "removeAvatar"
                            ) as HTMLElement
                          ).hidden = false;
                          (
                            document.getElementById("chooseFile") as HTMLElement
                          ).hidden = true;
                        }
                      }
                    }, selectedFile);
                  }
                }}
              />
              {isLoading ? (
                <>
                  <br />
                  <LoadingGif />
                </>
              ) : (
                ""
              )}
              <input
                defaultValue={formik.values.avatar}
                name="avatar"
                type={"text"}
                id="file-thumbnail-input"
                hidden
              />
              <img
                className=""
                id="imgThumbnailSuccess"
                src=""
                alt=""
                hidden
                style={{ objectFit: "contain", height: 100, width: 100 }}
              />
              <button
                type="button"
                id="removeAvatar"
                className="btn btn-danger ml-3"
                hidden
                onClick={() => {
                  (
                    document.getElementById(
                      "imgThumbnailSuccess"
                    ) as HTMLElement
                  ).hidden = true;
                  (
                    document.getElementById(
                      "file-thumbnail-input"
                    ) as HTMLInputElement
                  ).value = "";
                  formik.setFieldValue("avatar", "");
                  (
                    document.getElementById("removeAvatar") as HTMLElement
                  ).hidden = true;
                  (
                    document.getElementById("chooseFile") as HTMLElement
                  ).hidden = false;
                }}
              >
                Remove
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Role</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="role"
                required
                onChange={formik.handleChange}
                value={formik.values.role}
                // onChange={handleOnChangeSelect}
              >
                {roles.map((data) => {
                  return (
                    <option key={data.value} value={data.value}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
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
