export class User {
    constructor(name) {
        this.id = generateUserId();
        this.name = name;
        this.loans = [];
    }

    addLoan(loanId) {
        if (this.loans.includes(loanId)) {
            throw new Error("This user already has this loan");
        }
        this.loans.push(loanId);
    }

    removeLoan(loanId) {
        const filtered = this.loans.filter((l) => l !== loanId);
        this.loans = filtered;
    }
}

function generateUserId() {
    return `us-${crypto.randomUUID()}`;
}