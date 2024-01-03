import express from 'express';
import { LoginUser, RegisterUser } from './../controller/registerationController.js';
import { ValidateLoginData, ValidateRegisterationData } from './../controller/userValidationController.js';

const RegisterationRoutes = express.Router();

RegisterationRoutes.route('/').post(ValidateRegisterationData, RegisterUser).get(ValidateLoginData, LoginUser);
export default RegisterationRoutes;