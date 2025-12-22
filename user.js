export class User {
    constructor(name) {
        this.id = generateUserId();
        this.name = name;
        this.loans = new Map(); // loan.id -> loan
    }

    addLoan(loan) {
        if (this.loans.has(loan.id)) {
            throw new Error("This user already has this loan");
        }
        this.loans.set(loan.id, loan);
    }

    removeLoan(loanId) {
        this.loans.delete(loanId);
    }
}

function generateUserId() {
    return `us-${crypto.randomUUID()}`;
}