import { keys } from "../constants/keys";
import { FirebaseAuth } from "./firebase";
import { FirebaseRepository } from "./repository";

export class AuthenticationService {
    constructor() {
        this.collection = keys.users;
        this.repository = new FirebaseRepository();
        this.authentication = FirebaseAuth;
        this.user = null;
        this.loggedIn = false;

        this.#listenAuth();
    }

    #listenAuth() {
        const { auth, onAuthStateChanged } = this.authentication;
        onAuthStateChanged(auth, (user) => {
            this.user = user;
        });
    }

    async #signInWithEmailAndPassword(email, password) {
        const { auth, signInWithEmailAndPassword } = this.authentication;

        this.user = await signInWithEmailAndPassword(auth, email, password);
        this.loggedIn = !!this.user;

        return this.user;
    }

    async #signUpWithEmailAndPassword(email, password) {
        const { auth, createUserWithEmailAndPassword } = this.authentication;
        this.user = await createUserWithEmailAndPassword(auth, email, password);
        this.loggedIn = !!this.user;

        return this.user;
    }

    async signIn(email, password) {
        return this.#signInWithEmailAndPassword(email, password);
    }

    async signUp(email, password) {
        return this.#signUpWithEmailAndPassword(email, password);
    }
}