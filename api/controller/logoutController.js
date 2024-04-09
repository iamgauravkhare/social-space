const logout = (req, res) => {
  return res.status(200).cookie("token", "").json("ok");
};
export default { logout };
