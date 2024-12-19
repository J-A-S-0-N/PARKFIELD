import React, { useState, useEffect } from "react";

import { FlatList, 
  Text, 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity } from "react-native";

import { collection, 
  query, 
  limit, 
  getDoc, 
  getDocs,
  startAfter, 
  doc, 
  where} from "firebase/firestore";

import { db } from "@/services/firebaseConfig";

//import RenderPAGE from "./activityRENDER";
import HomeFeedHeader from "./homeFeedHeader";

const PAGE_SIZE = 13;

const HomeFeed= () => {
  type commentType = {
    CommentUser: string;
    CommentBodyText: string;
    CommentTime: string;
  };

  const [postData, setPostData] = useState([{
    LikeCount: 0,UserName: "",Title: "",SubTitle: "",
    Time: "",HitCount: 0,Steps: 0,TotalTime: 0,
  }]);
  const [commentData, setCommentData] = useState([{
    CommentUser: "",
    CommentBodyText: "",
    CommentTime: ""
  }]);

  const [posts, setPosts] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const reserveFetchPost = async (loadMore = false) => {
    const subcollectionName = "NULL";
    try{
      const collectionRef = query(
        collection(db, "POSTS"),
        limit(PAGE_SIZE),
        ...(loadMore && lastVisible ? [startAfter(lastVisible)]: [])
      );
      //const collectionRef = collection(db, "POSTS");
      const querySnapshot = await getDocs(collectionRef);
      if (!querySnapshot.empty){
        for(const postDoc of querySnapshot.docs){
          console.log("${postDoc.id}");
          console.log(postDoc.data());
          //here goes the function that passes the values to the states (without comments)
          setPostData((prevData) => {
            return [...prevData, {
              LikeCount: 0,
              UserName: "",
              Title: "",
              SubTitle: "",
              Time: "",
              HitCount: 0,
              Steps: 0,
              TotalTime: 0,
            }];
          });
          const subcollectionRef = collection(postDoc.ref, subcollectionName);
          const subcollectionSnapshot = await getDocs(subcollectionRef);
          if(!subcollectionSnapshot.empty){
            for(const subcollectionDoc of subcollectionSnapshot.docs){
              console.log("${subcollectionDoc.id}");
              console.log("{}", subcollectionDoc.data());
              setCommentData((prevData) => {
                return [...prevData, {
                  CommentUser: "",
                  CommentBodyText: "",
                  CommentTime: ""
                }];
              });
            }
          }
        }
      }
    } catch(error){
      console.log("ERROR : {}",error);
    }
  };

  const exampleFetchPost = async (documentId:string) => {
    const docRef = doc(db, "POSTS", documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()){
      console.log("error fetching Posts");
    } else {
      const data = docSnap.data()
      for (const [field, value] of Object.entries(data)){
        console.log("${fields}");
      }
    }
  };

  const fetchPosts = async (loadMore = false) => {
    setLoading(true);

    const postsQuery = query(
      collection(db, "POSTS"),
      limit(PAGE_SIZE),
      ...(loadMore && lastVisible ? [startAfter(lastVisible)] : [])
    );

    try {
      const snapshot = await getDocs(postsQuery);
      if (!snapshot.empty) {
        const newPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const updatedPosts = loadMore ? [
          ...posts,
          ...newPosts.filter(newPost => !posts.some(post => post.id === newPost.id))
        ] : newPosts;
        setPosts(updatedPosts);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        if (snapshot.docs.length < PAGE_SIZE) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loader} />;
  };

  return (
    <FlatList
      data={postData}
      keyExtractor={(item) => item.Title}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => console.log("route and ")}>
          {/* username/time header*/}
          <View
            style={styles.headerCOMP}
          >
            <View>
              <Text>{item.UserName}</Text>
            </View>
            <View>
              <Text>{item.Time}</Text>
            </View>
            {/* setting modal maybe not for MVP*/}
            <TouchableOpacity>
              <View>
                <Text>setting</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* content body */}
          <View>
            {/*title*/}
            <View>
              <Text>{item.Title}</Text>
            </View>
            {/*sub-title*/}
            <View>
              <Text>{item.SubTitle}</Text>
            </View>
            {/*stat*/}
            <View>
              <Text>set up stat layer</Text>
            </View>
            {/*image*/}
            <View>
            </View>
          </View>
          {/* like/comment tail maybe not for MVP */}
          <View>
            <TouchableOpacity>
              <View>
                <Text>{item.LikeCount}</Text>
                <Text>like</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View>
                <Text>comment</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      onEndReached={() => hasMore && fetchPosts(true)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  //components
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCOMP: {
    flexDirection: "row"
  },



  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 20,
  },
});

export default HomeFeed;
