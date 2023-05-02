import express from 'express';
import controller from '../controllers/authController.js';
import Joi from 'joi';
import validator from 'express-joi-validation';
import authJWT from '../middlewares/auth_jwt.js';

const router = express.Router();
const validatorHandle = validator.createValidator({});

//middleware validation
const logicSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(6).max(20).required(),
  email: Joi.string().email().required(),
});

//using validator to precheck for field validation
router.post('/login', validatorHandle.body(logicSchema), controller.postLogin);

router.post(
  '/register',
  validatorHandle.body(registerSchema),
  controller.postRegister
);

//route to verify middleware
router.get('/middleRoute', authJWT, (req, res) => {
  res.status(200).send('Access granted');
});

export default router;
