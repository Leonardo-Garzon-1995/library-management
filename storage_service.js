import fs from 'fs';

const BOOKS_FILE = './data/books-data.json';
const USERS_FILE = './data/users-data.json';
const LOANS_FILE = './data/loans-data.json';

export class StorageService {
    // Books ------------------------------------------------
    static loadBooks() {
        if (!fs.existsSync(BOOKS_FILE)) return [];

        const raw = fs.readFileSync(BOOKS_FILE);
        if (!raw) return [];

        return JSON.parse(raw);

    }

    static saveBooks(books) {
        fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
    }

    // Users --------------------------------------------------

    static loadUsers() {
        if (!fs.existsSync(USERS_FILE)) return [];

        const raw = fs.readFileSync(USERS_FILE);
        if (!raw) return [];

        return JSON.parse(raw);
    }

    static saveUsers(users) {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    }

    // Loans ------------------------------------------------------

    static loadLoans() {
        if (!fs.existsSync(LOANS_FILE)) return [];

        const raw = fs.readFileSync(LOANS_FILE)
        if (!raw) return []

        return JSON.parse(raw)
    }

    static saveLoans(loans) {
        if (!Array.isArray(loans)) {
            throw new Error("saveLoans expects an array");
        }
        fs.writeFileSync(LOANS_FILE, JSON.stringify(loans, null, 2))
    }
}

