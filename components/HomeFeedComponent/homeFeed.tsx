import React, { useState, useEffect } from "react";

import { FlatList, 
  Text, 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  Image,
  TouchableOpacity } from "react-native";

import { collection, 
  query, 
  limit, 
  getDoc, 
  getDocs,
  startAfter, 
  doc, 
  where} from "firebase/firestore";
import { useRouter } from 'expo-router';
import { Router } from "expo-router";

import { db } from "@/services/firebaseConfig";

//import RenderPAGE from "./activityRENDER";
import HomeFeedHeader from "./homeFeedHeader";
import { initializeApp } from "firebase/app";

const PAGE_SIZE = 13;

interface HomeProp {
  router: Router;
}

const HomeFeed: React.FC<HomeProp> = ({ router }) => {
  type commentType = {
    CommentUser: string;
    CommentBodyText: string;
    CommentTime: string;
  };

  const [postData, setPostData] = useState([{
    LikeCount: 0,UserName: "",Title: "",SubTitle: "",
    Time: "",HitCount: "",Steps: 0,TotalTime: "",
  }]);
  const [commentData, setCommentData] = useState([{
    CommentUser: "",
    CommentBodyText: "",
    CommentTime: ""
  }]);

  const initTestData = () => {
    //this is solely for testing make sure to dis-engage this in the useeffect function
    setPostData([
      {
        LikeCount: 42,
        UserName: "JohnDoe",
        Title: "Learning React",
        SubTitle: "React Hooks 시작하기: Hooks는 React의 강력한 추가 기능으로, 클래스 없이 상태 및 다른 React 기능을 사용할 수 있게 해줍니다. 이 가이드는 useState와 useEffect를 포함한 Hooks의 기본을 다루며, 이를 React 애플리케이션에 실용적인 예제와 모범 사례를 통해 어떻게 통합할 수 있는지 보여줍니다. Hooks는 상태 관리와 컴포넌트 간 로직 공유를 단순화하여, 코드를 더 깔끔하고 유지보수하기 쉽게 만듭니다.",


        //Time: "2024-12-20T10:00:00Z",
        Time: "6월7일, 2025 3:12PM",
        HitCount: "16/24",
        Steps: 14325,
        TotalTime: "2:12",
      },
      {
        LikeCount: 67,
        UserName: "JaneSmith",
        Title: "Advanced React",
        //SubTitle: "Understanding State Management: Learn how to handle application state effectively using tools like Redux, Context API, and React Query. Master the concepts of global and local state, and discover strategies to optimize performance and maintainability.",
        SubTitle: "상태 관리 이해: Redux, Context API, React Query와 같은 도구를 사용하여 애플리케이션 상태를 효과적으로 처리하는 방법을 배워보세요. 전역 상태와 로컬 상태의 개념을 마스터하고, 성능 최적화와 유지 보수를 위한 전략을 발견하세요.",

        //Time: "2024-12-19T14:30:00Z",
        Time: "6월7일, 2025 3:12PM",
        HitCount: "20/24",
        Steps: 8233,
        TotalTime: "1:02",
      },
      {
        LikeCount: 12,
        UserName: "CodeMaster",
        Title: "React Native Tips",
        SubTitle: "Building Mobile Apps",
        //Time: "2024-12-18T08:45:00Z",
        Time: "6월7일, 2025 3:12PM",
        HitCount: "31/24",
        Steps: 12012,
        TotalTime: "0:54",
      },
    ]);
  };


  const [posts, setPosts] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const reserveFetchPost = async (loadMore = false) => {
    setLoading(true);

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
              LikeCount: postDoc.data().LikeCount,
              UserName: postDoc.data().Name,
              Title: postDoc.data().Title,
              SubTitle: postDoc.data().SUBTitle,
              Time: postDoc.data().Time,
              HitCount: postDoc.data().hits,
              Steps: postDoc.data().steps,
              TotalTime: postDoc.data().totalTime,
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
                  CommentUser: subcollectionDoc.data().USER,
                  CommentBodyText: subcollectionDoc.data().body,
                  CommentTime: subcollectionDoc.data().time
                }];
              });
            }
          }
        }
        setLoading(false);
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
    //reserveFetchPost();
    initTestData();
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
        <View style={styles.container}>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => 
              router.push({
                pathname: "/homeFeedContainer/detailScreenContainer",
              })
            }
          >
            {/* username/time header*/}
            <View style={[styles.headerCOMP, styles.childPadding]}>
              <View style={styles.usernameContainer}>
                <Text style={styles.userNameStyle}>{item.UserName}</Text>
              </View>
              <View>
                <Text>{item.Time}</Text>
              </View>
              {/* setting modal maybe not for MVP*/}
              <TouchableOpacity>
                <View>
                  {/*<Text>setting</Text>*/}
                </View>
              </TouchableOpacity>
            </View>

            {/* content body */}
            <View style={styles.childPadding}>
              {/*title*/}
              <View style={styles.titleStyle}>
                <Text style={styles.titleTextStyle}>{item.Title}</Text>
              </View>

              {/*sub-title*/}
              <View style={styles.prestatPadding}>
                <Text 
                  style={styles.subTitleTextStyle}
                  numberOfLines={5}>{item.SubTitle}</Text>
              </View>

              {/*stat*/}
              <View style={styles.statContainer}>
                <View>
                  <Text style={styles.statCategoryStyle}>타수</Text>
                  <Text style={styles.statValueStyle}>{item.HitCount}</Text>
                </View>
                <View>
                  <Text style={styles.statCategoryStyle}>걸음수</Text>
                  <Text style={styles.statValueStyle}>{item.Steps}</Text>
                </View>
                <View>
                  <Text style={styles.statCategoryStyle}>총시간</Text>
                  <Text style={styles.statValueStyle}>{item.TotalTime}</Text>
                </View>
              </View>
              {/*image*/}
              <View>
                <Image
                  source={require("./map.jpeg")}
                  style={styles.imageStyle}
                />
              </View>
            </View>
          </TouchableOpacity>


          <View style= {[styles.likecommentButtonContainer, styles.childPadding]}>
            <TouchableOpacity>
              <View style={styles.buttonContainer}>
                {/*<Text>{item.LikeCount}</Text>*/}
                <Text>like</Text>
              </View>
            </TouchableOpacity>

            <View style={{height: '100%', width: 1, borderRadius:10, backgroundColor: "#E4E4E4"}}/>

            <TouchableOpacity
              onPress={() => 
                router.push({
                  pathname: "/homeFeedContainer/commentContainer",
                  params: {
                    user: item.UserName, 
                    title: item.SubTitle,
                    like: item.LikeCount,
                    totalTime: item.TotalTime,
                    hit: item.HitCount,
                    step: item.Steps
                  }
                })}>
              <View style={styles.buttonContainer}>
                <Text>comment</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.seperator}></View>
        </View>
      )}
      onEndReached={() => hasMore && fetchPosts(true)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  //components
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headerCOMP: {
    flexDirection: "row",
    alignItems: "center"
  },
  childPadding: {
    paddingVertical: 10
  },
  usernameContainer: {
    paddingRight: 10,
  },
  prestatPadding: {
    marginBottom: 30,
  },
  statContainer: {
    flexDirection: "row",
    marginHorizontal: 40,
    marginBottom: 20,
    justifyContent: "space-between"
  },

  likecommentButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 30,
  },

  imageStyle: {
    height: 200,
    width: 355,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 20,
  },
  statCategoryStyle: {
    color: "#7D7D7D",
    textAlign: "center",
    fontSize: 14,
  },
  statValueStyle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleStyle: {
    marginBottom: 5,
  },
  userNameStyle: {
    fontFamily: "bold",
    fontSize: 18,
  },
  bodyTextStyle: {
    fontSize: 14
  },
  titleTextStyle: {
    fontSize: 24
  },
  subTitleTextStyle: {
    color: "#474747",
    fontSize: 18
  },
  seperator: {
    height: 1,
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    //backgroundColor: "#878787",
    marginTop: 10,
    alignSelf: "center",
    width: "100%"
  }
});

export default HomeFeed;
