const Todo = require('../model/Todo');
const User = require('../model/User');

exports.createTodo = async (req, res) => {
  try {
    console.log(req.body.userId);
    await Todo.create(
      {
        text: req.body.text,
        date: req.body.date,
        created_by: req.body.userId
      },
      (err, todo) => {
        if (err) {
          return res.status(400).json({ message: err });
        }

        const { _id, text, date } = todo;
        return res
          .status(200)
          .json({ message: 'todo created', todo: { _id, text, date } });
      }
    );
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTodos = async (req, res) => {
  try {
    await Todo.find((err, todos) => {
      if (err)
        return res.status(400).json({ message: 'Error in getting todos' });
      return res.status(200).json({ todos: todos });
    });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTodosByUser = async (req, res) => {
  try {
    const todos = await Todo.find({ created_by: req.body.userId });
    if (todos.length == 0) {
      res.status(200).json({ message: 'No todos found' });
    }
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    const todoArr = todos.map((todo) => {
      const { _id, text, date } = todo;
      return { _id, text, date, created_by: user };
    });
    return res.status(200).json({ todos: todoArr , message:"All todos by user"});
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    let ID = req.params.id;
    Todo.findByIdAndUpdate(
      ID,
      {
        text: req.body.text
      },
      (err, todo) => {
        if (err) {
          return res.status(400).json({ message: 'Error in updating Todo' });
        }
        const { _id, text, date } = todo;
        return res
          .status(200)
          .json({ message: 'Todo updated', todo: { _id, text, date } });
      }
    );
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let ID = req.params.id;
    await Todo.findByIdAndDelete(ID, (err, todo) => {
      if (err) {
        return res.status(400).json({ message: 'Error in deleting Todo' });
      }
      const { _id } = todo;
      return res.status(200).json({ message: `Todo deleted having id ${_id}` });
    });
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
