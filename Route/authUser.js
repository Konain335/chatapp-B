import express from "express";
import { userLogin, userLogout, userRegister } from "../routeControllers/userrouteController.js";


const router = express.Router();

router.post('/register', userRegister);

router.post('/login', userLogin);

router.post('/logout', userLogout); //JWT session ko delete kardein. e.g:(URC.js) 


export default router;

