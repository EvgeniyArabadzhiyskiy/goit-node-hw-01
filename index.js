const { Command } = require("commander");
const program = new Command();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
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
      getContactById(id).then((result) => console.table(result));
      break;

    case "add":
      addContact(name, email, phone).then((result) => console.table(result));
      break;

    case "remove":
      removeContact(id).then((result) => console.table(result));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const result = invokeAction(argv);

// npm run start:dev

// node index.js --action list

// node index.js --action get --id 6

// node index.js --action remove --id D2f2Dz6Sv

// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

