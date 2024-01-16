const express = require("express");
const ctrl = require("../../controllers/controllers");

const validateBody = require("../../middlewares/validateBody");

const schemas = require("../../schemas/schemas");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
