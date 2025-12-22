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
        this.loans.filter((loan) => loan.id !== loanId);
    }
}

function generateUserId() {
    return `us-${crypto.randomUUID()}`;
}