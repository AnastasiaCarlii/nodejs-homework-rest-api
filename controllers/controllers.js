const Contact = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const listContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};
const removeContact = async (req, res) => {
  const contactId = req.params.contactId;
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const addContact = async (req, res) => {
  const body = req.body;
  const newContact = await Contact.create(body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const body = req.body;
  const contactId = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updateStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: favorite },
    { new: true }
  );

  if (!updateStatusContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updateStatusContact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
