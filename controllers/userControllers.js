const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//signup
exports.createUser = async (req, res, next) => {
  const { username, email, phoneNo, password } = req.body;
  try {
    const exsistingUser = await userModel.findOne({ email: email });

    if (exsistingUser) {
      res
        .status(400)
        .json({ message: "User With this name/email already exist!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: username,
      email: email,
      phoneNo: phoneNo,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ user: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

//signin
exports.login = async (req, res, next) => {
  const { username, email, phoneNo, password } = req.body;
  try {
    const exsistingUser = await userModel.findOne({ email: email });
    console.log(exsistingUser);

    if (!exsistingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const matchPassword = await bcrypt.compare(
      password,
      exsistingUser.password
    );

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      { email: exsistingUser.email, id: exsistingUser._id },
      process.env.JWT_SECRET
    );

    res.cookie("x-access-token", token, {
      maxAge: 60 * 60 * 24 * 30,
    });

    // res.status(201).json({ user: exsistingUser, token: token });
    res.redirect("/homepage");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
