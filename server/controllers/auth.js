const jwt = require("jsonwebtoken");
const User = require("../models/signUpCollection");
exports.loginController=async(req,res)=>{
    const { userEmail, userPassword } = req.body;
    const auth = await User.findOne({ $and: [{ userEmail: userEmail }, { userPassword: userPassword }] });
    // const user = {userName:"Hussain",userEmail:"7phussain@gmail.com"}
    if (auth) {
  
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        _id: auth._id,
        userEmail: auth.userEmail,
        userName: auth.userName
      }, secret
      );
  
  
  
      res.cookie("liveChatToken", token);
  
      res.status(200).json({ message: "success!" });
  
    } else {
  
      res.status(401).json({ message: "invalid credentials!" })
    }
}