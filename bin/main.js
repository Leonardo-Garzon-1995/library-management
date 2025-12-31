#!/usr/bin/env node

import { Library } from "../library.js";
import { listOfCommands } from "../helpers.js";

const [,, command, ...args] = process.argv;

const text = args.join(" ");

const library = new Library();

switch (command) {
    case "add-book":
        library.addBook(text);
        break;
    case "add-user":
        library.addUser(text);
        break;
    case "borrow-book":
        library.borrowBook(text);
        break;
    case "return-book":
        library.returnBook(text);
        break;
    case "list-books":
        library.listBooks();
        break;
    case "list-users":
        library.listUsers();
        break;
    default:
        console.log("\x1b[31mUnknown command\x1b[0m");
        console.log("\n");
        listOfCommands();
        break;
}