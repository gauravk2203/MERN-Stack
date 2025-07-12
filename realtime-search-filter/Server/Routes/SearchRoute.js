import express from 'express'
import { Serach } from '../Controllers/SearchController.js'

const Router = express.Router()


Router.get('/search' , Serach)


export default Router