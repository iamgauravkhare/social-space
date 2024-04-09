import { Routes, Route } from "react-router-dom";

import "./App.scss";

import Layout from "./Layout/Home";
import {
  CreatePost,
  Login,
  Register,
  Posts,
  Article,
  Edit,
  GanttChart,
  Home,
  Discussion,
} from "./pages";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/event" element={<GanttChart />} />
            <Route path="/feed" element={<Posts />} />
            <Route path="/discussion" element={<Discussion />} />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
