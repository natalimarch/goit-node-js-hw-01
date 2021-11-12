const { Command } = require("commander");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async () => {
  const { action, id, name, email, phone } = argv;
  switch (action) {
    case "list":
      const list = await listContacts();
      console.log(list);
      break;
    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        console.log(`Товар с id=${id} не найден`);
        break;
      }
      console.log(contact);
      break;
    case "add":
      if (!name || !email || !phone) {
        console.log(`Укажите пожалуста name, email, phone`);
        break;
      }
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContacts = await removeContact(id);
      if (!removeContacts) {
        console.log(`Товар с id=${id} не найден. Укажите правильный id`);
        break;
      }
      console.log(removeContacts);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
})();
