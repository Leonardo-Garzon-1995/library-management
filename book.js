export class Book {
    constructor(title, author) {
        this.id = generateBookId();
        this.title = title;
        this.author = author;
        this.available = true;
    }

    borrow() {
        if (!this.available) {
            throw new Error("This book is not available");
        }
        this.available = false;
    }

    returnBook() {
        if (this.available) {
            throw new Error("This book is already available");
        }
        this.available = true;
    }
}

function generateBookId() {
    return `bk-${crypto.randomUUID()}`;
}
