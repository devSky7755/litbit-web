import {
    startAfter,
    endBefore,
    endAt,
    query,
    getDocs,
} from "firebase/firestore/lite";

const gets = async (op, benchmark, collection, where, orderBy, limit, limitToLast) => {
    try {
        const wq = query(collection, where, orderBy);
        const totalDocSnaps = await getDocs(wq);
        let retVal = {};
        let q = null;
        switch (op) {
            case "first":
                q = query(collection, where, orderBy, limit);
                break;
            case "startAfter":
                q = query(collection, where, orderBy, limit, startAfter(benchmark)
                )
                break;
            case "endBefore":
                q = query(collection, where, orderBy, limitToLast, endBefore(benchmark)
                )
                break;
            case "last":
                q = query(collection, where, orderBy, limitToLast, endAt(totalDocSnaps.docs[totalDocSnaps.size - 1]));
                break;
            default:
                q = query(collection, where, orderBy, limit);
                break;
        }

        const docSnaps = await getDocs(q);
        retVal = {
            totalCount: totalDocSnaps.size,
            docSnaps,
            docs: docSnaps.docs.map(docSnap => docSnap.data())
        }
        return retVal;
    } catch (err) {
        throw err
    }
};

export const firebaseBasic = {
    gets,
};