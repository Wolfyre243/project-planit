import * as todoController from './todo.controller.js';
import { verifyJWT } from '../../middleware/auth.middleware.js';
 
import express from 'express';

const router = express.Router();


// Apply authentication middleware to all todo routes
router.use(verifyJWT);


// Todo List Routes
router.put('/todolists/:todoListId', todoController.updateTodoList);
router.delete('/todolists/:todoListId', todoController.deleteTodoList);


// Todo Routes
router.put('/todos/:todoId', todoController.updateTodo);
router.delete('/todos/:todoId', todoController.deleteTodo);


export default router;

