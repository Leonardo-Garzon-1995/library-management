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
        this.loadUsers();
        this.loadLoans()
    }

    addBook(book) {
        this.books.set(book.id, book);
        this.saveBooks(Array.from(this.books.values()));
    }

    addUser(user) {
        this.users.set(user.id, user);
        this.saveUsers(Array.from(this.users.values()));
    }

    borrowBook(userId, bookId) {
        const user = this.users.get(userId);
        if (!user) throw new Error("User not found");

        const book = this.books.get(bookId);
        if (!book) throw new Error("Book not found");

        book.borrow();

        const loan = new Loan(user.id, book.id);
        this.loans.set(loan.id, loan);
        user.addLoan(loan.id);
        this.saveBooks(Array.from(this.books.values()));
        this.saveLoans(Array.from(this.loans.values()))
        this.saveUsers(Array.from(this.users.values()));
    }

    // add later -> return book
    returnBook(loanId) {
        const loan = this.loans.get(loanId);
        if (!loan) throw new Error("Loan not found");

        const user = this.users.get(loan.userId);
        if (!user) throw new Error("User not found");

        const book = this.books.get(loan.bookId);
        if (!book) throw new Error("Book not found");

        loan.close();
        this.loans.delete(loan.id);
        book.returnBook();
        user.removeLoan(loan.id);
        console.log(user.loans)
        this.saveBooks(Array.from(this.books.values()));
        this.saveLoans(Array.from(this.loans.values()))
        this.saveUsers(Array.from(this.users.values()));
    }
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

    loadUsers() {
        const users = StorageService.loadUsers();
        if (!users) throw new Error("No users found");

        for (const u of users) {
            const user = new User(u.name);
            user.id = u.id;
            user.loans = u.loans;
            this.users.set(user.id, user);
        }
    }

    saveUsers(users) {
        StorageService.saveUsers(users);
    }

    loadLoans() {
        const loans = StorageService.loadLoans();
        if (!loans) throw new Error("No loans found")
        
        for (const l of loans) {
            const user = this.users.get(l.userId)
            const book = this.books.get(l.bookId)
            if (!user || !book) continue;

            const loan = new Loan(user, book);
            loan.id = l.id;
            loan.userId = l.userId;
            loan.bookId = l.bookId;
            loan.borrowedAt = l.borrowedAt;
            loan.returnedAt = l.returnedAt;

            this.loans.set(loan.id, loan);
        }
    }

    saveLoans(loan) {
        StorageService.saveLoans(loan)
    }
}

// TESTS ----------------------------------------------------------------------------------------
const library = new Library();


