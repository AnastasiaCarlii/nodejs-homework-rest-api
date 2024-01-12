const express = require("express");

const contactsOptions = require("../../models/contacts");
const HttpError = require("../../helpers/HttpError");
const { addSchema, updateShema } = require("../../validation/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOptions.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await contactsOptions.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = addSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contactsOptions.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const deletedContact = await contactsOptions.removeContact(contactId);

    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = updateShema.validate(body);
    if (error) {
      throw HttpError(400, "missing fields");
    }

    const contactId = req.params.contactId;
    const updatedContact = await contactsOptions.updateContact(contactId, body);
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
