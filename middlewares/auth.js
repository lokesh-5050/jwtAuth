exports.authenticateLogin = async (req, res, next) => {
  const token = req.cookies["x-access-token"];
  console.log(token + " cookie");

  if (!token) {
    return res.status(403).json({ message: "User not Authenticated" });
  }

  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
};
