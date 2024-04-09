import { Link } from "react-router-dom";
import { image } from "../../constants";

import "./Home.scss";

const info = [
  {
    imgUrl: image.scrum4,
    title: "Discussion Forums",
    desc: "Engage in lively discussions with like-minded individuals on various topics relevant to our community's interests.",
  },
  {
    imgUrl: image.scrum1,
    title: "User-Generated Content",
    desc: "Showcase your talents and expertise by contributing articles, photos, videos, and projects to our user-generated content section.",
  },
  {
    imgUrl: image.scrum3,
    title: "Events Calendar",
    desc: "Stay informed and connected with upcoming webinars, meetups, and workshops by exploring our dynamic events calendar.",
  },
];

const Home = () => {
  return (
    <div className="app__home">
      <div className="app__home-container">
        <div className="app__home-hero">
          <div className="app__home-img">
            <img src={image.scrum1} alt="headerImage" />
          </div>
          <div className="app__home-text">
            <h1>
              Community Connect, Empowering Collaboration Through Technology
            </h1>
            <p>
              Welcome to Community Connect, your gateway to a vibrant and
              inclusive community where collaboration thrives. Explore how
              technology shapes our sense of space, fosters connections, and
              supports transformative experiences. Join us on a journey of
              discovery, innovation, and empowerment as we build stronger
              communities together.
            </p>
          </div>
        </div>

        <div className="app__home-about">
          <h1 className="app__home-title">Features</h1>

          {/* 1 */}
          <div>
            <div className="app__home-text">
              <h1>{info[0].title}</h1>
              <p>{info[0].desc}</p>
            </div>
            <div className="app__home-img">
              <img src={info[0].imgUrl} alt="headerImage" />
            </div>
          </div>
          {/* 2 */}
          <div>
            <div className="app__home-img">
              <img src={info[1].imgUrl} alt="headerImage" />
            </div>
            <div className="app__home-text">
              <h1>{info[1].title}</h1>
              <p>{info[1].desc}</p>
            </div>
          </div>
          {/* 3 */}
          <div>
            <div className="app__home-text">
              <h1>{info[2].title}</h1>
              <p>{info[2].desc}</p>
            </div>
            <div className="app__home-img">
              <img src={info[2].imgUrl} alt="headerImage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
