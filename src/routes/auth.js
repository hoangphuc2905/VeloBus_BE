const authControllers = require('../controllers/authControllers');
const middlewareControllers = require('../controllers/middlewareControllers');
const routes = require('express').Router(); 
//REGISTER
routes.post("/register", authControllers.registerUser);

//LOGIN
routes.post("/login", authControllers.loginUser);

//REFRESH TOKEN
routes.post("/refresh", authControllers.requestRefreshToken);

//LOGOUT
routes.post("/logout", middlewareControllers.verifyToken, authControllers.userLogout);

// RESET PASSWORD
routes.post("/reset-password", middlewareControllers.verifyToken, authControllers.resetPassword);

// UPDATE USER
routes.put('/update-info', middlewareControllers.verifyToken, authControllers.updateUserInfo);

// UPDATE AVATAR
routes.put('/update-avatar', middlewareControllers.verifyToken, authControllers.updateAvatar);

module.exports = routes; 
