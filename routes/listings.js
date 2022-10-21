import { Router } from "express";
import * as listingsCtrl from '../controllers/listings.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()



export { router }