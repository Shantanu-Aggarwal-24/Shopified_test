const User = require("../models/user");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const shortid = require("shortid");
const SECRET_KEY = "WELCOME_TO_THE_WORLD_OF_ENTREPRENUERS";

const generateJwtToken = (_id) => {
  return jwt.sign({ _id }, SECRET_KEY, {
    expiresIn: "1d",
  });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { firstName, lastName, email, password, cPassword } = req.body;
    //const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      cPassword,
      username: shortid.generate(),
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role },
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      //const isPassword = await user.authenticate(req.body.password);
      if (user.password === req.body.password && user.role === "user") {
        // const token = jwt.sign(
        //   { _id: user._id, role: user.role },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "1d" }
        // );
        const token = generateJwtToken(user._id);
        const { _id, firstName, lastName, email, role } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role }
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password / role is not User ",
        });
      }
    } else {
      return res.status(400).json({ message: "Email Does not Exist" });
    }
  });
};
