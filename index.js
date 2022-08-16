const { Command } = require("commander");
const program = new Command();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log("argv", argv);

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((result) => console.table(result));
      break;

    case "get":
      getContactById(id).then((contact) => {
        if (!contact) {
          throw new Error(`Contact with ID ${id} not found`);
        }
        console.table(contact);
      });
      break;

    case "add":
      addContact(name, email, phone).then((result) => console.table(result));
      break;

    case "remove":
      removeContact(id).then((result) => console.table(result));
      break;

    case "update":
      updateContact(id, name, phone).then((contact) => {
        if (!contact) {
          throw new Error(`Contact with ID ${id} not found`);
        }
        console.table(contact);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// npm run start:dev

// node index.js --action list

// node index.js --action get --id 6

// node index.js --action remove --id Uen1uyD8R

// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// node index.js --action update --id XS5it7Sp5 --name Djon  --phone 874-59-17
