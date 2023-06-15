import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { getCategories } from "../services/APIcategory";
import { ResponseData } from "../services/types";
import { getTags } from "../services/APItag";
import { LoadingGif } from "../components/Loading/Loading";
import { uploadImage } from "../services/APIimage";
import { useFormik } from "formik";
import { getCookie } from "../utils/cookieUtil";
type OptionType = {
  value: string;
  label: string;
};
export default function EditAddPost() {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      status: "",
      thumbnail: "",
      description: "",
      categories: [],
      tags: [],
      idAuthor: getCookie("id"),
    },
    onSubmit: (values) => {
      if (getCookie("role") === "ROLE_ADMIN") {
        // editUserAdmin(values, (response: ResponseData) => {
        //   if (response.success) {
        //     alert("Edit thành công");
        //   } else {
        //     alert("Edit không thành công. Vui lòng thử lại");
        //   }
        // });
      } else {
        alert("Bạn phải không có quyền create post");
      }
    },
  });
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "font",
    "size",
    // "bold",
    // "italic",
    // "underline",
    // "strike",
    // "color",
    // "background",
    // "script",
    // "header",
    // "blockquote",
    // "code-block",
    // "indent",
    // "list",
    // "direction",
    // "align",
    // "link",
    // "image",
    // "video",
    // "formula",
  ];

  const [valueCateogries, setValueCategory] = useState<OptionType[]>([]);
  const [valueTags, setValueTags] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories((response: ResponseData) => {
      if (response.success) {
        let arr = (response.data as []).map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setValueCategory(arr);
      }
    });

    getTags((response: ResponseData) => {
      if (response.success) {
        let arr = (response.data as []).map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setValueTags(arr);
      }
    });
  }, []);

  const handleChangeFileLoadImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let RegExpImg = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
    if (!RegExpImg.exec(e.target.value)) {
      alert("Sai định dạng ảnh");
    } else {
      (document.querySelector("#c_file") as HTMLElement).hidden = true;
      let selectedFile = (e.currentTarget.files as FileList)[0];
      let imgtag = document.getElementById("imgThumbnailSuccess");
      (document.querySelector("#c_file_success") as HTMLElement).hidden = false;
      uploadImage((response: ResponseData) => {
        if (response.success) {
          if (imgtag) {
            setIsLoading(false);
            (imgtag as HTMLImageElement).src = response.data as string;

            (
              document.getElementById(
                "file-thumbnail-input"
              ) as HTMLInputElement
            ).value = response.data as string;

            // formik.setFieldValue(
            //   "avatar",
            //   response.data as string
            // );
          }
        }
      }, selectedFile);
    }
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    (document.getElementById("c_file_success") as HTMLElement).hidden = true;
    setIsLoading(true);
    (document.getElementById("c_file") as HTMLElement).hidden = false;
    // formik.setFieldValue(
    //   "avatar",
    //   response.data as string
    // );
  };

  return (
    <div className="row">
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formik.values.title}
                id="title"
                required
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Content</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={formik.values.content}
                onChange={(value) => {
                  formik.setFieldValue("content", value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Action</h6>
          </div>
          <div className="card-body">
            <div className="form-group">
              <button type="submit" className="form-control" id="draft-blog">
                Draft
              </button>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="form-control btn-primary"
                id="upload-blog"
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Genre</h6>
          </div>
          <div className="card-body">
            <div className="form-group">
              <Select
                options={valueCateogries}
                isMulti
                onChange={(e) => {
                  console.log("e: ", e);
                }}
              />
            </div>
          </div>
        </div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Tag</h6>
          </div>
          <div className="card-body">
            <div className="form-group">
              <Select
                options={valueTags}
                isMulti
                onChange={(e) => {
                  console.log("e: ", e);
                }}
              />
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Thumbnail</h6>
          </div>
          <div className="card-body ">
            <div id="c_file" className="form-group text-center mb-0">
              <label
                htmlFor="file-thumbnail"
                className=""
                style={{ fontSize: "60px", cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faFileUpload} />
              </label>
              <input
                name="thumbnail"
                type="file"
                hidden
                id="file-thumbnail"
                onChange={handleChangeFileLoadImage}
                required
              />
              <input
                name="thumbnail"
                type="text"
                hidden
                id="file-thumbnail-input"
                required
              />
            </div>
            <div id="c_file_success" className="form-group text-center" hidden>
              <div>
                {isLoading ? <LoadingGif /> : ""}
                <img
                  id="imgThumbnailSuccess"
                  className="w-100"
                  src=""
                  alt=""
                  title="image"
                />
                <button
                  onClick={handleRemoveFile}
                  type="button"
                  id="remove-image"
                  className="d-block mt-3 mx-auto btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
