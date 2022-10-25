import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get("/:id/listings", checkAuth, profilesCtrl.showMyListing)
router.get("/:id/tenants", checkAuth, profilesCtrl.showMyTenants)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
