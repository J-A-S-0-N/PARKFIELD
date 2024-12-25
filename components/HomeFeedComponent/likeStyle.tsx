import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Text, View } from "react-native";
import { db } from "@/services/firebaseConfig";

export const PostText = ({ postUID }: { postUID: string }) => {
  const [textStyle, setTextStyle] = useState<JSX.Element | null>(null); 
  const userId = "J4S0N"; 
  useEffect(() => {
    if (!postUID){
        console.log("error: invalid likeStyleFunction");
        return;
    }
    const fetchPostData = async () => {
      try {
        const postRef = doc(db, "POSTS", postUID);
        const postSnapshot = await getDoc(postRef);

        if (!postSnapshot.exists()) {
          console.warn("Post does not exist");
          return; 
        }

        const post = postSnapshot.data();
        const likeUser = post?.likeUsers || [];

        if (likeUser.includes(userId)) {
          setTextStyle(
            <Text style={{ 
                color: "#91A233", 
            }}>like</Text>
          );
        } else {
          setTextStyle(
            <Text style={{ color: "black" }}>like</Text>
          );
        }
      } catch (error) {
        console.log("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postUID]);

  // Render only when textStyle is set
  if (!textStyle) return null;

  return <View>{textStyle}</View>;
};
