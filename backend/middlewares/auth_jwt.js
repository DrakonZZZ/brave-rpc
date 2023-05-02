import JWT from 'jsonwebtoken';

//custom middleware to verify json token

const tokenCheck = (req, res, next) => {
  //checking for token in body, query and header
  let token = req.body.token || req.query.token || req.headers['Authorization'];

  if (!token) {
    return res.status(403).send('Token is not found for verification');
  }

  try {
    //regex to remove bearer text from toke
    token = token.replace(/^Bearer\s+/, '');
    const decoded = JWT.verify(token, process.env.TOKEN_key);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send('Invalid Token');
  }

  //moves to next middleware or move on script
  next();
};

export default tokenCheck;
