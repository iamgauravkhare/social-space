import { format } from "date-fns";
import { Link } from "react-router-dom";

// import imageUr from "../../../../api/uploads/";

import "./PostCard.scss";

const PostCard = ({ item, uri }) => {
  console.log(item.cover.split("\\").join("/"));
  return (
    <Link className="app__posts-link" to={`/article/${item._id}`}>
      <div className="app__posts-container">
        <div className="app__posts-img">
          <img src={`${uri}${item.cover}`} alt="post" />
        </div>
        <div className="app__posts-text">
          <h2>{item.title}</h2>
          <div className="app__posts-info">
            <p className="app__posts-author">{item.author.username}</p>
            <time>{format(new Date(item.createdAt), "dd-mm-yyyy HH:mm")}</time>
          </div>
          <p>{item.summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
