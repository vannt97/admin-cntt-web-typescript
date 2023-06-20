import React, { LegacyRef, useEffect, useMemo, useRef, useState } from "react";
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
import { createPost, editPost, getPost } from "../services/APIpost";
import { useLocation, useParams } from "react-router-dom";
import { rejects } from "assert";

type OptionType = {
  value: string;
  label: string;
};

type ValueCagtegoryTag = {
  categories: OptionType[];
  tags: OptionType[];
};

const PATH_ADD_POST = "/post/add";
const PATH_EDIT_POST = "/post/edit";

export default function EditAddPost() {
  let location = useLocation();
  const param = useParams<{ id: string }>();
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
        if (values.title) {
          if (location.pathname.includes(PATH_EDIT_POST)) {
            editPost(slugPost, values, (res: ResponseData) => {
              // console.log("res: ", res);
              alert((res.data as any).data);
            });
          } else {
            createPost(values, (res: ResponseData) => {
              alert(res.data);
            });
          }
        } else {
          alert("Không được bỏ qua title");
        }
      } else {
        alert("Bạn phải không có quyền create post");
      }
    },
  });
  const quillRef = useRef(null);

  const imageHandler = (e: any) => {
    const editor = (quillRef as any).current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = (input as any).files[0];
      if (/^image\//.test(file.type)) {
        uploadImage((response: ResponseData) => {
          if (response.success) {
            editor.insertEmbed(editor.getSelection(), "image", response.data);
          }
        }, file);
      }
    };
  };
  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image"],
  //     ["clean"],
  //   ],
  // };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<ValueCagtegoryTag>();
  const [slugPost, setSlugPost] = useState("");

  useEffect(() => {
    let stateValue: ValueCagtegoryTag = {} as any;
    getCategories((response: ResponseData) => {
      if (response.success) {
        let arr = (response.data as []).map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        stateValue.categories = arr;
        getTags((response: ResponseData) => {
          if (response.success) {
            let arr = (response.data as []).map((item: any) => {
              return {
                value: item.id,
                label: item.name,
              };
            });
            stateValue.tags = arr;
            if (location.pathname.includes(PATH_EDIT_POST)) {
              getPost(param.id, (response: ResponseData) => {
                let valueTags = ((response.data as any).tags as []).map(
                  (item: any) => {
                    return {
                      value: item.id,
                      label: item.name,
                    };
                  }
                );
                let valueCategories = (
                  (response.data as any).categories as []
                ).map((item: any) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                });

                formik.setValues({
                  title: (response.data as any).title,
                  content: (response.data as any).content,
                  status: "",
                  thumbnail: (response.data as any).thumbnail,
                  description: (response.data as any).description,
                  categories: valueCategories as [],
                  tags: valueTags as [],
                  idAuthor: getCookie("id"),
                });

                setSlugPost((response.data as any).slug);

                (document.querySelector("#c_file") as HTMLElement).hidden =
                  true;
                (
                  document.querySelector("#c_file_success") as HTMLElement
                ).hidden = false;

                (
                  document.getElementById(
                    "imgThumbnailSuccess"
                  ) as HTMLImageElement
                ).src = (response.data as any).thumbnail;
                (
                  document.getElementById(
                    "file-thumbnail-input"
                  ) as HTMLInputElement
                ).value = (response.data as any).thumbnail as string;

                setIsLoading(false);
              });
            } else {
              setValue(stateValue);
            }
          }
        });
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

            formik.setFieldValue("thumbnail", response.data as string);
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
    formik.setFieldValue("thumbnail", "");
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
                ref={quillRef}
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
              <button
                onClick={() => {
                  formik.setFieldValue("status", "DRAFT");
                  formik.handleSubmit(undefined);
                }}
                type="submit"
                className="form-control"
                id="draft-blog"
              >
                Draft
              </button>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="form-control btn-primary"
                id="upload-blog"
                onClick={() => {
                  formik.setFieldValue("status", "PUBLISH");
                  formik.handleSubmit(undefined);
                }}
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
                value={formik.values.categories as OptionType[]}
                options={value?.categories}
                isMulti
                onChange={(e) => {
                  formik.setFieldValue("categories", e);
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
                value={formik.values.tags as OptionType[]}
                options={value?.tags}
                isMulti
                onChange={(e) => {
                  formik.setFieldValue("tags", e);
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
