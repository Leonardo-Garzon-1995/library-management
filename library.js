import { StorageService } from "./storage_service.js";

import { Book } from "./book.js";
import { User } from "./user.js";
import { Loan } from "./loan.js";



class Library {
    constructor() {
        this.users = new Map(); // user.id -> user
        this.books = new Map(); // book.id -> book
        this.loans = new Map(); // loan.id -> loan

        this.loadBooks();
    }

    addBook(book) {
        this.books.set(book.id, book);
        this.saveBooks(Array.from(this.books.values()));
    }

    addUser(user) {
        this.users.set(user.id, user);
    }

    borrowBook(userId, bookId) {
        const user = this.users.get(userId);
        if (!user) throw new Error("User not found");

        const book = this.books.get(bookId);
        if (!book) throw new Error("Book not found");

        book.borrow();

        const loan = new Loan(user, book);
        this.loans.set(loan.id, loan);
        user.addLoan(loan);
        return loan;
    }

    // add later -> return book
    // add later -> list available books

    // STORAGE -> add later
    loadBooks() {
        const books = StorageService.loadBooks();
        if (!books) throw new Error("No books found");

        for (const b of books) {
            const book = new Book(b.title, b.author);
            book.id = b.id;
            book.available = b.available;
            this.books.set(book.id, book);
        }

    }

    saveBooks(books) {
        StorageService.saveBooks(books);
    }
}

// TESTS ----------------------------------------------------------------------------------------
const library = new Library();

const user1 = new User("John Doe");
library.addUser(user1)

library.borrowBook(user1.id, "bk-0e0f4ee8-4c11-4a8d-959d-3e5338141a09");






console.log(library.books);
console.log("\x1b[35m---------------------------------------------------------\x1b[0m");
console.log(library.users)
console.log("\x1b[35m---------------------------------------------------------\x1b[0m");
console.log(library.loans)