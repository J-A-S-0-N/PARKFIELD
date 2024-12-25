import { collection, getDocs,addDoc, getFirestore, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

const fetchCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "POSTS"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(data); // Data fetched from the Firestore collection
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

fetchCollection();
