const Contact = require("../models/contacts");
const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../validation/validation");

const HttpError = require("../helpers/HttpError");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};
const removeContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = req.body;

    const { error } = addSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await Contact.create(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
const updateContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = updateSchema.validate(body);
    if (error) {
      throw HttpError(400, "missing fields");
    }

    const contactId = req.params.contactId;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const { error } = updateFavoriteSchema.validate({ favorite });

    if (error) {
      throw HttpError(400, "missing field favorite");
    }

    const updateStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: favorite },
      { new: true }
    );

    if (!updateStatusContact) {
      throw HttpError(404, "Not found");
    }

    res.json(updateStatusContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
