import { keys } from "../constants/keys";

export class Transactions {
    constructor() {
        this.transactions = [];
    }

    getAll() {
        const data = localStorage.getItem(keys.transactions);

        if (data) {
            this.transactions = JSON.parse(data);
        }

        return this.transactions;
    }

    add(transaction) {
        this.transactions.push(transaction);
        localStorage.setItem(keys.transactions, JSON.stringify(this.transactions));
    }

    remove(id) {
        this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
        localStorage.setItem(keys.transactions, JSON.stringify(this.transactions));
    }

    update(newTransaction) {
        this.transactions = this.transactions.map((transaction) => (transaction.id === newTransaction.id ? newTransaction : transaction));
        localStorage.setItem(keys.transactions, JSON.stringify(this.transactions));
    }
}