import express from 'express'
import { getallProducts } from '../Controllers/products.controller.js';

const router = express.Router()

router.route('/products').get(getallProducts);


export default router 