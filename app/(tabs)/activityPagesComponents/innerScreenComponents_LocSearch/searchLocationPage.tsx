import React from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

type DataItem = {
  id: string;
  name: string;
  distance: string;
};

export default function innerLocationSelection() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  const data: DataItem[] = [
    { id: "1", name: "정발파크골프장", distance: "2.5 km" },
    { id: "2", name: "함안파크골프장", distance: "3.1 km" },
    { id: "3", name: "영양군 파크골프장", distance: "5.0 km" },
    { id: "4", name: "다사파크골프장", distance: "1.2 km" },
    { id: "5", name: "유등파크골프장", distance: "4.3 km" },
    { id: "6", name: "삼락다이나믹파크골프장", distance: "6.7 km" },
    { id: "7", name: "삼락18파크골프장", distance: "7.2 km" },
    { id: "8", name: "화명파크골프장", distance: "2.9 km" },
    { id: "9", name: "대저생태공원파크골프장", distance: "8.4 km" },
    { id: "10", name: "기장파크골프장", distance: "3.8 km" },
    { id: "11", name: "사암파크골프장", distance: "5.5 km" },
    { id: "12", name: "삼락9&9파크골프장", distance: "4.0 km" },
    { id: "13", name: "범밤파크골프장", distance: "2.3 km" },
    { id: "14", name: "강변파크골프장", distance: "6.1 km" },
    { id: "15", name: "오륜파크골프장", distance: "3.4 km" },
    { id: "16", name: "신호파크골프장", distance: "7.8 km" },
    { id: "17", name: "중랑천 파크골프장", distance: "4.2 km" },
    { id: "18", name: "서남물재생센터공원파크골프장", distance: "8.9 km" },
    { id: "19", name: "한강파크골프장", distance: "3.0 km" },
    { id: "20", name: "잠실파크골프장", distance: "2.7 km" },
    { id: "21", name: "월드컵파크골프장", distance: "5.1 km" },
    { id: "22", name: "안양천파크골프장", distance: "4.9 km" },
    { id: "23", name: "구로 안양천 9홀 파크골프장", distance: "3.3 km" },
    { id: "24", name: "구로 안양천 18홀 파크골프장", distance: "5.4 km" },
    { id: "25", name: "강동파크골프장", distance: "6.0 km" },
    { id: "26", name: "금천구 한내천파크골프장", distance: "7.1 km" },
    { id: "27", name: "양평누리파크골프장", distance: "2.8 km" },
    { id: "28", name: "동대문구중량천 파크골프장", distance: "4.6 km" },
    { id: "29", name: "강남탄천그린파크골프장", distance: "3.2 km" },
    { id: "30", name: "오가낭파크골프장", distance: "5.3 km" },
    { id: "31", name: "한솔파크골프장", distance: "6.4 km" },
    { id: "32", name: "조천파크골프장", distance: "7.6 km" },
  ];

  const handleFavoriteLocation = (locationName: string) => {
    console.log("need implimentation");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  };

  const renderingFunction = ({ item }: { item: DataItem }) => {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={{ flex: 8 }}>
          <TouchableOpacity>
            <View style={styles.itemContainer}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
        //
        <View style={{ flex: 2, flexDirection: "row" }}>
          <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
            {item.distance}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <View>
              <Text>replace with icon</Text>
            </View>
          </TouchableOpacity>
        </View>
        st
        {/* seperator */}
        <View
          style={{
            height: 2,
            backgroundColor: "#DFDFDF",
            borderRadius: 2,
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ff6347" />
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        {/* Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="입력하시오..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      {/* Body */}
      <View style={styles.bodyContainer}>
        <FlatList
          data={filteredData}
          renderItem={renderingFunction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1E1E1",
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  headerContainer: {
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 15,
    flexDirection: "column",
  },
  bodyContainer: {
    marginTop: 5,
    borderRadius: 5,
    alignSelf: "center",
    width: "95%",
    backgroundColor: "#f0f0f0",
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 25,
    paddingHorizontal: 15,
    //marginVertical: 5,
    //borderRadius: 5,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  inputBox: {
    alignSelf: "center",
    paddingHorizontal: 20,
    borderRadius: 7,
    paddingVertical: 15,
    backgroundColor: "#E1E1E1",
    width: "100%",
  },
});
