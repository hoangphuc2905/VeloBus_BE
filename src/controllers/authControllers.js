const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authControllers = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const newUser = new User({
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        avatar: req.body.avatar,
        address: req.body.address,
        password: hashed,
      });

      // Save user and respond
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // GENERATE NEW ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign({ id: user._id, admin: user.admin }, process.env.MYSECRET, {
      expiresIn: "15m",
    });
  },

  // GENERATE NEW REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user._id, admin: user.admin },
      process.env.MYREFRESHSECRET,
      { expiresIn: "365d" }
    );
  },

  // LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const accessToken = authControllers.generateAccessToken(user);
      const refreshToken = authControllers.generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });

      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // REQUEST REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken) {
      return res.status(401).json("User not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }

    jwt.verify(refreshToken, process.env.MYREFRESHSECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authControllers.generateAccessToken(user);
      const newRefreshToken = authControllers.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshtoken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // USER LOGOUT
  userLogout: async (req, res) => {
    res.clearCookie("refreshtoken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshtoken
    );
    res.status(200).json("User has been logged out");
  },

  // GET USER INFO
  getUserInfo: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // RESET PASSWORD
  resetPassword: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.newPassword, salt);

      await User.findByIdAndUpdate(req.user.id, { password: hashed });
      return res.status(200).json({ message: "Password has been updated" });
    } catch (err) {
      if (!res.headersSent) {
        return res.status(500).json({ message: err.message });
      }
    }
  },

  // UPDATE USER INFO
  updateUserInfo: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, req.body);
      return res.status(200).json({ message: "User info has been updated" });
    } catch (err) {
      if (!res.headersSent) {
        return res.status(500).json({ message: err.message });
      }
    }
  },

  // UPDATE AVATAR
  updateAvatar: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, { avatar: req.body.avatar });
      return res.status(200).json({ message: "Avatar has been updated" });
    } catch (err) {
      if (!res.headersSent) {
        return res.status(500).json({ message: err.message });
      }
    }
  },
};
    

module.exports = authControllers;
