import { Router } from "express";
import * as tenantCtrl from "../controllers/tenants .js"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

router.use(decodeUserFromToken)

router.get('/', checkAuth, tenantCtrl.index)

router.get('/:id', checkAuth, tenantCtrl.show)

router.post('/', checkAuth, tenantCtrl.create)

router.put('/:id', checkAuth, tenantCtrl.update)

router.delete('/:id', checkAuth, tenantCtrl.delete)



export { router }