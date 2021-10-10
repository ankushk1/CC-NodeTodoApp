const User = require('../model/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')


exports.signup = async (req, res) => {
  try {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return  res.status(400).json({
          errors : errors.array().map(err => err.msg)
      })
    }
    let user = await User.findOne({
      email: req.body.email
    });
    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }
    User.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      },
      (err, user) => {
        if (err) {
          console.log(err)
          return res.status(400).json({ message: 'Cannot create user', err });
        }
        const { _id , firstName , email} = user;
        // console.log('user created')
        return res.status(200).json({ message: 'User created', 
        user:  { _id , firstName , email} });
      }
    );
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login =  async (req, res) => {
  try{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return  res.status(400).json({
          message: errors.array()[0].msg
      })
    }
    
    let user = await User.findOne({
      email: req.body.email
    });

    if(!user || !bcrypt.compareSync(req.body.password , user.password) ){
      return res.status(400).json({message:"Invalid email or password"})
    }

    const { _id , firstName , email} = user;
    const token = jwt.sign({ _id , email}, req.app.get('secretkey') , {
      expiresIn: '5d' 
    }) 
    // console.log('sign in success', token)
    return res.status(200).json({ message: 'Login Successfull' , user:  { _id , firstName , email} , token: token});

  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}