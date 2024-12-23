import React from 'react';
import { useSearchParams } from 'expo-router/build/hooks';

import {
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  PlatformColor,
} from 'react-native';


const comments = [
  { id: "1", name: "민수", message: "오늘 라운딩 정말 좋았어요!" },
  { id: "2", name: "지영", message: "새로 배운 스윙 덕분에 점수가 올랐어요!" },
  { id: "3", name: "현우", message: "다음에는 더 나은 퍼팅을 보여드릴게요." },
  { id: "4", name: "수진", message: "골프 모임에 참여해서 정말 즐거웠습니다." },
  { id: "5", name: "영호", message: "오늘 기록한 버디는 평생 기억할 거예요!" },
  { id: "6", name: "하나", message: "라운딩 후 함께한 식사도 정말 좋았어요." },
  { id: "7", name: "도현", message: "드라이버 샷이 요즘 점점 좋아지는 것 같아요." },
  { id: "8", name: "유진", message: "모두와 함께해서 정말 즐거운 시간이었어요!" },
  { id: "9", name: "성민", message: "내일도 같은 코스에서 한 번 더 도전해보고 싶어요." },
];


export default function CommentScreen(){
  const renderItem = ({ item }: { item: { name: string; message: string } }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  const searchParams = useSearchParams();

  const user = searchParams.get("user") ?? "error: no user fetched";
  const title= searchParams.get("title") ?? "error: no title fetched";
  const totalTime= searchParams.get("totalTime") ?? "error: no totalTime fetched";
  const hit= searchParams.get("hit") ?? "error: no hit fetched";
  const step= searchParams.get("step") ?? "error: no step fetched";
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Main content area */}
          <View style={styles.mainContent}>
            <ScrollView
              onScrollBeginDrag={Keyboard.dismiss} 
            >
              {/* Header area */}
              <View style={styles.userHeader}>
                <Text style={styles.userTextStyle}>
                  {user}
                </Text>
              </View>
              {/*body text area*/}
              <View style={styles.bodyContainer}>
                <View style={styles.bodyTitleContainer}>
                  <Text style={styles.titleTextStyle}>
                    {title || "error: no title fetched"}
                  </Text>
                </View>
                <View style={styles.bodyStatContainer}>
                  <View>
                    <Text style={styles.statTextStyle}>타수: </Text>
                    <Text style={styles.statValueStyle}>{hit}</Text>
                  </View>
                  <View>
                    <Text style={styles.statTextStyle}>걸음수: </Text>
                    <Text style={styles.statValueStyle}>{step}</Text>
                  </View>
                  <View>
                    <Text style={styles.statTextStyle}>총시간:</Text>
                    <Text style={styles.statValueStyle}>{totalTime}</Text>
                  </View>
                </View>
              </View>
              {/*main comments goes here*/}
              <View style={styles.listContainer}>
                {comments.map((item) => (
                  <View key={item.id} style={styles.commentContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Text box at the bottom */}
          <View style={styles.bottomInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="댓글 입력..."
              placeholderTextColor="#aaa"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

};

const styles= StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-end", 
  },
  mainContent: {
    marginHorizontal: 20,
    marginVertical: 20,
    flex: 1,
  },
  bodyContainer:{
    flexDirection: "column",
  },
  bodyStatContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyTitleContainer: {
    marginBottom: 10,
  },

  bottomInputContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  textInput: {
    height: 45,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },

  userHeader: {
    paddingBottom: 10,
  },
  textBoxContainer: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: Platform.OS === "android" ? 2 : 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },


  //comment styles
  listContainer: {
    marginTop: 20,
  },
  commentContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    /*
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
*/
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
    color: "#333",
  },
  message: {
    fontSize: 18,
    color: "#555",
  },






  userTextStyle: {
    fontFamily: "bold",
    fontSize: 15,
  },
  titleTextStyle: {
    fontSize: 17,
  },
  statTextStyle: {
    color: "#7C7C7C",
    fontSize: 17,
  },
  statValueStyle: {
    color: "#636464",
    fontSize: 15
  }

});
