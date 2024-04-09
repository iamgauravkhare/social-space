import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { UserContext } from "./../../context/userContext";
import { api } from "../../services/api";
import { format } from "date-fns";
import "./Article.scss";

const Article = () => {
  const [data, setData] = useState({});
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(`/post/${id}`);
        if (result.status == 200) {
          setData(result.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/edit/${id}`);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/post/${id}`, { withCredentials: true });
      enqueueSnackbar("Book deleted successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/");
    } catch (err) {
      console.log(err.message);
      enqueueSnackbar("Error", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className="app__article">
      <div className="app__article-container">
        <h2>{data.title}</h2>
        <div className="app__article-info">
          <p>@{data?.author?.username}</p>

          <time>
            {format(
              new Date(data?.createdAt || "1999-01-01 00:00"),
              "dd-mm-yyyy HH:mm"
            )}
          </time>
        </div>
        {userInfo.id === data?.author?._id && (
          <div className="app__article-button">
            <button className="app__article-edit" onClick={handleEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              {` `}
            </button>
            <button className="app__article-delete" onClick={handleDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              {` `}
            </button>
          </div>
        )}
        <div className="app__article-img">
          <img src={`https://social-space-gur6.onrender.com/${data.cover}`} alt="photo" />
        </div>
        <div className="app__article-text">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
    </div>
  );
};

export default Article;
