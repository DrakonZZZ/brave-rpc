import userName from '../models/userName.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //retriving user data with email id
    const user = await userName.findOne({ email: email.toLowerCase() });

    //if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      //new token
      const token = JWT.sign(
        {
          userId: user._id,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '12h',
        }
      );

      console.log(token);

      return res.status(200).json({
        success: true,
        data: {
          username: user.username,
          email: user.email,
          JSONtoken: token,
        },
      });
    }

    return res.status(400).send('Invalid credentials. Please try again');
  } catch (error) {
    return res.status(500).send('Something went wrong.Please try later');
  }
};

export default postLogin;
