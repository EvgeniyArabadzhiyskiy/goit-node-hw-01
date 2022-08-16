const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);

    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);

    return parsedContacts.filter((contact) => contact.id === contactId);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);

    const deletedContact = parsedContacts.filter(
      (contact) => contact.id === contactId
    );

    const deletedContactList = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    const updateContactList = JSON.stringify(deletedContactList);

    await fs.writeFile(contactsPath, updateContactList);

    return deletedContact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);

    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };

    const updateContactList = [...parsedContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updateContactList));

    return newContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
