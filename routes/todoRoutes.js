const express = require('express');
const router = express.Router();
const { createTodo , getTodos , updateTodo , deleteTodo , getTodosByUser} = require('../controllers/todoController');
const { validateUser } = require('../middlewares/jwt');

router.post('/todo/create', validateUser , createTodo)
router.get('/todo/getTodos', validateUser, getTodos)
router.put('/todo/updateTodo/:id', validateUser, updateTodo)
router.delete('/todo/deleteTodo/:id', validateUser, deleteTodo)
router.get('/todo/getTodosByUser', validateUser, getTodosByUser)

module.exports = router