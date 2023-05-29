import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingGif } from "../components/Loading/Loading";
import { getCookie } from "../utils/cookieUtil";
import avartarImage from "../assets/svgs/undraw_profile.svg";
import { uploadImage } from "../services/APIimage";

const PATH_ADD_USER = "/users/add";
const PATH_EDIT_USER = "/users/edit";

const roles = [
  {
    name: "Admin",
    value: 1,
  },
  {
    name: "Staff",
    value: 2,
  },
  {
    name: "Anonymous",
    value: 3,
  },
];
interface StateAddEditUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: number;
  description: string;
  avatar: string;
  links: [];
}
export default function AddEditUser() {
  let location = useLocation();
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === PATH_ADD_USER) {
    }
    if (location.pathname === PATH_EDIT_USER) {
      document
        .getElementById("emailAddEdituser")
        ?.setAttribute("readonly", "true");
    }

    if (getCookie("role") !== process.env.REACT_APP_ROLE_ADMIN) {
      document
        .getElementById("btn-add-edit-user")
        ?.setAttribute("disabled", "true");
    }
  }, []);

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, name } = e.currentTarget;
  //   setData({ ...data, [name]: value });
  // };

  // const handleOnChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, name } = e.currentTarget;
  //   setData({ ...data, links: [...data.links] });
  // };

  // const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value, name, dataset } = e.currentTarget;
  //   setData({ ...data, [name]: value });
  // };

  // const handleOnChangeTextArea = (
  //   e: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   const { value, name } = e.currentTarget;
  //   setData({ ...data, [name]: value });
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      role: 1,
      description: "",
      avatar: "",
      links: [],
    },
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleLoadLink = (link: any, nameLabel: string) => {
    let index = formik.values.links.findIndex((data) => {
      if ((data as any).name === nameLabel) {
        return true;
      }
    });

    if (index !== -1) {
      let newLinks = formik.values.links.map((data) => {
        if ((data as any).name === nameLabel) {
          return link;
        }
        return data;
      });
      formik.setFieldValue("links", newLinks);
    } else {
      formik.setFieldValue("links", [...formik.values.links, link]);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-5">
          <form onSubmit={formik.handleSubmit}>
            {/* <div className="form-group">
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
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPasswordAddEditUser">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                id="confirmPasswordAddEditUser"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
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
            </div> */}
            <div className="form-group">
              <label htmlFor="avataAddEditUser">Avatar</label>

              <input
                type="file"
                className="form-control-file"
                id="avataAddEditUser"
                onChange={(e) => {
                  let RegExpImg = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
                  if (!RegExpImg.exec(e.target.value)) {
                    alert("Sai định dạng ảnh");
                  } else {
                    e.currentTarget.setAttribute("hidden", "true");
                    setIsLoading(true);
                    // if()
                    let selectedFile = (e.currentTarget.files as FileList)[0];
                    let imgtag = document.getElementById("imgThumbnailSuccess");
                    // uploadImage((res)=>{},selectedFile );
                    // uploadImage(selectedFile, (response) => {
                    //   if (response.success) {
                    //     $("#loadinggif").hide();
                    //     imgtag.src = response.data;
                    //     $("#file-thumbnail-input").val(response.data);
                    //   }
                    // });
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
              <div style={{ width: 60, height: 60 }}>
                <img src={avartarImage} alt="" />
              </div>
            </div>
            {/* <div className="form-group">
              <label htmlFor="linkFBAddEditUser">Link FaceBook</label>
              <input
                type="text"
                className="form-control"
                id="linkFBAddEditUser"
                aria-describedby="emailHelp"
                placeholder="Enter Link FaceBook"
                data-name="FACEBOOK"
                name="url"
                onChange={(e) => {
                  let { value, name } = e.currentTarget;
                  let link = {
                    [name]: value,
                    name: "FACEBOOK",
                  };

                  handleLoadLink(link, "FACEBOOK");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkYTAddEditUser">Link Youtube</label>
              <input
                type="text"
                className="form-control"
                data-name="YOUTUBE"
                name="url"
                id="linkYTAddEditUser"
                placeholder="Enter Link Youtube"
                onChange={(e) => {
                  let { value, name } = e.currentTarget;
                  let link = {
                    [name]: value,
                    name: "YOUTUBE",
                  };
                  handleLoadLink(link, "YOUTUBE");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkTKAddEditUser">Link Tiktok</label>
              <input
                type="text"
                className="form-control"
                id="linkTKAddEditUser"
                placeholder="Enter Link Tiktok"
                data-name="TIKTOK"
                name="url"
                onChange={(e) => {
                  let { value, name } = e.currentTarget;
                  let link = {
                    [name]: value,
                    name: "TIKTOK",
                  };
                  handleLoadLink(link, "TIKTOK");
                }}
              />
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
            </div> */}
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
