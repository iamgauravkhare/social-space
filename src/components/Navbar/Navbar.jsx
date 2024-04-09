import { useState, useEffect, useContext } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { api } from "./../../services/api";
import { useSnackbar } from "notistack";

import "./Navbar.scss";
import { image } from "./../../constants";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  // const [username, setUsername] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get("/profiles", { withCredentials: true });
        if (result) setUserInfo(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const username = userInfo?.username;
  
  const logout = async () => {
    try {
      const result = await api.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar(`😢 Bye, ${username} `, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (err) {
      console.log(err.message);
    }
    setUserInfo(null);
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
          <img src={image.logo} alt="logo" />{" "}
        </Link>
      </div>
      <ul className="app__navbar-links">
        {username && (
          <>
            <li>
              <a className="app__navbar-user">{`Hey, ${username}`}</a>
            </li>
            <li className="app__navbar-create">
              <Link to="/createPost">+</Link>
            </li>
            <li>
              <a onClick={logout}>logout</a>
            </li>
            {["feed", "event", "discussion"].map((link) => (
              <li key={`nav-${link}`}>
                <Link to={`/${link}`}>{link}</Link>
              </li>
            ))}
          </>
        )}
        {!username && (
          <>
            {["login", "register", "feed", "event", "navbar"].map((link) => (
              <li key={`nav-${link}`}>
                <Link to={`/${link}`}>{link}</Link>
              </li>
            ))}
          </>
        )}
      </ul>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [200, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {username && (
                <>
                  <li>
                    <a
                      className="app__navbar-user"
                      onClick={() => setToggle(false)}
                    >{`Hey, ${username}`}</a>
                  </li>
                  <li className="app__navbar-create">
                    <Link to="/createPost" onClick={() => setToggle(false)}>
                      create Post
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        logout();
                        setToggle(false);
                      }}
                    >
                      logout
                    </a>
                  </li>
                  {["feed", "event", "discussion"].map((link) => (
                    <li key={`nav-${link}`}>
                      <Link to={`/${link}`}>{link}</Link>
                    </li>
                  ))}
                </>
              )}
              {!username && (
                <>
                  {["login", "register", "feed", "event", "navbar"].map(
                    (link) => (
                      <li key={`nav-${link}`}>
                        <Link to={`/${link}`} onClick={() => setToggle(false)}>
                          {link}
                        </Link>
                      </li>
                    )
                  )}
                </>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
