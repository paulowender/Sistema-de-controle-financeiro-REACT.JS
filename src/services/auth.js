import { keys } from "../constants/keys";
import { FirebaseAuth } from "./firebase";
import { FirebaseRepository } from "./repository";

export class AuthenticationService {
    constructor() {
        this.collection = keys.users;
        this.repository = new FirebaseRepository();
        this.authentication = FirebaseAuth;
    }

    async #signInWithEmailAndPassword(email, password) {
        const { auth, signInWithEmailAndPassword } = this.authentication;

        return signInWithEmailAndPassword(auth, email, password);
    }

    async #signUpWithEmailAndPassword(email, password) {
        const { auth, createUserWithEmailAndPassword } = this.authentication;
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async signIn(email, password) {
        const user = await this.#signInWithEmailAndPassword(email, password);
        console.log('Logged in', user);
        // if (!user) throw new Error('User not found');
        return user;
    }

    async signUp(email, password) {
        const user = await this.#signUpWithEmailAndPassword(email, password);
        console.log('Signed up', user);
        return user;
    }
}