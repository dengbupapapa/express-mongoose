'use strict';

import express from 'express';
import UserController from '../controller/index.js';
const router = express.Router();

router.use(/((\/index)|(\/insert\/nonsense)|(\/find\/nonsense))/, UserController.loginCheck)

export default router