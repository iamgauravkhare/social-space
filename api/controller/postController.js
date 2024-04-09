import fs from "fs";
import jwt from "jsonwebtoken";

import Post from "./../model/postSchema.js";
import { getExtension } from "../utils/getExtension.js";

const createPost = async (req, res) => {
  const { title, summary, content } = req.body;
  const { originalname, path } = req.file;

  const ext = getExtension(originalname);
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  // console.log("token", req.cookies["token"]);
  // const { accessToken } = req.cookies;

  console.log(req.cookies.token);

  const tokenData = jwt.verify(
    req.cookies.token,
    process.env.ACCESS_TOKEN_SECRET
  );

  console.log(tokenData);

  try {
    const result = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: tokenData.id,
    });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.response.status).json(err.message);
  }
};
const getPost = async (req, res) => {
  try {
    const result = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    if (!result) return res.status(200).json("no data found");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.findById(id).populate("author", ["username"]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
const editPost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const ext = getExtension(originalname);
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { title, summary, content } = req.body;
  const { id } = req.params;
  const tokenData = await jwt.verify(
    req.cookies["token"],
    process.env.ACCESS_TOKEN_SECRET
  );
  try {
    const dbResult = await Post.findById(id);
    const isAuthor =
      JSON.stringify(dbResult.author) == JSON.stringify(tokenData.id);

    if (!isAuthor) {
      return res.status(400).json("You are not author");
    }
    const result = await Post.findByIdAndUpdate(id, {
      title,
      summary,
      content,
      cover: newPath ? newPath : dbResult.cover,
    });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
const deletePost = async (req, res) => {
  const { id } = req.params;
  const tokenData = await jwt.verify(
    req.cookies["token"],
    process.env.ACCESS_TOKEN_SECRET
  );
  try {
    const dbResult = await Post.findById(id);
    const isAuthor =
      JSON.stringify(dbResult.author) == JSON.stringify(tokenData.id);

    if (!isAuthor) {
      return res.status(400).json("You are not author");
    }
    const result = await Post.findByIdAndDelete(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export default { createPost, getPost, getArticle, editPost, deletePost };
