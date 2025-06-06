import express from 'express';
import Login from '../Controllers/LoginController.js';

const router = express.Router();

router.post('/' , Login);


export default router;