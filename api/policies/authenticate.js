const jwt = require("jsonwebtoken");

module.exports = async function (req, res, proceed) {

    const token = req.headers.token;
    const secret = sails.config.jwtSecret || process.env.JWT_SECRET;
    try {
     
      if (!token) {
        return res.status(401).json({
          error: 'unauthorized',
        });
      }

      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401)
                .json({
                    message: 'token Invalid'
                });
        }
        req.me = decoded;
        return proceed();
    });
    } catch (error) {
      res.status(401).json({ error: 'an error occured' });
    }
  };