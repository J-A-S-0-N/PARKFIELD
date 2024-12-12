import { collection, addDoc, getFirestore } from "firebase/firestore";
import { db } from "../firebaseConfig";

const addData = async () => {
    console.log("adding DATA");
    try {
        const docRef = await addDoc(collection(db, "USER"), {
            email: "test@email.com",
            password: "123",
            status: "unpaid",
            uniqueID: "hi",
            userNAME: "testUSER"

        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

addData()