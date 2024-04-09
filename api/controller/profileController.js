import jwt from "jsonwebtoken";
import "dotenv/config.js";

const getUser = async (req, res) => {
  const token = req.cookies["token"];
  try {
    const result = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!result) return res.sendStatus(401);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.message);
  }
};

export default { getUser };
