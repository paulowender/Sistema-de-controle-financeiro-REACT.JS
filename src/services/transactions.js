import { keys } from "../constants/keys";
import { FirebaseRepository } from "./repository";

export class Transactions {
    constructor() {
        this.collection = keys.transactions;
        this.transactions = [];
        this.repository = new FirebaseRepository();
    }

    listen(onUpdate) {
        return this.repository.listenCollection(this.collection, (data) => {
            this.transactions = data;

            onUpdate(this.transactions);
        });
    }

    async add(transaction) {
        return this.repository.addDoc(this.collection, transaction)
        .then((docRef) => {
            transaction.id = docRef.id;
            return this.repository.setDoc(docRef.path, transaction)
        })
    }

    async remove(id) {
        return this.repository.deleteDoc(`${this.collection}/${id}`)
    }

    async update(newTransaction) {
        return this.repository.setDoc(`${this.collection}/${newTransaction.id}`, newTransaction)
    }
}