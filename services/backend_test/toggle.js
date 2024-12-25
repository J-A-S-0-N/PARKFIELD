import { db } from "../firebaseConfig.js";

import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

const toggleLikeFunction = async (PostUid) => {
    const userId = "asdf";

    const postRef = doc(db, "POSTS", PostUid);
    const postSnapshot = await getDoc(postRef);

    try {
        if (!postSnapshot.exists()) {
            console.log("not existing snapshot");
            return;
        }
        const post = postSnapshot.data();
        const likeUser = post.likeUsers || [];

        if (likeUser.includes(userId)) {
            await updateDoc(postRef, {
                likeUsers: arrayRemove(userId)
            });
        } else {
            await updateDoc(postRef, {
                likeUsers: arrayUnion(userId)
            });
        }
    } catch (error) {
        console.log("Error: {}", error);
    }
};

toggleLikeFunction("oPdQyTnMW3VpBLGNaho5");