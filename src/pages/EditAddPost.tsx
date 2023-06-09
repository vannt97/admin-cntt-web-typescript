import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditAddPost() {
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
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log("value: ", value);
  }, [value]);
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
                value=""
                id="title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value=""
              ></textarea>
            </div>
            <div className="form-group">
              <label>Content</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={setValue}
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
              <select id="select-to"></select>
            </div>
          </div>
        </div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Tag</h6>
          </div>
          <div className="card-body">
            <div className="form-group">
              <select id="select-to-tag"></select>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Thumbnail</h6>
          </div>
          <div className="card-body ">
            <div id="c_file" className="form-group text-center">
              <label
                htmlFor="file-thumbnail"
                className=""
                style={{ fontSize: "60px", cursor: "pointer" }}
              >
                <i className="fas fa-file-upload "></i>
              </label>
              <input
                name="thumbnail"
                type="file"
                hidden
                id="file-thumbnail"
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
                {/* <img id="loadinggif" th:src="@{/images/loading-gif.gif}" alt="" style={{width: 60, display: 'none'}}/> */}
                {/* <img id="imgThumbnailSuccess" className="w-100" src="" alt="" title="image"/> */}
                {/* <button  type="button" id="remove-image" className="d-block mt-3 mx-auto btn btn-danger">Remove</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
