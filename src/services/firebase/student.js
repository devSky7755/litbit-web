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

const getStudents = async (uid, queryPage = {}) => {
    try {
        const q = query(collection(db, "students"), where("uid", "==", uid));
        const docs = (await getDocs(q)).docs.map(docSnap => docSnap.data());
        console.log(docs)
        return docs;
    } catch (err) {
        throw err
    }
};

export const firebaseStudent = {
    getStudents,
};