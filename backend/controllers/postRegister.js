import userName from '../models/userName.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const postRegister = async (req, res) => {
  try {
    //getting data from request body
    const { username, password, email } = req.body;

    //checking if user exist in the database
    const checkUser = await userName.exists({ email: email.toLowerCase() });

    if (checkUser) {
      return res.status(409).send('Email is already in use.');
    }

    //encrypting password
    const passwordEncode = await bcrypt.hash(password, 10);

    //storing the user name, password and email in database

    const userPasswordGen = await userName.create({
      username,
      password: passwordEncode,
      email: email.toLowerCase(),
    });

    //JWT token creation
    const token = JWT.sign(
      {
        userId: userPasswordGen._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '12h',
      }
    );

    //server response if no problem occurs
    res.status(201).json({
      success: true,
      data: {
        JSONtoken: token,
        username: userPasswordGen.username,
        email: userPasswordGen.email,
      },
    });
  } catch (err) {
    res.status(500).json('Server Error.Please after some time.');
    console.log(err);
  }
};

export default postRegister;
