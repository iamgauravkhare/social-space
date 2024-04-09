import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { api } from "./../../services/api";

import "./Edit.scss";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    [{ font: [] }], // fonts
    [{ size: ["12px", "14px", "16px", "18px", "20px"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link"],
  ],
};

const formats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "image",
];

const Edit = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(`/post/${id}`);
        if (result.status == 200) {
          setTitle(result.data.title);
          setSummary(result.data.summary);
          setContent(result.data.content);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file?.[0]) data.set("file", file[0]);

    try {
      const result = await api.put(`/post/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (result.status === 200) {
        enqueueSnackbar("Book edited successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Error", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };
  return (
    <div className="app__createPost">
      <form className="app__createPost-form" onSubmit={handleEdit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <label htmlFor="summary">summary</label>
        <input
          type="summary"
          name="summary"
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
        />
        <input type="file" onChange={(e) => setFile(e.target.files)} />
        <ReactQuill
          className="app__createPost-content"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
        <div className="app__createPost-btn">
          <button className="app__createPost-post">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
