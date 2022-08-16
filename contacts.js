const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContactFile = async (updateList) => {
  fs.writeFile(contactsPath, JSON.stringify(updateList));
};

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
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) return null;

    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const deletedContact = contacts.filter(
      (contact) => contact.id === contactId
    );

    const deletedContactList = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await updateContactFile(deletedContactList);

    return deletedContact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };

    const updateContactList = [...contacts, newContact];

    await updateContactFile(updateContactList);

    return newContact;
  } catch (error) {
    console.error(error);
  }
}

async function updateContact(contactId, name, phone) {
  try {
    const contacts = await listContacts();

    const idx = contacts.findIndex((contact) => contact.id === contactId);
    console.log("updateContact ~ idx", idx);

    if (idx === -1) return null;

    contacts[idx] = { ...contacts[idx], id: contactId, name, phone };

    await updateContactFile(contacts);

    return contacts[idx];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
