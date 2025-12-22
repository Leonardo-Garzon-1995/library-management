export class Loan {
    constructor(user, book) {
        this.id = generateLoanId();
        this.userId = user;
        this.bookId = book;
        this.borrowedAt = new Date();
        this.returnedAt = null;
    }

    close() {
        if (this.returnedAt) {
            throw new Error("This loan is already closed");
        }
        this.returnedAt = new Date();
    }
}

function generateLoanId() {
    return `ln-${crypto.randomUUID()}`;
}