import express from 'express'
import { SearchFilter } from '../Controllers/SearchController.js'

const Router = express.Router()

Router.get('/Search' , SearchFilter)

export default Router;