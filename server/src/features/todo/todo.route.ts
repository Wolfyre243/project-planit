import * as todoController from './todo.controller.js';
import { verifyJWT } from '../../middleware/auth.middleware.js';
 
import express from 'express';

const router = express.Router();

 // Apply authentication middleware to all todo routes
router.use(verifyJWT);


 // Todo List Routes
router.get('/lists', todoController.getTodoLists);
router.get('/lists/:todoListId', todoController.getTodoList);

router.put('/lists/:todoListId', todoController.updateTodoList);
router.delete('/lists/:todoListId', todoController.deleteTodoList);

router.post('/lists', todoController.createTodoList);
 
 // Todo Routes
router.get('/', todoController.getUserTodos);
router.get('/:todoId', todoController.getUserTodoById);

router.put('/:todoId', todoController.updateTodo);
router.delete('/:todoId', todoController.deleteTodo);

router.post('/', todoController.createTodoItem);

export default router;

