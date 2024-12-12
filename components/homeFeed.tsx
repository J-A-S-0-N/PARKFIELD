import React, { useState, useEffect } from "react";

import { FlatList, Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

//import RenderPAGE from "./activityRENDER";

const PAGE_SIZE = 10;

const HOME = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
      data={posts}
      keyExtractor={(item) => item.TITLE}
      renderItem={({ item }) => (
        <TouchableOpacity>
            <View style={styles.postContainer}>
                <Text style={styles.title}>{item.TITLE}</Text>
                <Text>{item.SUBTITLE}</Text>
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
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 20,
  },
});

export default HOME;
