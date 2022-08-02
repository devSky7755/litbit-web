import {
    doc,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc,
} from "firebase/firestore/lite";
import { firebaseEntry } from "./app";

const db = firebaseEntry.db;

const getUserByUId = async (uid) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const docs = await getDocs(q);
        if (docs.docs.length > 0) {
            return docs.docs[0];
        }
        return null;
    } catch (err) {
        throw err
    }
};

const addUser = async (user) => {
    try {
        return (await addDoc(collection(db, "users"), {
            authProvider: "local",
            ...user
        }));
    } catch (err) {
        throw err
    }
}

const updateUser = async (d_id, user) => {
    try {
        const docRef = doc(db, "users", d_id);
        return (await setDoc(docRef, user, { merge: true }));
    } catch (err) {
        throw err
    }
}

const addOrUpdateUser = async (user) => {
    try {
        const dUser = await getUserByUId(user.uid);
        if (!dUser) return (await (addUser(user)));
        return await updateUser(dUser.id, user)
    } catch (err) {
        throw err
    }
}

export const firebaseUser = {
    getUserByUId,
    addUser,
    updateUser,
    addOrUpdateUser,
};