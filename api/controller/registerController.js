import bcrypt from "bcrypt";
import "dotenv/config.js";
import User from "../model/userSchema.js";

const saltRounds = parseInt(process.env.SALT);

const createUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  if (!username || !password)
    return res.status(400).json({ message: "Please Enter valid data" });
  const salt = bcrypt.genSaltSync(saltRounds);
  const hsPwd = bcrypt.hashSync(password, 10);

  //encrypt passoword
  try {
    const newUser = {
      username: username,
      password: hsPwd,
    };

    const result = await User.create(newUser);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(err.status).json({ message: err.message });
  }
};

export default { createUser };
