import passport from 'passport';
import { Router } from 'express';

// validation tools
import { check, validateResult } from 'express-validator';
import userCtrl from '../controllers/userCtrl'


const router = Router();

