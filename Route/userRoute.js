import express from 'express';
import isLogin from '../middleware/isLogin.js';
import { getUserBySearch, getcurrentChatters } from '../routeControllers/userhandlerController.js';

const router = express.Router();


router.get('/search', isLogin, getUserBySearch)

router.get('/currentchatters', isLogin, getcurrentChatters)



export default router;

