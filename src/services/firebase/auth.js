import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateEmail as fUpdateEmail,
    updatePassword as fUpdatePassword,
} from "firebase/auth";
import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore/lite";
import { firebaseEntry } from "./app";

const app = firebaseEntry.app;
const db = firebaseEntry.db;

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        throw err
    }
};

const registerWithEmailAndPassword = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        // await addDoc(collection(db, "users"), {
        //     uid: user.uid,
        //     name,
        //     authProvider: "local",
        //     email,
        // });
        return user;
    } catch (err) {
        throw err
    }
};

const updateEmail = async (user, email) => {
    try {
        await fUpdateEmail(user, email);
    } catch (err) {
        throw err
    }
}

const updatePassword = async (user, password) => {
    try {
        await fUpdatePassword(user, password)
    } catch (err) {
        throw err
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        throw err
    }
};

const logout = async () => {
    await signOut(auth);
};

export const firebaseAuth = {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    updateEmail,
    updatePassword,
    logout,
};