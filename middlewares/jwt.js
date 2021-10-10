var jwt = require('jsonwebtoken');

exports.validateUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: 'JWT token is required'
    });
  }

  jwt.verify(
    req.headers.authorization,
    req.app.get('secretkey'),
    function (err, decoded) {
      if (err) {
        res.json({
          message: 'Error in decoding Jwt',
          err: err,
          data: null
        });
      }
      else{
        req.body.userId = decoded._id
      }
      next();
    }
  );
};
