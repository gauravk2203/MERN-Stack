import express from "express";
import { registerProfile , Login , updateProfile , getUser } from "../Controller/User.controller.js";
import { Validation } from "../Middleware/TokenValidation.js";

const Router = express.Router();

Router.route('/register').post(registerProfile);

Router.route('/login').post(Login);

Router.route('/update').put( Validation , updateProfile);

Router.route('/User').get( Validation , getUser)

export default Router;