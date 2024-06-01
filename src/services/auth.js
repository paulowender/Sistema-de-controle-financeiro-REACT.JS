import { keys } from "../constants/keys";
import { FirebaseAuth } from "./firebase";
import { FirebaseRepository } from "./repository";

export class AuthenticationService {
    constructor() {
        this.collection = keys.users;
        this.repository = new FirebaseRepository();
        this.authentication = FirebaseAuth;
    }

    listenAuth(callback) {
        const { auth, onAuthStateChanged } = this.authentication;
        onAuthStateChanged(auth, user => {
            if (callback) callback(user);
        });
    }

    async #signInWithEmailAndPassword(email, password) {
        const { auth, signInWithEmailAndPassword } = this.authentication;

        return await signInWithEmailAndPassword(auth, email, password);
    }

    async #signUpWithEmailAndPassword(email, password) {
        const { auth, createUserWithEmailAndPassword } = this.authentication;
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async signIn(email, password) {
        return this.#signInWithEmailAndPassword(email, password);
    }

    async signUp(email, password) {
        return this.#signUpWithEmailAndPassword(email, password);
    }
}