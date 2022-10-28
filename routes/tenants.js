import { Router } from "express";
import * as tenantsCtrl from "../controllers/tenants.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

router.use(decodeUserFromToken);

router.get("/", checkAuth, tenantsCtrl.index);

router.get("/:id", checkAuth, tenantsCtrl.show);

router.post("/", checkAuth, tenantsCtrl.create);

router.post("/:id/comments", checkAuth, tenantsCtrl.createComment);

router.put("/:id", checkAuth, tenantsCtrl.update);

router.delete("/:id", checkAuth, tenantsCtrl.delete);

export {
  router
};
