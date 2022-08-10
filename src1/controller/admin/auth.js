const User = require("../../models/user");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const shortid = require("shortid");
const SECRET_KEY = "WELCOME_TO_THE_WORLD_OF_ENTREPRENUERS"

const generateJwtToken = (_id) => {//_id, role) => {
  var createdtoken = jwt.sign( {_id},SECRET_KEY, {
    expiresIn: "1d",
  },{algorithm:'RS256'});
  return createdtoken
};


exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
    {
      return res.status(400).json({
        message: "Admin already registered",
      });
    }else{

    // User.estimatedDocumentCount(async (err, count) => {
    //   if (err) return res.status(400).json({ error });
    //   let role = "admin";
    //   if (count === 0) {
    //     role = "super-admin";
    //   }
        let role = "admin";
      const { firstName, lastName, email, password, cPassword } = req.body;
     // const hash_password = await bcrypt.hash(password, 10);
      if(password !== cPassword){
      return res.status(400).json({
        message:"password and confirmpassword is not matching"
           });
       }else
       {
        const _user = new User({
          firstName,
          lastName,
          email,
          password,
          cPassword,
          username: shortid.generate(),
          role,
        });
         
        
      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          const{_id,firstName, lastName, email, role} = data;
          return res.status(201).json({
            message: "Admin created Successfully..!",
            admin:{_id,firstName, lastName, email, role, }
            });
            }
      });
      
      }
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ error })
      };
      
    if (user) {
      if(user.role === "admin" || user.role === "super-admin"){
      //const isPassword = await user.authenticate(req.body.password);
      if ( user.password === req.body.password ) {
        const token = generateJwtToken(user._id);  //user._id,  user.role );
        const { _id, firstName, lastName, email, role } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role},
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    }else{
      return res.status(400).json({
        message:"Access denied due to wrong role"
      })
    }
    } else {
      return res.status(400).json({ message: "Something went wrong during searching..." });
    }
  
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!"
  });
};





// User.estimatedDocumentCount(async (err, count) => {
//   if (err) return res.status(400).json({ error });
//   let role = "admin";
//   if (count === 0) {
//     role = "super-admin";
//   }
//rest of the code will be from save part
//}

