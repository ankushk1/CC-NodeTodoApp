const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const { signup , login } = require('../controllers/userController');

router.post('/signup',
[
  check("firstName", "firstName should be atleast 3 characters").isLength({min:3}),
  check("lastName", "lastName should be atleast 3 characters").isLength({min:3}),
  check('email',"Email Address not correct" ).isEmail(),
  check('password','Password should be of 4 char').isLength({min:4})
],
signup);


router.post('/login', 
[
  check('email',"Email Address not correct" ).isEmail(),
  check('password','Password should be of 4 char').isLength({min:4})
],
login);

module.exports = router;
