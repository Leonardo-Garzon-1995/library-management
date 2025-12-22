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
}

