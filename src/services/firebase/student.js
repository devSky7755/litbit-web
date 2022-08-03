import {
    limit as qLimit,
    limitToLast as qLimitToLast,
    collection as fCollection,
    where as fWhere,
    orderBy as qOrderBy,
} from "firebase/firestore/lite";
import { firebaseEntry, firebaseBasic } from ".";

const db = firebaseEntry.db;
const collection = fCollection(db, "students");

const getStudents = async (uid, queryPage = {
    limit: 2,
    op: "first", // op could be 'first' | 'startAfter' | 'endBefore' | 'last'
    benchmark: null,
}) => {
    const where = fWhere("uid", "==", uid);
    const orderBy = qOrderBy("email", "asc")
    const limit = qLimit(queryPage?.limit);
    const limitToLast = qLimitToLast(queryPage?.limit);

    try {
        return await firebaseBasic.gets(
            queryPage?.op,
            queryPage?.benchmark,
            collection,
            where,
            orderBy,
            limit,
            limitToLast
        )
    } catch (err) {
        throw err
    }
};

export const firebaseStudent = {
    getStudents,
};