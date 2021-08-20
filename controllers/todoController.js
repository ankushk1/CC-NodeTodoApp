const Todo = require('../model/Todo');

exports.createTodo = async (req, res) => {
  try {
    await Todo.create(
      {
        text: req.body.text,
        date: req.body.date
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
