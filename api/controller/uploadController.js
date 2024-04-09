import { __dirname } from "../utils/dirname.js";
import path from "path";
const getImage = (req, res) => {
  const { image } = req.params;
  return res.sendFile(path.join(__dirname, "uploads", image));
};

export default { getImage };
