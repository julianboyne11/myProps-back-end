import { Router } from "express";
import * as listingsCtrl from "../controllers/listings.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

router.use(decodeUserFromToken);

router.get("/", checkAuth, listingsCtrl.index);

router.get("/:id", checkAuth, listingsCtrl.show);

router.post('/', checkAuth, listingsCtrl.create)

router.post('/:id/workRequests', checkAuth, listingsCtrl.createWorkRequest)

router.put('/:id', checkAuth, listingsCtrl.update)

router.put('/:id/add-photo', checkAuth, listingsCtrl.addPhoto)

router.delete('/:id', checkAuth, listingsCtrl.delete)


export { router };
