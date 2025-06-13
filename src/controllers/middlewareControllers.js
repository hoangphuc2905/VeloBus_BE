const jwt = require("jsonwebtoken");

const middlewareControllers = {
  //Verify Token
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.MYSECRET, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareControllers.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do that!");
      }
    });
  },
};

module.exports = middlewareControllers;
