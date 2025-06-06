import express from 'express'
import permission from '../Middlewares/Permission.middleware.js'
import validation from '../Middlewares/TokenValidation.middleware.js'
import { addComment } from '../Controllers/CommentController.js'
import { deleteComment } from '../Controllers/CommentController.js'
import { Register } from '../Controllers/LoginController.js'
import { Login } from '../Controllers/LoginController.js'
import { getallComments } from '../Controllers/CommentController.js'


const Router =  express.Router()

Router.post('/addcomment', validation , addComment )

Router.delete('/delcomment/:id', validation ,permission(['admin']), deleteComment )

Router.post('/register' , Register)

Router.post('/login' , Login)

Router.get('/Comments' , getallComments)

export default Router